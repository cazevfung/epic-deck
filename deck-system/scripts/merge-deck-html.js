const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const selectorParser = require('postcss-selector-parser');
const { ensureDir, readConfig, resolveFromConfig } = require('./deck-build-utils');

function matchOne(regex, text, label) {
  const m = regex.exec(text);
  if (!m) throw new Error(`Missing ${label}`);
  return m[1];
}

function extractSlides(html) {
  const slides = [];
  const startRe = /<section\b[^>]*class="[^"]*\bslide\b[^"]*"[^>]*>/gi;
  const tagRe = /<\/?section\b[^>]*>/gi;
  let m;
  while ((m = startRe.exec(html))) {
    const start = m.index;
    tagRe.lastIndex = startRe.lastIndex;
    let depth = 1;
    let t;
    while (depth > 0 && (t = tagRe.exec(html))) {
      depth += t[0].startsWith('</') ? -1 : 1;
    }
    if (depth !== 0) throw new Error('Unbalanced section tags');
    slides.push(html.slice(start, tagRe.lastIndex));
    startRe.lastIndex = tagRe.lastIndex;
  }
  return slides;
}

function shouldExcludeSlide(slide, excludeTexts) {
  if (!excludeTexts?.length) return false;
  return excludeTexts.some((text) => text && slide.includes(text));
}

function addSourceClass(slide, sourceId) {
  return slide.replace(/<section\b([^>]*class=")([^"]*)(")/i, (all, before, classes, after) => {
    return `<section${before}${classes} ${sourceId}${after}`;
  });
}

