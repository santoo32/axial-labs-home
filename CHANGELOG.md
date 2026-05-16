# Changelog

All notable changes to the Axial Labs web project are documented in this file.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [1.0.0] — 2026-05-16

First production-ready release. Four-section marketing site at `/en` and `/es`.

### Added

**Sections**
- `Hero §00` — full-viewport section with SVG schematic-grid background, voltage tick-frame around H1, CSS axis-line draw animation, coordinate badge. Bilingual.
- `Services §01` — two clusters (Brand B.01–03, Software I.01–03) in shared-border card grids with voltage hover highlight. Bilingual.
- `About §02` — two-column layout: Source Serif 4 editorial pull-quote + five numbered Mono differentiation pillars. Bilingual.
- `Contact §03` — split layout with sticky CTA left, contact form right. Progressive-enhancement form with Zod client validation, honeypot, `aria-live` status feedback. Bilingual.

**Infrastructure**
- Next.js 15 App Router + React 19, TypeScript strict, CSS Modules, no Tailwind.
- `next-intl` v3 sub-path routing (`/en`, `/es`). Default locale: `/es`.
- `POST /[locale]/api/contact` — Zod validation, Resend email delivery, optional Upstash Redis rate-limiting (5 req / 60 s / IP), Origin check, dev-mode console fallback.
- Biome linting + formatting.
- Vitest unit test runner.
- Playwright e2e suite with `@axe-core/playwright` — smoke, a11y, form, and visual-baseline tests for both locales on desktop and mobile.

**SEO & Metadata**
- Per-locale `generateMetadata` — title template, description (from hero.sub), openGraph, Twitter card.
- `alternates.languages` hreflang (en, es, x-default → /es).
- JSON-LD `Organization` schema in `<head>` on every route.
- Dynamic OG images at `/[locale]/opengraph-image` (edge runtime, 1200×630).
- `sitemap.xml` — both locale URLs with cross-language alternates.
- `robots.txt`.
- Localized 404 page.

**Design system**
- Brand tokens imported via `postcss-import` from `brand/tokens/build/tokens.css` — zero raw hex values in `src/`.
- 9 shared primitive components: `<NavBar>`, `<LocaleSwitcher>`, `<Button>`, `<EyebrowTag>`, `<AxisDivider>`, `<MonoLabel>`, `<Crosshair>`, `<Logo>`, `<SectionFrame>`.
- Dark-only: no `data-theme`, no `prefers-color-scheme: light`, no light token layer.

**Accessibility**
- Skip-to-main-content link (keyboard visible on first Tab).
- Semantic landmarks: `<header>`, `<main id="main-content">`, 4 `<section aria-labelledby>`, `<footer>`.
- `:focus-visible` ring — 2px Voltage, 2px offset.
- `prefers-reduced-motion` gate on all CSS animations.
- All form fields have `<label>` + `aria-describedby` on errors + `aria-live="polite"` on status.

**Content tooling**
- `npm run check-i18n` — key parity check across 68 translation keys.
- `npm run check-voice` — forbidden-word (EN + ES), em-dash, and heading-exclamation checker.

### Notes for ops

- Set `RESEND_API_KEY`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` in Vercel environment variables before promoting to production. See `.env.local.example`.
- The `from` address (`contact@axiallabs.com`) must be a verified Resend domain.
- Run `cd brand/tokens && npx style-dictionary build` before `next build` if tokens have changed.
- Lighthouse ≥ 95 target: run `npx lighthouse https://axiallabs.com/en --output html` after production deploy.
