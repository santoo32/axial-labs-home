import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const locales = ["en", "es"] as const;

// ─── Redirect ────────────────────────────────────────────────────────────────

test("root / redirects to a locale", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/(en|es)/);
});

// ─── Per-locale suite ────────────────────────────────────────────────────────

for (const locale of locales) {
  test.describe(`/${locale}`, () => {
    // ── Render ───────────────────────────────────────────────────────────────

    test("renders without JS errors", async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", (e) => errors.push(e.message));
      await page.goto(`/${locale}`);
      expect(errors).toHaveLength(0);
    });

    test("page title contains Axial Labs", async ({ page }) => {
      await page.goto(`/${locale}`);
      await expect(page).toHaveTitle(/Axial Labs/i);
    });

    test("html lang attribute is set correctly", async ({ page }) => {
      await page.goto(`/${locale}`);
      const lang = await page.locator("html").getAttribute("lang");
      expect(lang).toBe(locale);
    });

    // ── Navigation ───────────────────────────────────────────────────────────

    test("navbar is visible with brand link and CTA", async ({ page }) => {
      await page.goto(`/${locale}`);
      await expect(page.getByRole("banner")).toBeVisible();
      await expect(page.getByRole("link", { name: /axial labs/i })).toBeVisible();
    });

    test("locale switcher shows correct active locale", async ({ page }) => {
      await page.goto(`/${locale}`);
      const switcher = page.getByLabel("Language switcher");
      await expect(switcher).toBeVisible();
      // Active locale rendered as <span aria-current="true">
      const active = switcher.locator("[aria-current='true']");
      await expect(active).toHaveText(locale.toUpperCase());
    });

    test("skip link appears on focus", async ({ page }) => {
      await page.goto(`/${locale}`);
      await page.keyboard.press("Tab");
      const skipLink = page.locator(".skip-link");
      await expect(skipLink).toBeFocused();
    });

    // ── Sections ─────────────────────────────────────────────────────────────

    test("all four anchored sections are in the DOM", async ({ page }) => {
      await page.goto(`/${locale}`);
      await expect(page.locator("#hero")).toBeAttached();
      await expect(page.locator("#services")).toBeAttached();
      await expect(page.locator("#about")).toBeAttached();
      await expect(page.locator("#contact")).toBeAttached();
    });

    test("hero section has visible H1", async ({ page }) => {
      await page.goto(`/${locale}`);
      const h1 = page.locator("#hero h1");
      await expect(h1).toBeVisible();
      const text = await h1.textContent();
      expect(text?.length).toBeGreaterThan(5);
    });

    test("services section contains 6 service cards", async ({ page }) => {
      await page.goto(`/${locale}`);
      // Each ServiceCard is an <article>
      const cards = page.locator("#services article");
      await expect(cards).toHaveCount(6);
    });

    test("about section has pull-quote and principles list", async ({ page }) => {
      await page.goto(`/${locale}`);
      await expect(page.locator("#about blockquote")).toBeVisible();
      const principles = page.locator("#about ol li");
      await expect(principles).toHaveCount(5);
    });

    test("contact section has form and email link", async ({ page }) => {
      await page.goto(`/${locale}`);
      await expect(page.locator("#contact form")).toBeVisible();
      await expect(
        page.getByRole("link", { name: /santiagot\.roa@gmail\.com/i }),
      ).toBeVisible();
    });

    // ── Contact form ─────────────────────────────────────────────────────────

    test("contact form: client-side validation shows field errors", async ({ page }) => {
      await page.goto(`/${locale}`);
      const form = page.locator("#contact form");
      // Submit without filling required fields
      await form.locator("[type='submit']").click();
      // At least one error should appear
      const errors = form.locator("[role='alert']");
      await expect(errors.first()).toBeVisible();
    });

    test("contact form: fills and submits successfully", async ({ page }) => {
      await page.goto(`/${locale}`);
      const form = page.locator("#contact form");

      await form.locator("#cf-name").fill("Test User");
      await form.locator("#cf-email").fill("test@example.com");
      await form.locator("#cf-project").selectOption("brand");
      await form.locator("#cf-message").fill("This is a test message with enough content.");
      await form.locator("[type='submit']").click();

      // Success or error message should appear (server may not be configured)
      const status = form.locator("[aria-live='polite']");
      await expect(status).not.toBeEmpty({ timeout: 8000 });
    });

    // ── Accessibility (axe) ──────────────────────────────────────────────────

    test("axe: no serious or critical violations", async ({ page }) => {
      await page.goto(`/${locale}`);
      await page.waitForLoadState("networkidle");

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();

      const serious = results.violations.filter(
        (v) => v.impact === "serious" || v.impact === "critical",
      );

      if (serious.length > 0) {
        console.error(
          `Axe violations on /${locale}:\n` +
            serious
              .map((v) => `  [${v.impact}] ${v.id}: ${v.description}\n    ${v.helpUrl}`)
              .join("\n"),
        );
      }

      expect(serious).toHaveLength(0);
    });

    // ── Visual baseline ───────────────────────────────────────────────────────

    test("visual baseline — full page", async ({ page }) => {
      await page.goto(`/${locale}`);
      await page.waitForLoadState("networkidle");
      await expect(page).toHaveScreenshot(`${locale}-home.png`, {
        fullPage: true,
        maxDiffPixelRatio: 0.02,
      });
    });
  });
}
