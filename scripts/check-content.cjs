const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.csv': 'text/csv' };
const server = http.createServer((req, res) => {
  const name = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  const file = path.resolve(root, '.' + (name === '/' ? '/index.html' : name));
  if (!file.startsWith(root + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
    res.writeHead(404).end();
    return;
  }
  res.setHeader('Content-Type', (types[path.extname(file)] || 'application/octet-stream') + '; charset=utf-8');
  res.end(fs.readFileSync(file));
});

(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  let browser;
  const errors = [];
  const screenshots = path.join(process.env.TEMP || '/tmp', 'steelstructure-content-qa');
  fs.mkdirSync(screenshots, { recursive: true });
  try {
    browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_PATH });
    const page = await browser.newPage();
    page.on('pageerror', error => errors.push(error.message));
    const base = `http://127.0.0.1:${server.address().port}`;
    for (const width of [1440, 1024, 390, 320]) {
      await page.setViewportSize({ width, height: 900 });
      for (const file of ['index.html', 'knowledge.html', 'resources.html', 'daily.html']) {
        await page.goto(`${base}/${file}`);
        if (file === 'index.html') await page.waitForSelector('.home-daily-card');
        if (file === 'daily.html') await page.waitForSelector('.brief-item');
        if (file === 'knowledge.html') assert.equal(await page.locator('#knowledge-notes details').count(), 8);
        for (const lang of ['en', 'zh']) {
          await page.evaluate(lang => setLanguage(lang), lang);
          assert.equal(await page.locator('html').getAttribute('lang'), lang === 'zh' ? 'zh-CN' : 'en');
          const overflow = await page.evaluate(() => [...document.querySelectorAll('main *, .home-workflows *, .hero *, nav *')].filter(el => {
            const rect = el.getBoundingClientRect();
            return rect.width > 0 && getComputedStyle(el).position !== 'fixed' && (rect.right > innerWidth + 1 || rect.left < -1);
          }).map(el => el.tagName + '.' + el.className));
          assert.deepEqual(overflow, [], `${file} ${lang} ${width}: overflow`);
          const missing = await page.locator('[data-i18n]').evaluateAll(elements => elements.filter(el => el.textContent === el.dataset.i18n).map(el => el.dataset.i18n));
          assert.deepEqual(missing, [], `${file}: untranslated keys`);
          const links = await page.locator('a[href], script[src], link[href]').evaluateAll(elements => elements.map(el => el.getAttribute('href') || el.getAttribute('src')));
          for (const link of links) {
            if (/^(https?:|data:|mailto:|#|javascript:)/.test(link)) continue;
            const target = link.split(/[?#]/)[0];
            assert.ok(fs.existsSync(path.resolve(root, target)), `${file}: missing ${link}`);
          }
        }
        if (width === 390 || width === 1440) await page.screenshot({ path: path.join(screenshots, `${file}-${width}.png`), fullPage: file !== 'daily.html', animations: 'disabled' });
      }
    }
    await page.goto(`${base}/knowledge.html#materials`);
    await page.waitForSelector('#materials[open]');
    await page.locator('#knowledge-search').fill('not-a-topic-xyz');
    assert.ok(await page.locator('#knowledge-empty').isVisible());
    await page.locator('#knowledge-search').fill('焊接');
    assert.ok(await page.locator('#welding').isVisible());
    await page.locator('#lang-toggle').click();
    assert.equal(await page.locator('html').getAttribute('lang'), 'en');
    await page.locator('#knowledge-search').fill('');
    await page.locator('#hamburger').click();
    assert.equal(await page.locator('#hamburger').getAttribute('aria-expanded'), 'true');
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('#hamburger').getAttribute('aria-expanded'), 'false');
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.locator('#search-btn').click();
    await page.locator('#search-input').fill('模板');
    assert.equal(await page.locator('#search-results a').first().getAttribute('href'), 'resources.html#templates');
    await page.keyboard.press('Escape');
    await page.locator('#theme-toggle').click();
    assert.ok(await page.locator('html.dark').count());
    await page.evaluate(() => scrollTo(0, 0));
    await page.screenshot({ path: path.join(screenshots, 'knowledge-dark.png'), fullPage: true, animations: 'disabled' });
    await page.goto(`${base}/resources.html`);
    for (const link of await page.locator('a[download]').all()) {
      const downloadEvent = page.waitForEvent('download');
      await link.click();
      const download = await downloadEvent;
      assert.ok(download.suggestedFilename().endsWith('.csv'));
      assert.equal(await download.failure(), null);
      const bytes = fs.readFileSync(await download.path());
      assert.equal(bytes.subarray(0, 3).toString('hex'), 'efbbbf');
    }
    await page.goto(`${base}/daily.html`);
    await page.waitForSelector('.brief-item');
    await page.locator('.brief-editions summary').click();
    const older = page.locator('[data-brief-path="data/briefs/2026-06-03.json"]');
    await older.click();
    await page.waitForFunction(() => document.querySelector('.brief-hero h2')?.textContent.includes('2026-06-03'));
    await page.locator('#lang-toggle').click();
    assert.ok((await page.locator('.brief-hero h2').innerText()).includes('2026-06-03'));
    await page.route('**/data/briefs/latest.json', route => route.abort());
    await page.goto(`${base}/index.html`);
    assert.ok((await page.locator('#home-brief-date').innerText()).includes('2026-06-18'));
    assert.equal(await page.locator('#home-brief-preview a').getAttribute('href'), 'daily.html');
    assert.deepEqual(errors, []);
    console.log('PASS: 32 bilingual viewport checks; links, topic search, deep links, language/menu/search/theme, 3 CSV downloads, brief archive selection and offline fallback.');
    console.log(`Screenshots: ${screenshots}`);
  } finally {
    if (browser) await browser.close();
    server.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
