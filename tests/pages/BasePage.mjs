// tests/pages/BasePage.mjs
// Lớp cơ sở (BasePage) cho tất cả các Page Object trong mô hình POM (Page Object Model)
// Tích hợp Smart UI Stability (waitForUIStable) và Step Screenshot Reporting tự động.
// Tuyệt đối không dùng sleep / waitForTimeout — chỉ dùng Web-First Assertions & Auto-Waiting.

import { test } from '@playwright/test';
import { waitForUIStable } from '../helpers/uiStabilityHelper.mjs';
import { stepWithScreenshot, captureStepEvidence } from '../helpers/stepHelper.mjs';

const AUTO_STEP_EXCLUSIONS = new Set([
  'step',
  'captureStepScreenshot',
  'takeScreenshot',
  'waitForUIStable',
  'waitForNetworkIdle',
]);

export class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Every public async Page Object method becomes a business step with its
    // own screenshot. This gives all specs consistent Allure evidence without
    // requiring every call site to be manually wrapped in test.step().
    if (process.env.AUTO_STEP_SCREENSHOTS !== '0') {
      const wrappedMethods = new Map();

      return new Proxy(this, {
        get(target, property, receiver) {
          const value = Reflect.get(target, property, receiver);
          if (
            typeof property !== 'string' ||
            typeof value !== 'function' ||
            value.constructor?.name !== 'AsyncFunction' ||
            property.startsWith('_') ||
            AUTO_STEP_EXCLUSIONS.has(property)
          ) {
            return value;
          }

          if (!wrappedMethods.has(property)) {
            wrappedMethods.set(property, async (...args) => {
              let testInfo;
              try {
                testInfo = test.info();
              } catch {
                // Page Objects can also be used outside the Playwright runner.
                return await value.apply(receiver, args);
              }

              const stepTitle = `${target.constructor.name}.${property}`;
              return await stepWithScreenshot(
                testInfo,
                target.page,
                stepTitle,
                () => value.apply(receiver, args),
                { fullPage: false }
              );
            });
          }

          return wrappedMethods.get(property);
        },
      });
    }
  }

  /**
   * Chờ mạng ổn định (Legacy fallback)
   * @param {number} timeout
   */
  async waitForNetworkIdle(timeout = 5000) {
    await this.page.waitForLoadState('networkidle', { timeout }).catch(() => {});
  }

  /**
   * Chờ giao diện ổn định (Smart UI Stability): loaders, skeletons, fonts, images và transitions
   * @param {object} [options]
   */
  async waitForUIStable(options = {}) {
    await waitForUIStable(this.page, options);
  }

  /**
   * Chụp ảnh màn hình lưu bằng chứng (Legacy filepath)
   * @param {string} filepath
   */
  async takeScreenshot(filepath) {
    await this.waitForUIStable({ timeout: 3000 });
    await this.page.screenshot({ path: filepath, fullPage: true });
  }

  /**
   * Chụp ảnh bước kiểm thử và đính kèm trực tiếp vào Playwright Test Report (HTML Report)
   * @param {import('@playwright/test').TestInfo} testInfo
   * @param {string} title Tên bước hiển thị trên báo cáo
   * @param {object} [options]
   */
  async captureStepScreenshot(testInfo, title, options = {}) {
    return await captureStepEvidence(testInfo, this.page, title, options);
  }

  /**
   * Thực thi một bước kiểm thử có cấu trúc kèm kiểm tra ổn định UI và chụp ảnh minh chứng
   * @template T
   * @param {import('@playwright/test').TestInfo} testInfo
   * @param {string} stepTitle
   * @param {() => Promise<T>} actionFn
   * @param {object} [options]
   * @returns {Promise<T>}
   */
  async step(testInfo, stepTitle, actionFn, options = {}) {
    return await stepWithScreenshot(testInfo, this.page, stepTitle, actionFn, options);
  }
}
