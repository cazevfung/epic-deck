const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');
const { PDFDocument } = require('pdf-lib');
const { ensureDir, fileUrl, padSlide, readConfig, resolveFromConfig } = require('./deck-build-utils');

function expandSamples(slideNumbers, samplePages) {
  const selected = new Set();
  const list = samplePages?.length ? samplePages : ['first', 'last', 'stride:5'];
  for (const item of list) {
    if (typeof item === 'number') {
      if (slideNumbers.includes(item)) selected.add(item);
      continue;
    }
    if (item === 'first') selected.add(slideNumbers[0]);
    else if (item === 'last') selected.add(slideNumbers[slideNumbers.length - 1]);
    else if (typeof item === 'string' && item.startsWith('stride:')) {
      const stride = Math.max(1, Number(item.split(':')[1]) || 5);
      slideNumbers.forEach((n, idx) => {
        if (idx % stride === 0) selected.add(n);
      });
    } else if (typeof item === 'string' && /^\d+$/.test(item) && slideNumbers.includes(Number(item))) {
      selected.add(Number(item));
    }
  }
  return Array.from(selected).sort((a, b) => a - b);
}

async function waitForSlide(page, slideNumber, waitMs) {
  await page.evaluate((n) => {
    location.hash = String(n);
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  }, slideNumber);
  await page.waitForSelector(`.slide.active[data-slide="${slideNumber}"]`, { timeout: 120000 });
  await page.evaluate(async () => {
    await document.fonts.ready;
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  });
  await new Promise((resolve) => setTimeout(resolve, waitMs));
}

async function main() {
  const { config, configDir } = readConfig(process.argv);
  const audit = config.audit || {};
  const merge = config.merge || {};
  const pdf = config.pdf || {};
  const htmlPath = resolveFromConfig(configDir, audit.inputHtml || merge.outputHtml);
  const pdfPath = pdf.outputPdf ? resolveFromConfig(configDir, pdf.outputPdf) : null;
  const outDir = resolveFromConfig(configDir, audit.outputDir || '04_assembly/audit');
  const screenshotsDir = path.join(outDir, 'samples');
  const waitMs = Number(audit.waitMs ?? 1000);
  const chromePath = audit.chromePath || pdf.chromePath || config.chromePath || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

  ensureDir(outDir);
  ensureDir(screenshotsDir);

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--allow-file-access-from-files', '--disable-web-security'],
    defaultViewport: audit.viewport || { width: 1920, height: 1080, deviceScaleFactor: 1 },
  });

  const report = {
    html: htmlPath,
    pdf: pdfPath,
    generatedAt: new Date().toISOString(),
    consoleErrors: [],
    slides: [],
    samples: [],
    pdfPages: null,
  };

  try {
    const page = await browser.newPage();
    page.on('console', (msg) => {
      if (msg.type() === 'error') report.consoleErrors.push(msg.text());
    });
    page.on('pageerror', (error) => report.consoleErrors.push(error.message));
    await page.goto(fileUrl(htmlPath), { waitUntil: 'domcontentloaded', timeout: 120000 });
    await page.addStyleTag({
      content: '.nav,.hint,.slide-toc-dock{display:none!important}html,body{overflow:hidden!important}',
    });

    const slideNumbers = await page.$$eval('.slide[data-slide]', (slides) => {
      return Array.from(new Set(slides.map((slide) => Number(slide.dataset.slide)).filter(Number.isFinite)))
        .sort((a, b) => a - b);
    });
    const sampleNumbers = expandSamples(slideNumbers, audit.samplePages);

    for (const slideNumber of slideNumbers) {
      await waitForSlide(page, slideNumber, waitMs);
      const metrics = await page.evaluate(() => {
        const slide = document.querySelector('.slide.active');
        const rect = slide.getBoundingClientRect();
        const brokenImages = Array.from(slide.querySelectorAll('img'))
          .filter((img) => img.complete && img.naturalWidth === 0)
          .map((img) => img.getAttribute('src') || img.currentSrc || '');
        return {
          slide: Number(slide.dataset.slide),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          overflowing: slide.scrollWidth > slide.clientWidth + 2 || slide.scrollHeight > slide.clientHeight + 2,
          images: slide.querySelectorAll('img').length,
          brokenImages,
          canvases: slide.querySelectorAll('canvas').length,
          textLength: (slide.innerText || '').trim().length,
        };
      });
      report.slides.push(metrics);

      if (sampleNumbers.includes(slideNumber)) {
        const screenshotPath = path.join(screenshotsDir, `${padSlide(slideNumber)}.png`);
        await page.screenshot({ path: screenshotPath, fullPage: false });
        report.samples.push(screenshotPath);
        console.log(screenshotPath);
      }
    }
  } finally {
    await browser.close();
  }

  if (pdfPath && fs.existsSync(pdfPath)) {
    const pdfDoc = await PDFDocument.load(fs.readFileSync(pdfPath));
    report.pdfPages = pdfDoc.getPageCount();
  }

  const reportPath = path.join(outDir, 'audit-report.json');
  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
  console.log(reportPath);
  console.log(`slides=${report.slides.length}`);
  console.log(`samples=${report.samples.length}`);
  if (report.pdfPages !== null) console.log(`pdf_pages=${report.pdfPages}`);

  const failures = [];
  if (report.consoleErrors.length) failures.push(`console_errors=${report.consoleErrors.length}`);
  const brokenImageCount = report.slides.reduce((sum, slide) => sum + slide.brokenImages.length, 0);
  if (brokenImageCount) failures.push(`broken_images=${brokenImageCount}`);
  if (report.pdfPages !== null && report.pdfPages !== report.slides.length) failures.push(`pdf_page_mismatch=${report.pdfPages}/${report.slides.length}`);
  if (failures.length) {
    console.error(`audit_failed: ${failures.join(' ')}`);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
