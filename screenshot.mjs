import puppeteer from 'puppeteer';
import { existsSync, mkdirSync, readdirSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const ROOT = fileURLToPath(new URL('.', import.meta.url));
const DIR  = join(ROOT, 'temporary screenshots');

if (!existsSync(DIR)) mkdirSync(DIR);

const url   = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] ? `-${process.argv[3]}` : '';

const existing = readdirSync(DIR).filter(f => f.endsWith('.png'));
const next = existing.length + 1;
const filename = `screenshot-${next}${label}.png`;
const dest = join(DIR, filename);

const browser = await puppeteer.launch({
  executablePath: 'C:/Users/jacks/.cache/puppeteer/chrome/win64-148.0.7778.167/chrome-win64/chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: 'networkidle2', timeout: 15000 });
await new Promise(r => setTimeout(r, 800));
// Force all scroll-reveal elements visible for screenshot
await page.evaluate(() => {
  document.querySelectorAll('.reveal, .reveal-row').forEach(el => el.classList.add('visible'));
});
await new Promise(r => setTimeout(r, 400));
const fullPage = process.argv[4] !== 'viewport';
await page.screenshot({ path: dest, fullPage });
await browser.close();

console.log(`Saved: temporary screenshots/${filename}`);