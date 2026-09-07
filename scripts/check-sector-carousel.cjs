const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const { chromium } = require('playwright');
const sharp = require('sharp');

const root = path.resolve(__dirname, '..');
const output = path.join(process.env.TEMP || '/tmp', 'steelstructure-carousel-qa');
fs.mkdirSync(output, { recursive: true });
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.json': 'application/json', '.svg': 'image/svg+xml' };
const server = http.createServer((req, res) => {
  const name = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  const file = path.resolve(root, '.' + (name === '/' ? '/index.html' : name));
  if (!file.startsWith(root + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) return res.writeHead(404).end();
  res.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream');
  res.end(fs.readFileSync(file));
});

(async () => {
  let browser;
  const errors = [];
  try {
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    const base = `http://127.0.0.1:${server.address().port}`;
    browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_PATH });
    const page = await browser.newPage();
    page.on('pageerror', error => errors.push(error.message));
    await page.clock.install();
    await page.goto(base);
    const ids = await page.evaluate(() => STEEL_SECTORS.map(s => s.id));
    for (const viewport of [{ width: 1440, height: 900 }, { width: 1920, height: 1080 }, { width: 390, height: 844 }, { width: 320, height: 640 }]) {
      await page.setViewportSize(viewport);
      for (const lang of ['en', 'zh']) {
        await page.evaluate(lang => setLanguage(lang), lang);
        for (let i = 0; i < ids.length; i++) {
          await page.locator('.sector-choice').nth(i).click();
          await page.waitForFunction(id => document.querySelector('.sector-hero').dataset.sector === id, ids[i]);
          await page.clock.runFor(800);
          assert.equal(await page.locator('.sector-image.is-visible').count(), 1);
          assert.ok(await page.locator('.sector-image.is-visible').evaluate(img => img.complete && img.naturalWidth > 0));
          const layout = await page.evaluate(() => {
            const b = selector => document.querySelector(selector).getBoundingClientRect();
            const brand = b('.sector-brand'), bottom = b('.sector-bottom'), stage = b('.sector-stage'), controls = b('.sector-controls'), caption = b('.sector-caption');
            return {
              overflow: document.documentElement.scrollWidth > innerWidth,
              overlap: brand.bottom > bottom.top || (caption.right > controls.left && caption.bottom > controls.top),
              clipped: bottom.bottom > stage.bottom || brand.left < 0 || bottom.right > innerWidth,
              nextVisible: b('.home-workflows').top < innerHeight - 16
            };
          });
          assert.deepEqual(layout, { overflow: false, overlap: false, clipped: false, nextVisible: true }, `${viewport.width} ${lang} ${ids[i]} layout`);
          if (lang === 'zh' && [1440, 390].includes(viewport.width)) {
            const shot = await page.screenshot({ path: path.join(output, `${viewport.width}-${ids[i]}.png`), animations: 'disabled' });
            const stats = await sharp(shot).stats();
            assert.ok(stats.channels.some(c => c.stdev > 25), 'Screenshot cannot be blank');
          }
        }
      }
    }
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(base);
    await page.mouse.move(1439, 899);
    await page.waitForFunction(() => document.querySelector('.sector-hero').dataset.playing === 'true');
    await page.clock.runFor(7100);
    await page.waitForFunction(() => document.querySelector('.sector-hero').dataset.sector === 'renewable-energy');
    await page.locator('[data-sector-action="pause"]').click();
    await page.clock.runFor(15000);
    assert.equal(await page.locator('.sector-hero').getAttribute('data-sector'), 'renewable-energy');
    await page.locator('[data-sector-action="pause"]').click();
    await page.clock.runFor(7100);
    await page.waitForFunction(() => document.querySelector('.sector-hero').dataset.sector === 'oil-gas-lng');
    await page.locator('[data-sector-action="next"]').click();
    await page.waitForFunction(() => document.querySelector('.sector-hero').dataset.sector === 'industrial-manufacturing');
    await page.keyboard.press('ArrowLeft');
    await page.waitForFunction(() => document.querySelector('.sector-hero').dataset.sector === 'oil-gas-lng');
    assert.equal(await page.locator('.sector-hero').getAttribute('data-paused'), 'true');
    await page.locator('.sector-choice').first().click();
    await page.keyboard.press('ArrowLeft');
    await page.waitForFunction(() => document.querySelector('.sector-hero').dataset.sector === 'ports-marine');

    await page.goto(base);
    await page.mouse.move(1439, 899);
    await page.evaluate(() => scrollTo(0, 1500));
    await page.waitForFunction(() => document.querySelector('.sector-hero').dataset.playing === 'false');
    await page.clock.runFor(15000);
    assert.equal(await page.locator('.sector-hero').getAttribute('data-sector'), ids[0]);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(base);
    assert.equal(await page.locator('.sector-hero').getAttribute('data-paused'), 'true');
    await page.clock.runFor(15000);
    assert.equal(await page.locator('.sector-hero').getAttribute('data-sector'), ids[0]);
    await page.locator('[data-sector-action="next"]').click();
    await page.waitForFunction(id => document.querySelector('.sector-hero').dataset.sector === id, ids[1]);

    await page.evaluate(() => document.documentElement.classList.add('dark'));
    await page.screenshot({ path: path.join(output, 'dark.png'), animations: 'disabled' });
    await page.goto(`${base}/image-credits.html`);
    assert.equal(await page.locator('section').count(), 7);
    for (const link of await page.locator('a[href^="http"]').all()) assert.ok(await link.getAttribute('href'));
    const offline = await browser.newPage();
    await offline.route('**/renewable-energy*.webp', route => route.abort());
    await offline.goto(base);
    await offline.locator('[data-sector-action="next"]').click();
    await offline.waitForFunction(() => document.querySelector('#sector-credit').textContent.includes('unavailable'));
    assert.ok(await offline.locator('.sector-image.is-visible').evaluate(img => img.complete && img.naturalWidth > 0));
    await offline.locator('.sector-choice').nth(2).click();
    await offline.waitForFunction(() => document.querySelector('.sector-hero').dataset.sector === 'oil-gas-lng');
    const noScript = await browser.newPage({ javaScriptEnabled: false });
    await noScript.goto(base);
    assert.ok(await noScript.locator('.sector-image').isVisible());
    assert.equal(await noScript.locator('.sector-controls').isVisible(), false);
    const touchPage = await browser.newPage({ viewport: { width: 390, height: 844 }, hasTouch: true });
    await touchPage.goto(base);
    const touchSession = await touchPage.context().newCDPSession(touchPage);
    await touchSession.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: 300, y: 300 }] });
    await touchSession.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: 120, y: 310 }] });
    await touchSession.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    await touchPage.waitForFunction(() => document.querySelector('.sector-hero').dataset.sector === 'renewable-energy');
    await touchPage.locator('.sector-image.is-visible').evaluate(img => new Promise(resolve => {
      if (getComputedStyle(img).opacity === '1') resolve();
      else img.addEventListener('transitionend', resolve, { once: true });
    }));
    await touchPage.screenshot({ path: path.join(output, 'touch-real-time.png') });
    const real = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await real.goto(base);
    await real.locator('.sector-image').evaluate(img => img.decode());
    await real.screenshot({ path: path.join(output, 'initial-real-time.png') });
    await real.locator('.sector-stage').hover();
    assert.equal(await real.locator('.sector-hero').getAttribute('data-playing'), 'false');
    await real.mouse.move(1439, 899);
    assert.equal(await real.locator('.sector-hero').getAttribute('data-playing'), 'true');
    await real.locator('.sector-choice').first().focus();
    assert.equal(await real.locator('.sector-hero').getAttribute('data-playing'), 'false');
    assert.deepEqual(errors, []);
    console.log('PASS: 56 sector/language/viewport layouts; all images decoded; auto, pause, resume, manual, keyboard, wrap, offscreen, reduced motion, load failure/recovery, no-JS fallback, touch, real-time transition, hover and focus.');
    console.log('Screenshots: ' + output);
  } finally {
    if (browser) await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
