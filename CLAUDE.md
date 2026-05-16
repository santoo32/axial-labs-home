# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

The production marketing site for `axiallabs.com` — a Next.js 15 App Router site, dark-only, bilingual (en/es). The design system lives in `./brand/` (git submodule). The web implementation sources all tokens, logos, copy rules, and component specs from there.

## Design system reference

**Before writing any component, CSS, or copy**, read:

- `./brand/prompts/system-prompt.md` — canonical AI brief; enforces palette, type, geometry, and QA checklist
- `./brand/branding/06-brand-guidelines.md` — full brand reference (colors, typography, visual language, voice)
- `./brand/branding/03-voice-tone.md` — copy rules, forbidden vocabulary, approved patterns
- `./brand/brand/web/PLAN.md` — full implementation plan: stack, file structure, section specs, i18n strategy

HTML components to port are in `./brand/html/components/`. Logos are in `./brand/logos/`. Mockups are in `./brand/mockups/`.

## Dev commands

```bash
npm run dev          # start dev server
npm run build        # production build
npm run lint         # Biome lint + format check
npm run format       # Biome auto-format
npm test             # Vitest unit tests
npm run test:e2e     # Playwright e2e (both locales)
npm run check-i18n   # verify en.json / es.json key parity
```

Rebuild tokens manually:
```bash
cd brand/tokens && npx style-dictionary build
```

## Stack

- **Next.js 15** App Router + **React 19** (RSC by default)
- **TypeScript 5.5** strict
- **CSS Modules** + `tokens.css` as global — no Tailwind, no UI library
- **next-intl v3** — sub-path routing (`/en`, `/es`), server-component-friendly, type-safe keys
- **next/font/local** — Inter, Inter Display, JetBrains Mono; latin + latin-ext subsets
- **motion** (Framer Motion successor) — lazy-imported, gated by `prefers-reduced-motion`
- **Biome** — lint and format (single tool)
- **Vitest** + **Testing Library** for units; **Playwright** for e2e
- **Resend** + **@upstash/ratelimit** for the contact form server route
- **Vercel** deploy

## Token usage

`src/app/globals.css` imports `./brand/tokens/build/tokens.css` (via postcss alias `@tokens`). Every color, spacing, type size, and easing value must come from a CSS custom property:

```css
color: var(--axial-bone);       /* correct */
color: #F4F2EC;                 /* wrong — CI grep gate will fail the build */
```

CI enforces: zero raw `#` hex values in `src/`.

## Dark-only rules

This site has no light mode. Do not introduce:
- `data-theme` attribute
- `prefers-color-scheme: light` media queries
- Imports of `brand/tokens/semantic/light.json`
- Any toggle, theme switcher, or light-surface class

`<html>` always renders the dark token surface.

## i18n rules

- All user-visible strings live in `messages/en.json` and `messages/es.json` — never hardcoded in components.
- English is authored first; Spanish is hand-written, never machine-translated.
- Use the typed `Link`, `useRouter`, `redirect` from `@/i18n/navigation` — never raw `next/link` for internal anchor URLs.
- Mono-cased brand strings (`§01`, `axial labs / engineered identity studio`) are static constants, not translations.
- `scripts/check-translations.ts` must pass before merging — it fails on missing or orphan keys.

## Component conventions

- One folder per component or section: `ComponentName/ComponentName.tsx` + `ComponentName.module.css`.
- CSS class names: kebab-case.
- All values in `.module.css` files reference tokens — no literals.
- Sections live in `src/sections/`; shared primitives in `src/components/`.
- Every section is wrapped in `<SectionFrame>` which renders the `§NN` Mono index and anchor id.

## Brand constraints (short form)

These apply to every component, SVG, and line of copy:

- Every composition needs one axial element: a visible 1px axis line, tick marks, a crosshair, or a Mono index (`01 / 04`, `→ NOTE`, `// SECTION`).
- No corner radius on cards — 4px radius only on inputs and chips.
- Borders over shadows. No drop shadows on flat UI in dark mode.
- Voltage (`--axial-voltage`) covers ≤ 5% of any composition.
- Max 2 type families per composition.
- No bouncy or elastic motion. Easing: `var(--ease-axial)` (`cubic-bezier(0.32, 0.72, 0, 1)`).
- Headlines in sentence case, never Title Case.
- No exclamation marks in headlines.
- SVG icons: `stroke-width: 1.5`, `stroke-linecap: square`, `viewBox` set, `currentColor`.

## Definition of done (v1)

See `./brand/web/PLAN.md §14` for the full checklist. Key gates:
- Zero hex literals in `src/` (CI grep)
- Zero light-mode code paths (CI grep)
- Translation parity (`check-i18n` passes in CI)
- Lighthouse ≥ 95 all four scores, both locales
- Axe: zero serious/critical violations on both locales
- Playwright smoke + a11y + form specs pass on both locales
