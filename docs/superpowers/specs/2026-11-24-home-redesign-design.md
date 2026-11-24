# M1n home redesign

## Intent

Upgrade the home page from a narrow profile card into a distinctive, useful portfolio while preserving the existing product truth, routes, theme preference, seasonal artwork, static export, and Next.js stack. The visitor should understand within five seconds that M1n is David, a developer in Galicia who makes small open-source tools, and should have an obvious route to the projects.

The user asked to start autonomously and not stop for design questions. The choices in this document are therefore implementation calls, not claims of separate user approval.

## Subject inventory

- The name `M1n`, short enough to become a full-width visual landmark.
- The domain `m1n.land` and the existing seasonal meadow artwork.
- Four existing meadow images: winter, spring, summer, and autumn.
- David, based in Galicia, Spain; he/him.
- Real open-source projects: Pastol, rusted-yadm, and RustedLessPass.
- Rust, Go, TypeScript, Neovim, and macOS.
- Games and philosophy.
- The existing black-cat avatar.
- GitHub, email, Goodreads, RSS, Startpage, and the on-site radio.

## Design contract

- **Audience:** developers, open-source users, and visitors following a link to M1n’s personal site.
- **Primary task:** understand who David is and open selected projects.
- **Direction:** name-as-monument, dealt by design-taste-frontend with seed `828263455`.
- **Idea:** on this page, the name `M1n` becomes a landmark in the changing Galician meadow.
- **Live element:** four accessible season buttons switch the existing landscape artwork; the initial season follows the current meteorological season in Spain.
- **Visual world:** Outfit display and body text; IBM Plex Mono only for literal code and project metadata; warm off-white/near-black olive surfaces with the existing sage accent; square corners; flat tone steps; no gradients, resting shadows, decorative rules, glass, emoji, or generic icon cards.
- **Icon set:** Lucide only, for theme and directional actions.
- **Motion:** one slow wordmark marquee, staggered section entrances, responsive control feedback, and a slow landscape drift. Everything has a reduced-motion state and remains readable without JavaScript.
- **Authority:** expand the existing brand and replace the home composition. Keep routes, metadata, theme behavior, real links, project data, and images.
- **Reference:** Yehor Kosinov’s portfolio on [Uizze](https://uizze.com/packs/eead3bd0-57b0-469d-b2a4-610164c20351). It was a closest match, not an exact developer-portfolio match. The visible lesson is to move from identity and a clear statement into prominent selected-work artifacts. Do not copy its hand-drawn mark, branding, imagery, or exact layout.

## Approaches considered

1. **Name as monument — selected.** Make `M1n` the architecture of the first screen, place the seasonal landscape inside that composition, then contrast the scale with calm project and biography sections. This uses assets only this site has.
2. **Type-only statement.** A large claim with no first-screen imagery. Rejected because it discards the site’s most distinctive existing asset at the moment it matters most.
3. **Contact sheet.** Many small project frames. Rejected because there are only three projects and no honest library of project photography; the result would require placeholders or fabricated product imagery.

## Page argument and copy deck

1. **Hero — identity and next action.** `M1n` at monumental scale. Supporting line: “David is a developer in Galicia making small, useful open-source tools.” Fact: “Rust / Go / TypeScript”. Location: “Galicia, Spain”. Primary button: “See my projects”.
2. **Selected work — show real output.** Three project names link to their real destinations. The active preview contains only the project’s actual command/name, description, and existing tags. No unsupported command output, usage claims, screenshots, metrics, or customer proof.
3. **About David — make the person legible.** “David, also known as M1n, writes code and enjoys games and philosophy. He builds small open-source tools with Rust, Go, and TypeScript, usually from Galicia. His work lives on the command line and the web, with an editor tuned to his habits and a preference for software that does a few things well.” A second paragraph connects the existing games, books, radio, and contact destinations.
4. **Elsewhere — complete the real destinations.** GitHub, `public@m1n.land`, Goodreads, RSS, and Startpage appear as large, readable link rows.
5. **Footer — a real close.** “Say hello.” with an email action, the existing social links, and the cropped `M1n` wordmark in inverse colors.

## Architecture

- `app/page.tsx`: server-rendered section composition and real content.
- `app/components/home/seasonal-hero.tsx`: client season state, four real images, accessible pressed states, and CSS marquee layers.
- `app/components/home/project-index.tsx`: client active-preview state driven by pointer and keyboard focus; real external links remain ordinary links.
- `app/components/nav.tsx`, `app/components/ui/theme-toggle.tsx`: plain responsive navigation and square theme control.
- `app/layout.tsx`: full-width site shell, no resting card shadow, JavaScript enhancement class, preserved theme/season bootstrap.
- `app/global.css`: semantic tokens, responsive home compositions, reduced-motion behavior, and cleaned shared styles.

## Required verification

- Production build and Prettier check.
- design-taste lint with no failures on changed files.
- Real Chromium renders at 1440, 768, and 390 pixels in light and dark themes; compare the first viewport with the measured `name-as-monument` direction. Image-target generation was attempted before implementation but blocked by an invalid service credential, so no generated-image comparison can be claimed.
- Season switching by pointer and keyboard; project preview changes by pointer and focus; all internal/external links and theme toggle retain their destinations/behavior.
- Reduced-motion render and JavaScript-disabled first viewport.
- Independent critique in a fresh context, one highest-impact fix per round, at most three rounds.
- Visual evidence receipt with actual source/capture hashes and explicit blocked checks.

## Non-goals

No backend, accounts, analytics changes, new project claims, fake screenshots, new runtime packages, publishing, or redesign of the radio player internals. Other routes inherit only the shared shell/navigation cleanup and must still build and render.
