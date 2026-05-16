import { test, expect } from "@playwright/test";

const locales = ["en", "es"] as const;

for (const locale of locales) {
  test.describe(`/${locale}`, () => {
    test("renders without errors", async ({ page }) => {
      await page.goto(`/${locale}`);
      await expect(page).not.toHaveTitle(/error/i);
    });

    test("navbar is visible", async ({ page }) => {
      await page.goto(`/${locale}`);
      await expect(page.getByRole("banner")).toBeVisible();
    });

    test("locale switcher shows correct active locale", async ({ page }) => {
      await page.goto(`/${locale}`);
      const switcher = page.getByLabel("Language switcher");
      await expect(switcher).toBeVisible();
      await expect(switcher.getByText(locale.toUpperCase())).toBeVisible();
    });

    test("visual baseline", async ({ page }) => {
      await page.goto(`/${locale}`);
      await page.waitForLoadState("networkidle");
      await expect(page).toHaveScreenshot(`${locale}-home.png`, {
        fullPage: true,
        maxDiffPixelRatio: 0.02,
      });
    });
  });
}

test("root / redirects to a locale", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/(en|es)/);
});
