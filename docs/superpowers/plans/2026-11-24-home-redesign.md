# M1n Home Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the home page as a responsive, seasonal, project-led portfolio using the existing Next.js static-export stack and brand assets.

**Architecture:** Server-rendered page sections use two focused client components for season and project-preview state. CSS owns the marquee, reveals, media drift, and reduced-motion fallbacks; no runtime dependency is added.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, semantic CSS, next/image, Lucide.

**Spec:** `docs/superpowers/specs/2026-11-24-home-redesign-design.md`

## Global Constraints

- Preserve static export, existing routes, real project/link data, theme persistence, and seasonal assets.
- One sage accent, square corners on the redesigned surface, Outfit for UI, IBM Plex Mono only for literal code/metadata, Lucide icons.
- No fabricated project capabilities, command output, customers, statistics, or imagery.
- Content stays visible without JavaScript and with reduced motion.
- Do not commit or publish without a separate user request.

## Review Focus

- Narrow widths and text zoom: long project/contact names must wrap without horizontal page overflow; verify at 390px and with 200% text sizing.
- Hydration and static export: initial season must be deterministic between server HTML and client hydration; verify a production build and browser console.
- Keyboard parity: project previews must change on focus, and every season/theme/link control must expose a visible focus indicator and accessible name.
- Motion fallback: no hidden content when JavaScript, scroll timelines, or animation support is absent; verify reduced motion and JavaScript-disabled rendering.
- Shared-shell regressions: `/projects`, `/radio`, and `/guestbook` must still build and render after layout/navigation changes.

---

### Task 1: Establish the visual target and shared shell

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/components/nav.tsx`
- Modify: `app/components/ui/theme-toggle.tsx`
- Modify: `app/global.css`

**Interfaces:**
- Produces: full-width `site-shell`, plain responsive navigation, shared semantic tokens, and reduced-motion helpers.

- [ ] **Step 1:** Attempt a generated desktop target. The service returned `Invalid credential`; record the comparison as blocked and use the measured `.taste-skill/direction.json` values as the visual target instead.
- [ ] **Step 2:** Replace the floating card shell with a flat full-width frame; preserve the appearance bootstrap and add the `js` enhancement class.
- [ ] **Step 3:** Restyle navigation and theme toggle with semantic colors, square controls, 44px targets, `aria-current`, and visible outlines.
- [ ] **Step 4:** Run the development server and verify `/`, `/projects`, `/radio`, and `/guestbook` return HTTP 200.

### Task 2: Build the seasonal monumental hero

**Files:**
- Create: `app/components/home/seasonal-hero.tsx`
- Modify: `app/page.tsx`
- Modify: `app/global.css`

**Interfaces:**
- Consumes: `/meadow-winter.webp`, `/meadow-spring.webp`, `/meadow.webp`, `/meadow-autumn.webp`.
- Produces: `SeasonalHero` with an accessible `M1n` heading, four season buttons, real primary project link, and deterministic initial season.

- [ ] **Step 1:** Implement the four-image season switcher with `aria-pressed`, a polite state announcement, eager loading for the initial image, and a no-script control fallback.
- [ ] **Step 2:** Implement the duplicated CSS marquee layers, central square image, support copy, location, and filled project action.
- [ ] **Step 3:** Add responsive geometry, paused hover state, slow image drift, and reduced-motion static composition.
- [ ] **Step 4:** Exercise every season with pointer and keyboard and verify the initial SSR/client season matches.

### Task 3: Add project, about, contact, and footer compositions

**Files:**
- Create: `app/components/home/project-index.tsx`
- Modify: `app/page.tsx`
- Modify: `app/global.css`

**Interfaces:**
- Consumes: `featuredProjects`, `socialLinks`, and `externalLinks` from `app/constants/links.ts`.
- Produces: `ProjectIndex` with focus/pointer-controlled previews and semantic external project links.

- [ ] **Step 1:** Implement the large project-name index and real `data-ui` terminal-style previews using only existing project descriptions/tags.
- [ ] **Step 2:** Add mobile per-project previews and desktop sticky active preview; inactive rows retain accessible contrast.
- [ ] **Step 3:** Add avatar-led biography, all five real external destinations, inverse footer, and cropped wordmark.
- [ ] **Step 4:** Verify preview changes on pointer and keyboard focus, and verify every link’s `href`, target, and accessible name.

### Task 4: Finish, render, critique, and verify

**Files:**
- Modify as required: files from Tasks 1–3.
- Create: `.taste-skill/after/**`
- Create: `.taste-skill/visual-evidence.json`

**Interfaces:**
- Consumes: the measured direction, changed sources, and running local site; the generated-image target remains blocked by service credentials.
- Produces: measured browser evidence and independent critique results.

- [ ] **Step 1:** Run Prettier, design-taste lint, and `bun run build`; fix every introduced failure.
- [ ] **Step 2:** Run design-taste inspection at 1440, 768, and 390; capture light/dark, reduced-motion, and no-JavaScript states after fonts/images settle.
- [ ] **Step 3:** Exercise season buttons, project focus previews, theme persistence, primary/internal links, and keyboard focus order; check browser console and horizontal overflow.
- [ ] **Step 4:** Give a fresh reviewer the contract, measured direction, captures, reference context, and finish-count output. Fix one highest-impact finding, recapture, and stop after three rounds or “nothing material”.
- [ ] **Step 5:** Write the visual evidence receipt from actual files and hashes, run its integrity checker, and report tested states plus any remaining limitations.
