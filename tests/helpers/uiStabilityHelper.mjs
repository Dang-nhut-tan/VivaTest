// tests/helpers/uiStabilityHelper.mjs
// Centralized Smart UI Stability Helper for Playwright Automation
// Ensures UI is fully rendered, loaders/skeletons are gone, and fonts/images/animations are settled.

/**
 * Checks and waits for UI stability before taking screenshots or critical assertions.
 * Zero hardcoded sleep - strictly uses web-first locator assertions and browser event hooks.
 * 
 * @param {import('@playwright/test').Page} page
 * @param {object} [options]
 * @param {number} [options.timeout=5000] Maximum wait time in milliseconds
 * @param {boolean} [options.waitForFonts=true] Wait for document.fonts.ready
 * @param {boolean} [options.waitForImages=true] Wait for pending images to complete
 * @param {boolean} [options.waitForLoaders=true] Wait for skeletons and spinners to disappear
 * @param {boolean} [options.waitForAnimations=true] Wait for pending CSS/JS animations to finish
 */
export async function waitForUIStable(page, options = {}) {
  const {
    timeout = 5000,
    waitForFonts = true,
    waitForImages = true,
    waitForLoaders = true,
    waitForAnimations = true,
  } = options;

  if (!page || page.isClosed()) return;

  const deadline = Date.now() + timeout;

  // 1. Wait for document readyState
  try {
    await page.waitForFunction(() => document.readyState === 'complete' || document.readyState === 'interactive', null, {
      timeout: Math.max(1000, deadline - Date.now())
    });
  } catch {
    // Non-fatal if page is already responsive
  }

  // 2. Wait for common VivaOffice skeleton loaders, shimmer effects and spinners to disappear
  if (waitForLoaders) {
    const loaderSelectors = [
      '[aria-busy="true"]',
      '[data-section*="loading"]',
      '.skeleton',
      '.animate-spin',
      'role="progressbar"',
      '[style*="viva-shimmer"]'
    ];

    for (const selector of loaderSelectors) {
      const remainingTime = Math.max(500, deadline - Date.now());
      try {
        const loader = page.locator(selector).first();
        if (await loader.count() > 0) {
          await loader.waitFor({ state: 'hidden', timeout: Math.min(2000, remainingTime) }).catch(() => {});
        }
      } catch {
        // Fallback gracefully without blocking
      }
    }
  }

  // 3. Wait for browser fonts to be ready
  if (waitForFonts) {
    try {
      await page.evaluate(() => (document.fonts ? document.fonts.ready : Promise.resolve())).catch(() => {});
    } catch {
      // Ignore context errors
    }
  }

  // 4. Wait for visible images to finish loading (naturalWidth > 0 or complete)
  if (waitForImages) {
    try {
      await page.evaluate(() => {
        const images = Array.from(document.querySelectorAll('img')).filter(
          (img) => !img.complete && img.loading !== 'lazy'
        );
        if (images.length === 0) return Promise.resolve();
        return Promise.all(
          images.map(
            (img) =>
              new Promise((resolve) => {
                img.addEventListener('load', resolve, { once: true });
                img.addEventListener('error', resolve, { once: true });
                // Timeout per image
                setTimeout(resolve, 1500);
              })
          )
        );
      }).catch(() => {});
    } catch {
      // Ignore context errors
    }
  }

  // 5. Handle pending animations and transitions
  if (waitForAnimations) {
    try {
      await page.evaluate(() => {
        if (!document.getAnimations) return Promise.resolve();
        const anims = document.getAnimations().filter(
          (a) => a.playState === 'running' && !(a.animationName && a.animationName.includes('infinite'))
        );
        return Promise.all(anims.map((a) => a.finished.catch(() => {})));
      }).catch(() => {});
    } catch {
      // Ignore context errors
    }
  }

  // 6. Ensure double requestAnimationFrame for visual stability
  try {
    await page.evaluate(() => {
      return new Promise((resolve) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(resolve);
        });
      });
    }).catch(() => {});
  } catch {
    // Ignore context errors
  }
}