function updatePageNum(slide, total) {
  const m = /data-slide="(\d+)"/.exec(slide);
  if (!m) return slide;
  const label = `${String(Number(m[1])).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
  const pageNumRe = /(<(div|span)\b[^>]*class="[^"]*\bpage-num\b[^"]*"[^>]*>)\s*[^<]*?\d+\s*\/\s*\d+[^<]*?(<\/\2>)/i;
  if (pageNumRe.test(slide)) return slide.replace(pageNumRe, `$1${label}$3`);
  return slide.replace(/<\/section>\s*$/i, `  <div class="page-num">${label}</div>\n</section>`);
}

function slideNumberFrom(slide) {
  const m = /data-slide="(\d+)"/.exec(slide);
  return m ? Number(m[1]) : null;
}

function slideRootClassesFrom(slides) {
  const classes = new Set();
  for (const slide of slides) {
    const m = /<section\b[^>]*class="([^"]*)"/i.exec(slide);
    if (!m) continue;
    for (const className of m[1].split(/\s+/)) {
      if (className && className !== 'slide') classes.add(className);
    }
  }
  return classes;
}

function isChromeSelector(selector) {
  const trimmed = selector.trim();
  return (
    trimmed === '*' ||
    /^html\b/.test(trimmed) ||
    /^body\b/.test(trimmed) ||
    trimmed.includes('.deck-backdrop') ||
    trimmed.includes('.nav') ||
    trimmed.includes('.hint') ||
    trimmed.includes('.slide-toc') ||
    trimmed.includes('.market-chart-hover-label') ||
    trimmed.includes('.market-chart-hover-kicker') ||
    trimmed.includes('.market-chart-hover-value')
  );
}

function sourceWhere(sourceId) {
  return selectorParser.pseudo({
    value: ':where',
    nodes: [
      selectorParser.selector({
        nodes: [selectorParser.className({ value: sourceId })],
      }),
    ],
  });
}

function scopeSelector(selector, sourceId, slideRootClasses, keepChrome) {
  if (selector.includes(':root')) {
    const scopedRoot = selector.replace(/:root/g, `:where(.slide.${sourceId})`);
    return keepChrome ? `${selector}, ${scopedRoot}` : scopedRoot;
  }
  if (isChromeSelector(selector)) return selector;
  if (/^\s*\[data-slide=/.test(selector)) return `:where(.slide.${sourceId})${selector.trimStart()}`;

  let scopedRootCompound = false;
  const transformed = selectorParser((selectors) => {
    selectors.each((selectorNode) => {
      let target = null;
      selectorNode.walkClasses((classNode) => {
        if (target) return;
        if (classNode.value === sourceId) {
          scopedRootCompound = true;
          target = classNode;
          return;
        }
        if (classNode.value === 'slide' || slideRootClasses.has(classNode.value)) {
          scopedRootCompound = true;
          target = classNode;
        }
      });
      if (target && target.value !== sourceId) {
        target.parent.insertAfter(target, sourceWhere(sourceId));
      }
    });
  }).processSync(selector);

  if (scopedRootCompound) return transformed;
  return `:where(.slide.${sourceId}) ${selector}`;
}

function scopeCss(css, sourceId, slideRootClasses, keepChrome) {
  const rootCss = postcss.parse(css);
  rootCss.walkRules((rule) => {
    const parentAt = rule.parent && rule.parent.type === 'atrule' ? rule.parent.name.toLowerCase() : '';
    if (parentAt.endsWith('keyframes')) return;

    const nextSelectors = [];
    for (const selector of rule.selectors || []) {
      if (!keepChrome && isChromeSelector(selector) && !selector.includes(':root')) continue;
      nextSelectors.push(scopeSelector(selector, sourceId, slideRootClasses, keepChrome));
    }
    if (nextSelectors.length === 0) rule.remove();
    else rule.selectors = nextSelectors;
  });
  rootCss.walkAtRules((atRule) => {
    if (atRule.nodes && atRule.nodes.length === 0) atRule.remove();
  });
  return rootCss.toString();
}

function extractBodyShell(body) {
  const firstSlide = body.search(/<section\b[^>]*class="[^"]*\bslide\b[^"]*"[^>]*>/i);
  const navMarker = body.indexOf('<!-- Navigation -->');
  if (firstSlide < 0 || navMarker < 0) throw new Error('Could not find body shell');
  const firstScript = body.indexOf('<script', navMarker);
  if (firstScript < 0) throw new Error('Could not find script block after nav');
  return {
    prefix: body.slice(0, firstSlide),
    nav: body.slice(navMarker, firstScript),
  };
}

function normalizeScriptBody(script) {
  return script.trim().replace(/\s+/g, ' ');
}

function findMatchingBrace(text, openBraceIndex) {
  let depth = 0;
  for (let i = openBraceIndex; i < text.length; i += 1) {
    const ch = text[i];
    if (ch === '{') depth += 1;
    else if (ch === '}') {
      depth -= 1;
      if (depth === 0) return i;
    }
  }
  return -1;
}

function findFunctionRange(script, signature) {
  const start = script.indexOf(signature);
  if (start < 0) return null;
  const openBrace = script.indexOf('{', start);
  if (openBrace < 0) return null;
  const closeBrace = findMatchingBrace(script, openBrace);
  if (closeBrace < 0) return null;
  return { start, end: closeBrace + 1 };
}

function trimScriptSegment(text) {
  return text.replace(/^\s+|\s+$/g, '');
}

function shellSignaturePresent(script) {
  return (
    script.includes("const slides = document.querySelectorAll('.slide');") &&
    script.includes('function syncLocationHash(idx)') &&
    script.includes('function show(idx, opts)')
  );
}

function extractShellAdditions(script) {
  if (!shellSignaturePresent(script)) return null;

  const tocCloseAnchor = "const tocClose = document.getElementById('slideTocClose');";
  const currentAnchor = 'let current = 0;';
  const activeAnchor = "slides[idx].classList.add('active');";
  const heroAnchor = 'const isHero =';
  const syncRange = findFunctionRange(script, 'function syncLocationHash(idx)');
  const showRange = findFunctionRange(script, 'function show(idx, opts)');
  const tocCloseIndex = script.indexOf(tocCloseAnchor);
  const currentIndex = script.indexOf(currentAnchor);

  let declarations = '';
  if (tocCloseIndex >= 0 && currentIndex > tocCloseIndex) {
    const start = tocCloseIndex + tocCloseAnchor.length;
    declarations = trimScriptSegment(script.slice(start, currentIndex));
  }

  let helpers = '';
  if (syncRange && showRange && showRange.start > syncRange.end) {
    helpers = trimScriptSegment(script.slice(syncRange.end, showRange.start));
  }

  let showHook = '';
  if (showRange) {
    const showBody = script.slice(showRange.start, showRange.end);
    const activeIndex = showBody.indexOf(activeAnchor);
    const heroIndex = showBody.indexOf(heroAnchor);
    if (activeIndex >= 0 && heroIndex > activeIndex) {
      const start = activeIndex + activeAnchor.length;
      showHook = trimScriptSegment(showBody.slice(start, heroIndex));
    }
  }

  if (!declarations && !helpers && !showHook) return null;
  return { declarations, helpers, showHook };
}

function buildShellAddonScript(sourceId, additions) {
  if (!additions) return '';
  const parts = [];

  if (additions.declarations) parts.push(additions.declarations);
  if (additions.helpers) parts.push(additions.helpers);
  if (additions.showHook) {
    const sourceToken = sourceId.replace(/[^a-zA-Z0-9_$]/g, '_');
    parts.push(`(function attachShowHook_${sourceToken}() {
  if (typeof show !== 'function') return;
  function runSourceHook(idx) {
    idx = clampSlideIndex(idx);
    ${additions.showHook}
  }
  const previousShow = show;
  show = function(idx, opts) {
    previousShow(idx, opts);
    runSourceHook(idx);
  };
  const activeIndex = Array.from(slides).findIndex((slide) => slide.classList.contains('active'));
  if (activeIndex >= 0) runSourceHook(activeIndex);
})();`);
  }

  return parts.join('\n\n').trim();
}

function finalPrintCss(pageSize) {
  const width = pageSize?.width || '16in';
  const height = pageSize?.height || '9in';
  return `
@page { size: ${width} ${height}; margin: 0; }
@media print {
  html, body {
    width: ${width} !important;
    height: auto !important;
    margin: 0 !important;
    overflow: visible !important;
    background: #000 !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
  .deck {
    position: static !important;
    inset: auto !important;
    width: ${width} !important;
    height: auto !important;
    overflow: visible !important;
  }
  .deck-backdrop, .nav, .hint, .slide-toc-dock { display: none !important; }
  .deck .slide {
    position: relative !important;
    inset: auto !important;
    display: flex !important;
    opacity: 1 !important;
    width: ${width} !important;
    height: ${height} !important;
    min-width: ${width} !important;
    min-height: ${height} !important;
    max-width: ${width} !important;
    max-height: ${height} !important;
    overflow: hidden !important;
    transition: none !important;
    break-after: page !important;
    page-break-after: always !important;
  }
  .deck .slide:last-of-type {
    break-after: auto !important;
    page-break-after: auto !important;
  }
}`;
}

function warmWindowCss() {
  return `
.deck .slide.warm {
  display: flex !important;
  visibility: hidden !important;
  pointer-events: none !important;
  opacity: 0 !important;
}

.deck .slide.active {
  visibility: visible !important;
  pointer-events: auto !important;
}`;
}

function softTransitionCss() {
  return `
.deck {
  isolation: isolate;
}

.slide {
  position: absolute;
}

.slide .page-num {
  position: absolute !important;
  top: 4.4vh !important;
  right: 4.8vw !important;
  bottom: auto !important;
  left: auto !important;
  margin: 0 !important;
  padding: 0 !important;
  border: none !important;
  border-radius: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
  color: rgba(255, 255, 255, 0.78) !important;
  font-size: clamp(12px, 1.2vmin, 14px) !important;
  font-weight: 600 !important;
  line-height: 1 !important;
  letter-spacing: 0.14em !important;
  text-transform: none !important;
  font-variant-numeric: tabular-nums !important;
  z-index: 6 !important;
  pointer-events: none !important;
  white-space: nowrap !important;
}

.deck-backdrop {
  transition:
    opacity 0.56s cubic-bezier(0.22, 1, 0.36, 1),
    filter 0.56s cubic-bezier(0.22, 1, 0.36, 1) !important;
}

.deck-backdrop--default {
  background: linear-gradient(180deg, #161922 0%, #0d1018 100%) !important;
}

.deck-backdrop--hero {
  background:
    radial-gradient(circle at 82% 18%, rgba(255, 186, 66, 0.058) 0%, rgba(255, 186, 66, 0.058) 24%, rgba(255, 186, 66, 0) 25%),
    radial-gradient(circle at 66% 72%, rgba(255, 245, 228, 0.018) 0%, rgba(255, 245, 228, 0.018) 23%, rgba(255, 245, 228, 0) 24%),
    radial-gradient(circle at 102% 10%, rgba(255, 114, 0, 0.056) 0%, rgba(255, 114, 0, 0.056) 23%, rgba(255, 114, 0, 0) 24%),
    linear-gradient(135deg, #4c2500 0%, #7f3900 56%, #aa5712 100%) !important;
}

.deck-backdrop--hero::before {
  background: radial-gradient(
    circle at 44% 44%,
    rgba(255, 244, 225, 0.084) 0%,
    rgba(255, 232, 198, 0.044) 24%,
    rgba(255, 215, 175, 0.022) 46%,
    rgba(255, 196, 140, 0.011) 64%,
    rgba(255, 186, 66, 0.007) 80%,
    rgba(255, 186, 66, 0.002) 92%,
    rgba(255, 186, 66, 0) 100%
  ) !important;
}

.deck-backdrop--hero::after {
  background: radial-gradient(
    circle at 52% 52%,
    rgba(255, 247, 236, 0.064) 0%,
    rgba(255, 244, 232, 0.034) 28%,
    rgba(255, 239, 224, 0.018) 48%,
    rgba(255, 244, 233, 0.009) 66%,
    rgba(255, 248, 240, 0.005) 82%,
    rgba(255, 248, 240, 0.002) 93%,
    rgba(255, 248, 240, 0) 100%
  ) !important;
}

.slide {
  transition:
    opacity 0.56s cubic-bezier(0.22, 1, 0.36, 1),
    visibility 0s linear 0.56s !important;
  visibility: hidden;
  pointer-events: none;
}

.slide.active,
.slide.entering,
.slide.leaving {
  display: flex !important;
}

.slide.active {
  opacity: 1 !important;
  visibility: visible !important;
  pointer-events: auto !important;
  z-index: 2;
  transition:
    opacity 0.56s cubic-bezier(0.22, 1, 0.36, 1),
    visibility 0s linear 0s !important;
}

.slide.entering,
.slide.leaving {
  visibility: visible !important;
  pointer-events: none !important;
  transition:
    opacity 0.56s cubic-bezier(0.22, 1, 0.36, 1),
    visibility 0s linear 0s !important;
}

.slide.entering {
  opacity: 0 !important;
  z-index: 3;
}

.slide.leaving {
  opacity: 1 !important;
  z-index: 1;
}
`;
}

function softTransitionScript() {
  return `
(function () {
  if (typeof show !== 'function') return;

  const SLIDE_FADE_MS = 560;
  let fadeTimer = null;
  let enterFrame = null;
  const slideNumberToIndex = new Map(
    Array.from(slides).map((slide, idx) => [parseInt(slide?.dataset?.slide || '', 10), idx]).filter(([n]) => Number.isFinite(n)),
  );
  const resolveSlideNumber = (slide, idx) => {
    if (typeof slideNumber === 'function') return slideNumber(slide, idx + 1);
    const n = parseInt(slide?.dataset?.slide || '', 10);
    return Number.isFinite(n) ? n : idx + 1;
  };
  const resolveDeckTotal = () => {
    if (typeof deckTotal !== 'undefined' && Number.isFinite(deckTotal)) return deckTotal;
    const configured = parseInt(deck?.dataset?.deckTotal || '', 10);
    return Number.isFinite(configured) ? configured : total;
  };
  const syncTocLabels = () => {
    if (!Array.isArray(tocItemButtons)) return;
    tocItemButtons.forEach((btn, idx) => {
      const label = btn.querySelector('.slide-toc-idx');
      if (label) label.textContent = 'PAGE ' + pad(resolveSlideNumber(slides[idx], idx));
    });
  };

  slideIndexFromHash = function() {
    const raw = location.hash.slice(1).trim();
    if (!raw) return null;
    let m = /^(\\d+)$/.exec(raw);
    if (m) return slideNumberToIndex.get(parseInt(m[1], 10)) ?? null;
    m = /^page-?(\\d+)$/i.exec(raw);
    if (m) return slideNumberToIndex.get(parseInt(m[1], 10)) ?? null;
    return null;
  };

  syncLocationHash = function(idx) {
    const want = '#' + resolveSlideNumber(slides[idx], idx);
    if (location.hash !== want) history.replaceState(null, '', want);
  };

  show = function(idx, opts) {
    const syncHash = !opts || opts.syncHash !== false;
    idx = clampSlideIndex(idx);

    const nextSlide = slides[idx];
    const prevSlide = slides[current];

    if (fadeTimer) {
      clearTimeout(fadeTimer);
      fadeTimer = null;
    }
    if (enterFrame) {
      cancelAnimationFrame(enterFrame);
      enterFrame = null;
    }

    slides.forEach((slide) => {
      if (slide !== prevSlide && slide !== nextSlide) {
        slide.classList.remove('active', 'entering', 'leaving');
      }
    });

    if (prevSlide && prevSlide !== nextSlide) {
      prevSlide.classList.remove('active', 'entering');
      prevSlide.classList.add('leaving');
    }

    nextSlide.classList.remove('leaving');
    if (!nextSlide.classList.contains('active')) {
      nextSlide.classList.add('entering');
      void nextSlide.offsetWidth;
    }
    enterFrame = requestAnimationFrame(() => {
      nextSlide.classList.add('active');
      nextSlide.classList.remove('entering');
      enterFrame = null;
    });

    const isHero = nextSlide.matches('.cover, .slide-transition-hero, .slide-closing-cn, .anchor');
    if (prevSlide && prevSlide !== nextSlide) {
      const leavingSlide = prevSlide;
      fadeTimer = window.setTimeout(() => {
        leavingSlide.classList.remove('leaving');
        deck.classList.toggle('deck--hero', isHero);
        fadeTimer = null;
      }, SLIDE_FADE_MS);
    } else {
      deck.classList.toggle('deck--hero', isHero);
    }

    current = idx;
    const currentSlideNumber = resolveSlideNumber(nextSlide, idx);
    const totalSlidesForCounter = resolveDeckTotal();
    counter.textContent = pad(currentSlideNumber) + ' / ' + pad(totalSlidesForCounter);
    progressBar.style.setProperty('--progress', (currentSlideNumber / totalSlidesForCounter * 100) + '%');
    tocItemButtons.forEach((btn, j) => {
      btn.classList.toggle('is-active', j === idx);
    });
    if (isTocOpen()) {
      const activeBtn = tocItemButtons[idx];
      if (activeBtn) activeBtn.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
    if (syncHash) syncLocationHash(idx);
  };

  syncTocLabels();
  const initialIndex = slideIndexFromHash() ?? current ?? 0;
  show(initialIndex, { syncHash: true });
})();
`;
}

function warmWindowScript(radius) {
  return `
(function () {
  const radius = ${radius};
  if (!Number.isFinite(radius) || radius < 1) return;

  let scheduled = false;
  let observer = null;

  function getSlides() {
    return Array.from(document.querySelectorAll('.slide'));
  }

  function getActiveIndex(slides) {
    return slides.findIndex((slide) => slide.classList.contains('active'));
  }

  function prewarmImage(img, distance) {
    if (img.loading === 'lazy') img.loading = 'eager';
    if ('fetchPriority' in img && !img.dataset.prewarmPrioritySet) {
      img.fetchPriority = distance === 0 ? 'high' : 'low';
      img.dataset.prewarmPrioritySet = 'true';
    }
    if (!img.dataset.prewarmRequested) {
      const src = img.currentSrc || img.src;
      if (src) {
        const probe = new Image();
        probe.decoding = 'async';
        probe.src = src;
      }
      img.dataset.prewarmRequested = 'true';
    }
    if (img.decode && !img.dataset.prewarmDecoded) {
      const markDecoded = () => {
        img.dataset.prewarmDecoded = 'true';
        img.decode().catch(() => {});
      };
      if (img.complete) markDecoded();
      else img.addEventListener('load', markDecoded, { once: true });
    }
  }

  function updateWarmWindow() {
    const slides = getSlides();
    const activeIndex = getActiveIndex(slides);
    if (activeIndex < 0) return;

    slides.forEach((slide, index) => {
      const distance = Math.abs(index - activeIndex);
      const shouldWarm = distance > 0 && distance <= radius;
      slide.classList.toggle('warm', shouldWarm);
      if (!shouldWarm) return;
      slide.querySelectorAll('img').forEach((img) => prewarmImage(img, distance));
    });
  }

  function scheduleUpdate() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      updateWarmWindow();
    });
  }

  function startObserver() {
    const slides = getSlides();
    if (observer) observer.disconnect();
    observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.attributeName === 'class') {
          scheduleUpdate();
          break;
        }
      }
    });
    slides.forEach((slide) => {
      observer.observe(slide, { attributes: true, attributeFilter: ['class'] });
    });
    scheduleUpdate();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startObserver, { once: true });
  } else {
    startObserver();
  }

  window.addEventListener('hashchange', scheduleUpdate);
  window.addEventListener('load', scheduleUpdate);
})();
`;
}

function main() {
  const { config, configDir } = readConfig(process.argv);
  const merge = config.merge || {};
  if (!merge.sources?.length) throw new Error('Config missing merge.sources');
  if (!merge.outputHtml) throw new Error('Config missing merge.outputHtml');

  const output = resolveFromConfig(configDir, merge.outputHtml);
  ensureDir(path.dirname(output));
  const appendCssPath = merge.appendCssPath ? resolveFromConfig(configDir, merge.appendCssPath) : null;
  const appendCss = appendCssPath ? fs.readFileSync(appendCssPath, 'utf8') : '';
  const preloadWindowRadius = Math.max(0, Math.floor(Number(merge.preloadWindowRadius ?? 2) || 0));
  const excludeSlidesContainingText = (merge.excludeSlidesContainingText || []).filter(Boolean);

  const docs = merge.sources.map((source) => ({
    ...source,
    file: resolveFromConfig(configDir, source.file),
  })).map((source) => ({ ...source, html: fs.readFileSync(source.file, 'utf8') }));

  const first = docs[0];
  const title = merge.title || matchOne(/<title[^>]*>([\s\S]*?)<\/title>/i, first.html, 'title').replace(/\s+/g, ' ').trim();
  const firstBody = matchOne(/<body[^>]*>([\s\S]*?)<\/body>/i, first.html, 'body');
  let { prefix, nav } = extractBodyShell(firstBody);

  const styleBlocks = [];
  const externalScripts = [];
  const inlineScripts = [];
  const shellAddonScripts = [];
  const seenSrc = new Set();
  const seenInline = new Set();
  const seenShellAddons = new Set();
  const slideRows = [];

  docs.forEach((doc, index) => {
    const body = matchOne(/<body[^>]*>([\s\S]*?)<\/body>/i, doc.html, `body ${doc.file}`);
    const excludedNumbers = new Set((doc.excludeSlideNumbers || []).map((number) => Number(number)));
    const extractedSlides = extractSlides(body).filter(
      (slide) => !shouldExcludeSlide(slide, excludeSlidesContainingText) && !excludedNumbers.has(slideNumberFrom(slide)),
    );
    const slideRootClasses = slideRootClassesFrom(extractedSlides);

    const styles = Array.from(doc.html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)).map((m) => m[1]);
    for (const css of styles) {
      styleBlocks.push(scopeCss(css, doc.id, slideRootClasses, index === 0));
    }

    for (const slide of extractedSlides) {
      const m = /data-slide="(\d+)"/.exec(slide);
      if (!m) continue;
      slideRows.push({ number: Number(m[1]), sourceId: doc.id, file: doc.file, html: addSourceClass(slide, doc.id) });
    }

    for (const script of doc.html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/gi)) {
      const src = /\ssrc="([^"]+)"/i.exec(script[1]);
      if (src) {
        if (!seenSrc.has(src[1])) {
          seenSrc.add(src[1]);
          externalScripts.push(src[1]);
        }
        continue;
      }
      const bodyText = script[2].trim();
      if (!bodyText) continue;
      if (index > 0 && shellSignaturePresent(bodyText)) {
        const addonScript = buildShellAddonScript(doc.id, extractShellAdditions(bodyText));
        if (addonScript) {
          const normalizedAddon = normalizeScriptBody(addonScript);
          if (!seenShellAddons.has(normalizedAddon)) {
            seenShellAddons.add(normalizedAddon);
            shellAddonScripts.push(addonScript);
          }
        }
        continue;
      }
      if (bodyText.includes('function initWorkbenchStart') && index > 0) continue;
      const normalized = normalizeScriptBody(bodyText);
      if (!seenInline.has(normalized)) {
        seenInline.add(normalized);
        inlineScripts.push(bodyText);
      }
    }
  });

  slideRows.sort((a, b) => a.number - b.number || a.file.localeCompare(b.file));
  const deckTotal = merge.deckTotal || Math.max(...slideRows.map((slide) => slide.number));
  const firstNumber = slideRows[0].number;

  prefix = prefix.replace(/<div class="deck\b[^"]*"[^>]*data-workbench="true"[^>]*>/i, (tag) => {
    let next = tag;
    if (/data-start-slide="\d+"/i.test(next)) {
      next = next.replace(/data-start-slide="\d+"/i, `data-start-slide="${firstNumber}"`);
    } else {
      next = next.replace(/>$/, ` data-start-slide="${firstNumber}">`);
    }
    if (/data-deck-total="\d+"/i.test(next)) {
      next = next.replace(/data-deck-total="\d+"/i, `data-deck-total="${deckTotal}"`);
    } else {
      next = next.replace(/>$/, ` data-deck-total="${deckTotal}">`);
    }
    return next;
  });
  nav = nav.replace(
    /(<span class="counter" id="counter">)\s*\d+\s*\/\s*\d+\s*(<\/span>)/,
    `$1${String(firstNumber).padStart(2, '0')} / ${String(deckTotal).padStart(2, '0')}$2`,
  );

  const slides = slideRows.map((slide) => updatePageNum(slide.html, deckTotal));
  const fontLinks = merge.fontLinks || [
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Noto+Sans+SC:wght@300;400;500;600;700&display=swap',
  ];

  const html = [
    '<!DOCTYPE html>',
    '<html lang="en">',
    '<head>',
    '<meta charset="UTF-8">',
    `<title>${title}</title>`,
    merge.baseHref ? `<base href="${merge.baseHref}">` : '',
    ...fontLinks.map((href) => `<link href="${href}" rel="stylesheet" />`),
    '<style>',
    styleBlocks.join('\n\n'),
    preloadWindowRadius > 0 ? warmWindowCss() : '',
    appendCss,
    softTransitionCss(),
    finalPrintCss(merge.pageSize),
    '</style>',
    '</head>',
    '<body>',
    prefix.trimEnd(),
    '',
    slides.join('\n\n'),
    '',
    nav.trim(),
    ...externalScripts.map((src) => `<script src="${src}"></script>`),
    ...inlineScripts.flatMap((script) => ['<script>', script, '</script>']),
    '<script>',
    softTransitionScript(),
    '</script>',
    ...shellAddonScripts.flatMap((script) => ['<script>', script, '</script>']),
    preloadWindowRadius > 0 ? '<script>' : '',
    preloadWindowRadius > 0 ? warmWindowScript(preloadWindowRadius) : '',
    preloadWindowRadius > 0 ? '</script>' : '',
    '</body>',
    '</html>',
  ].filter(Boolean).join('\n');

  fs.writeFileSync(output, html, 'utf8');
  console.log(output);
  console.log(`slide_count=${slideRows.length}`);
  console.log(`deck_total=${deckTotal}`);
  console.log(`preload_window_radius=${preloadWindowRadius}`);
  console.log(`slides=${slideRows.map((slide) => slide.number).join(',')}`);
}

main();
