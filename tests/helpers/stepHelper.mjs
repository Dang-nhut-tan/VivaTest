// tests/helpers/stepHelper.mjs
// Project-Wide Step Reporting and Screenshot Integration Helper
// Provides structured test.step execution with automatic UI stability checks and artifact attachment.

import { test } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { waitForUIStable } from './uiStabilityHelper.mjs';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Executes a structured test step, ensures UI stability, captures a screenshot,
 * and attaches it directly to the Playwright HTML test report.
 * 
 * @template T
 * @param {import('@playwright/test').TestInfo} testInfo
 * @param {import('@playwright/test').Page} page
 * @param {string} stepTitle Description of the step
 * @param {() => Promise<T>} actionFn The action or assertion function to run
 * @param {object} [options]
 * @param {boolean} [options.takeScreenshot=true] Whether to capture screenshot on step success
 * @param {boolean} [options.waitForStable=true] Whether to run waitForUIStable before capturing
 * @param {string} [options.savePath] Optional file system path to persist screenshot
 * @param {boolean} [options.fullPage=false] Full-page screenshots are slower; viewport is the fast default
 * @returns {Promise<T>}
 */
export async function stepWithScreenshot(testInfo, page, stepTitle, actionFn, options = {}) {
  const {
    takeScreenshot = true,
    waitForStable = true,
    savePath = null,
    fullPage = false
  } = options;

  return await test.step(stepTitle, async () => {
    try {
      // Execute the step's business logic / assertions
      const result = await actionFn();

      // Capture evidence after state is reached
      if (page && !page.isClosed() && takeScreenshot && testInfo) {
        if (waitForStable) {
          await waitForUIStable(page);
        }

        const buffer = await page.screenshot({ fullPage });

        // Attach to Playwright HTML Report
        await allure.attachment(`Ảnh sau bước - ${stepTitle}`, buffer, 'image/png');

        // Optionally persist to disk (e.g. for README or GitHub tickets)
        if (savePath) {
          try {
            const dir = path.dirname(savePath);
            if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
            fs.writeFileSync(savePath, buffer);
          } catch {
            // Ignore file write error if directory cannot be written
          }
        }
      }

      return result;
    } catch (err) {
      // Step failed: capture failure evidence without masking the original exception
      if (page && !page.isClosed() && testInfo) {
        try {
          const failBuffer = await page.screenshot({ fullPage });
          await allure.attachment(`Ảnh lỗi tại bước - ${stepTitle}`, failBuffer, 'image/png');
        } catch {
          // Best effort failure screenshot
        }
      }
      throw err;
    }
  });
}

/**
 * Direct helper to wait for UI stability, capture a screenshot, and attach it to testInfo.
 * 
 * @param {import('@playwright/test').TestInfo} testInfo
 * @param {import('@playwright/test').Page} page
 * @param {string} title
 * @param {object} [options]
 */
export async function captureStepEvidence(testInfo, page, title, options = {}) {
  const { savePath = null, fullPage = false, waitForStable = true } = options;
  if (!page || page.isClosed() || !testInfo) return;

  try {
    if (waitForStable) {
      await waitForUIStable(page);
    }
    const buffer = await page.screenshot({ fullPage });
    await allure.attachment(title, buffer, 'image/png');

    if (savePath) {
      const dir = path.dirname(savePath);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(savePath, buffer);
    }
    return buffer;
  } catch (err) {
    console.warn(`[captureStepEvidence] Không thể chụp ảnh "${title}":`, err.message);
  }
}
