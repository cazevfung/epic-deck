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

function inchesToPoints(value, fallback) {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value !== 'string') return fallback;
  const trimmed = value.trim().toLowerCase();
  if (trimmed.endsWith('in')) return Number.parseFloat(trimmed) * 72;
  if (trimmed.endsWith('pt')) return Number.parseFloat(trimmed);
  return fallback;
}

async function main() {
  const { config, configDir } = readConfig(process.argv);
  const pdf = config.pdf || {};
  const merge = config.merge || {};

  const inputHtml = resolveFromConfig(configDir, pdf.inputHtml || merge.outputHtml);
  const outputPdf = resolveFromConfig(configDir, pdf.outputPdf);
  const pagesDir = resolveFromConfig(configDir, pdf.pagesDir || '04_assembly/.deck-pdf-pages-raster');
  if (!inputHtml || !outputPdf) throw new Error('Config missing pdf.inputHtml/merge.outputHtml or pdf.outputPdf');

  const chromePath = pdf.chromePath || config.chromePath || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const viewport = pdf.viewport || { width: 1600, height: 900, deviceScaleFactor: 1 };
  const pageSize = pdf.pageSize || merge.pageSize || { width: '16in', height: '9in' };
  const waitMs = Number(pdf.waitMs ?? 2500);
  const jpegQuality = Math.min(100, Math.max(1, Number(pdf.jpegQuality ?? 60)));

  ensureDir(pagesDir);
  ensureDir(path.dirname(outputPdf));
  for (const file of fs.readdirSync(pagesDir)) {
    if (file.endsWith('.jpg')) fs.unlinkSync(path.join(pagesDir, file));
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

    const pdfDoc = await PDFDocument.create();
    const pageWidth = inchesToPoints(pageSize.width, 16 * 72);
    const pageHeight = inchesToPoints(pageSize.height, 9 * 72);

    for (const slideNumber of slideNumbers) {
      await page.evaluate((n) => {
        location.hash = String(n);
        window.dispatchEvent(new HashChangeEvent('hashchange'));
      }, slideNumber);
      await waitForActiveSlide(page, slideNumber, waitMs);

      const activeSlide = await page.$(`.slide.active[data-slide="${slideNumber}"]`);
      if (!activeSlide) throw new Error(`Active slide not found for ${slideNumber}`);
      const bounds = await activeSlide.boundingBox();
      if (!bounds) throw new Error(`Active slide bounds not found for ${slideNumber}`);

      const imageBytes = await page.screenshot({
        type: 'jpeg',
        quality: jpegQuality,
        clip: {
          x: bounds.x,
          y: bounds.y,
          width: bounds.width,
          height: bounds.height,
        },
      });

      const outPath = path.join(pagesDir, `${padSlide(slideNumber)}.jpg`);
      fs.writeFileSync(outPath, imageBytes);

      const image = await pdfDoc.embedJpg(imageBytes);
      const pdfPage = pdfDoc.addPage([pageWidth, pageHeight]);
      pdfPage.drawImage(image, { x: 0, y: 0, width: pageWidth, height: pageHeight });
      console.log(outPath);
    }

    fs.writeFileSync(outputPdf, await pdfDoc.save());
    console.log(outputPdf);
    console.log(`pages=${slideNumbers.length}`);
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
