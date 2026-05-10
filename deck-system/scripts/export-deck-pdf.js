const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');
const { PDFDocument } = require('pdf-lib');
const { ensureDir, fileUrl, padSlide, readConfig, resolveFromConfig } = require('./deck-build-utils');

async function waitForActiveSlide(page, slideNumber, waitMs) {
  await page.waitForSelector(`.slide.active[data-slide="${slideNumber}"]`, { timeout: 120000 });
  await page.evaluate(async () => {
    await document.fonts.ready;
    const active = document.querySelector('.slide.active');
    const images = Array.from(active ? active.querySelectorAll('img') : []);
    await Promise.race([
      Promise.all(images.map((img) => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          img.addEventListener('load', resolve, { once: true });
          img.addEventListener('error', resolve, { once: true });
        });
      })),
      new Promise((resolve) => setTimeout(resolve, 10000)),
    ]);
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  });
  await new Promise((resolve) => setTimeout(resolve, waitMs));
}

async function mergePdfPages(pageFiles, outputPdf) {
  const merged = await PDFDocument.create();
  for (const pageFile of pageFiles) {
    const bytes = fs.readFileSync(pageFile);
    const src = await PDFDocument.load(bytes);
    const [copied] = await merged.copyPages(src, [0]);
    merged.addPage(copied);
  }
  fs.writeFileSync(outputPdf, await merged.save());
}

async function main() {
  const { config, configDir } = readConfig(process.argv);
  const pdf = config.pdf || {};
  const merge = config.merge || {};

  const inputHtml = resolveFromConfig(configDir, pdf.inputHtml || merge.outputHtml);
  const outputPdf = resolveFromConfig(configDir, pdf.outputPdf);
  const pagesDir = resolveFromConfig(configDir, pdf.pagesDir || '04_assembly/.deck-pdf-pages');
  if (!inputHtml || !outputPdf) throw new Error('Config missing pdf.inputHtml/merge.outputHtml or pdf.outputPdf');

  const chromePath = pdf.chromePath || config.chromePath || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const viewport = pdf.viewport || { width: 1920, height: 1080, deviceScaleFactor: 1 };
  const pageSize = pdf.pageSize || merge.pageSize || { width: '16in', height: '9in' };
  const waitMs = Number(pdf.waitMs ?? 2500);

  ensureDir(pagesDir);
  ensureDir(path.dirname(outputPdf));
  for (const file of fs.readdirSync(pagesDir)) {
    if (file.endsWith('.pdf')) fs.unlinkSync(path.join(pagesDir, file));
  }

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    protocolTimeout: 300000,
    args: [
      '--allow-file-access-from-files',
      '--disable-web-security',
      '--font-render-hinting=medium',
    ],
    defaultViewport: viewport,
  });

  const pageFiles = [];
  try {
    const page = await browser.newPage();
    await page.emulateMediaType('screen');
    await page.goto(fileUrl(inputHtml), { waitUntil: 'domcontentloaded', timeout: 120000 });
    await page.addStyleTag({
      content: `
        .nav, .hint, .slide-toc-dock { display: none !important; }
        html, body { width: 100vw !important; height: 100vh !important; overflow: hidden !important; }
      `,
    });

    const slideNumbers = await page.$$eval('.slide[data-slide]', (slides) => {
      return Array.from(new Set(slides.map((slide) => Number(slide.dataset.slide)).filter(Number.isFinite)))
        .sort((a, b) => a - b);
    });

    for (const slideNumber of slideNumbers) {
      await page.evaluate((n) => {
        location.hash = String(n);
        window.dispatchEvent(new HashChangeEvent('hashchange'));
      }, slideNumber);
      await waitForActiveSlide(page, slideNumber, waitMs);

      const outPath = path.join(pagesDir, `${padSlide(slideNumber)}.pdf`);
      await page.pdf({
        path: outPath,
        width: pageSize.width || '16in',
        height: pageSize.height || '9in',
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
        printBackground: true,
        preferCSSPageSize: false,
        pageRanges: '1',
        timeout: 300000,
      });
      pageFiles.push(outPath);
      console.log(outPath);
    }

    await mergePdfPages(pageFiles, outputPdf);
    console.log(outputPdf);
    console.log(`pages=${pageFiles.length}`);
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
