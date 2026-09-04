import { chromium } from 'playwright-core';
import { mkdir } from 'node:fs/promises';

const browser = await chromium.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true,
});

await mkdir('qa', { recursive: true });

for (const size of [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
]) {
  const page = await browser.newPage({ viewport: size, deviceScaleFactor: 1 });
  await page.goto('http://127.0.0.1:4173', { waitUntil: 'networkidle' });
  await page.screenshot({ path: `qa/${size.name}.png`, fullPage: true });
  const diagnostics = await page.evaluate(() => ({
    title: document.title,
    pageWidth: document.documentElement.scrollWidth,
    viewportWidth: window.innerWidth,
    bodyHeight: document.body.scrollHeight,
    overflow: [...document.querySelectorAll('*')]
      .filter((el) => el.getBoundingClientRect().right > window.innerWidth + 1)
      .slice(0, 10)
      .map((el) => ({ tag: el.tagName, className: el.className, right: Math.round(el.getBoundingClientRect().right) })),
    buttons: document.querySelectorAll('a.button').length,
    sections: document.querySelectorAll('main section').length,
  }));
  if (size.name === 'mobile') {
    await page.locator('.menu-button').click();
    diagnostics.mobileMenuOpens = await page.locator('.site-header nav').evaluate((el) => el.classList.contains('open'));
    await page.locator('.menu-button').click();
    await page.locator('.faq-item button').nth(1).click();
    diagnostics.faqSwitches = await page.locator('.faq-item').nth(1).evaluate((el) => el.classList.contains('active'));
  }
  console.log(size.name, JSON.stringify(diagnostics));
  await page.close();
}

await browser.close();
