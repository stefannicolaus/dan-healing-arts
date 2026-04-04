/**
 * Pre-Deploy Check — läuft automatisch vor jedem Deploy
 *
 * Was geprüft wird:
 * 1. CTA-Buttons auf Mobile sichtbar (innerhalb des Viewports)
 * 2. Alle Bilder laden (kein 404/403)
 * 3. Kein horizontaler Overflow
 * 4. Screenshots aller kritischen Seiten auf 5 Viewports
 *
 * Aufruf: node scripts/pre-deploy-check.mjs [base-url]
 * Default base-url: http://localhost:4321
 */

import { chromium } from 'playwright';

const BASE_URL = process.argv[2] ?? 'http://localhost:4321';

const VIEWPORTS = [
  { name: '375', width: 375, height: 667 },
  { name: '390', width: 390, height: 844 },
  { name: '768', width: 768, height: 1024 },
  { name: '1280', width: 1280, height: 800 },
  { name: '1440', width: 1440, height: 900 },
];

const PAGES_TO_CHECK = [
  { path: '/',         cta: 'main section:first-of-type a.bg-forest', name: 'Homepage (DE)' },
  { path: '/en',       cta: 'main section a.bg-forest',               name: 'Homepage (EN)' },
  { path: '/massage',  cta: 'main section:first-of-type a.bg-forest', name: 'Massage' },
  { path: '/level-1',  cta: null,                                      name: 'Level 1' },
  { path: '/portugal', cta: null,                                      name: 'Portugal' },
];

let failed = false;
const issues = [];

async function checkPage(page, browser, pageDef) {
  console.log(`\nPrüfe: ${pageDef.name} (${pageDef.path})`);

  for (const vp of VIEWPORTS) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto(`${BASE_URL}${pageDef.path}`, { waitUntil: 'load', timeout: 20000 });
    await page.waitForTimeout(500);

    // 1. Horizontaler Overflow
    const overflow = await page.evaluate(() => document.body.scrollWidth > window.innerWidth);
    if (overflow) {
      const msg = `OVERFLOW auf ${pageDef.name} @ ${vp.name}px`;
      console.error(`  ✗ ${msg}`);
      issues.push(msg);
      failed = true;
    }

    // 2. CTA-Button auf Mobile sichtbar
    if (pageDef.cta && vp.width <= 390) {
      const btnVisible = await page.evaluate((selector) => {
        const btn = document.querySelector(selector);
        if (!btn) return { found: false };
        const rect = btn.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0 && rect.top >= 0;
        return { found: true, top: Math.round(rect.top), inView };
      }, pageDef.cta);

      if (!btnVisible.found) {
        const msg = `CTA-Button nicht gefunden auf ${pageDef.name} @ ${vp.name}px`;
        console.warn(`  ⚠ ${msg}`);
        issues.push(msg);
      } else if (!btnVisible.inView) {
        const msg = `CTA-Button AUSSERHALB Viewport auf ${pageDef.name} @ ${vp.name}px (top: ${btnVisible.top}px, viewport: ${vp.height}px)`;
        console.error(`  ✗ ${msg}`);
        issues.push(msg);
        failed = true;
      } else {
        console.log(`  ✓ CTA sichtbar @ ${vp.name}px (top: ${btnVisible.top}px)`);
      }
    }

    // 3. Bilder ohne 404/403 — nur auf 390px prüfen (reicht aus)
    if (vp.width === 390) {
      const brokenImages = await page.evaluate(() => {
        // Nur eager-geladene Bilder prüfen (lazy-loaded sind noch nicht im Viewport)
        const imgs = Array.from(document.querySelectorAll('img:not([loading="lazy"])'));
        return imgs
          .filter(img => img.complete && img.naturalWidth === 0 && img.src)
          .map(img => img.src);
      });
      if (brokenImages.length > 0) {
        const msg = `Kaputte Bilder auf ${pageDef.name}: ${brokenImages.slice(0, 3).join(', ')}`;
        console.error(`  ✗ ${msg}`);
        issues.push(msg);
        failed = true;
      } else {
        console.log(`  ✓ Alle Bilder laden`);
      }
    }

    // 4. Screenshot
    await page.screenshot({
      path: `/tmp/qc-${pageDef.path.replace('/', '').replace('/', '-') || 'home'}-${vp.name}.png`,
      fullPage: false,
    });
  }
}

(async () => {
  let browser;
  try {
    browser = await chromium.launch();
    const page = await browser.newPage();

    for (const pageDef of PAGES_TO_CHECK) {
      await checkPage(page, browser, pageDef);
    }

    await browser.close();

    console.log('\n' + '='.repeat(50));
    if (failed) {
      console.error(`\n✗ PRE-DEPLOY CHECK FEHLGESCHLAGEN\n`);
      console.error('Probleme:');
      issues.forEach(i => console.error(`  • ${i}`));
      console.error('\n→ Kein Deploy. Probleme zuerst fixen.\n');
      process.exit(1);
    } else {
      if (issues.length > 0) {
        console.warn(`\n⚠ WARNUNGEN (kein Blocker):`);
        issues.forEach(i => console.warn(`  • ${i}`));
      }
      console.log(`\n✓ PRE-DEPLOY CHECK BESTANDEN\n`);
      console.log('Screenshots: /tmp/qc-*.png');
      process.exit(0);
    }
  } catch (err) {
    if (browser) await browser.close();
    console.error('Check-Fehler:', err.message);
    process.exit(1);
  }
})();
