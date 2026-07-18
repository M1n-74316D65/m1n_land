# Tasks: restyle-ui-like-startpage

## 1. Theme tokens

- [x] 1.1 Convert the startpage hex palette (dark `#0f0f0f` family + accent `#c24a2e`, light `#f5f3ee` family + accent `#a83c24`) to OKLCH and verify round-trip back to the source hexes
- [x] 1.2 Replace the token values in `app/global.css` `:root` and `.dark` with the startpage palette, mapping surface→`card`, surface-elevated→`popover`, text-subtle→`muted-foreground`, accent set incl. `--accent-foreground` and `--ring`; remove the old green accent `oklch(0.72 0.19 155)` everywhere
- [x] 1.3 Set `--radius: 0` and remove the radial accent-gradient from the `body` base layer
- [x] 1.4 Replace motion tokens: `--duration-fast: 80ms`, `--duration-normal: 140ms`, `--duration-slow: 220ms`, `--ease-out: cubic-bezier(0.16, 1, 0.3, 1)`
- [x] 1.5 Replace the `:focus-visible` ring-offset rule with inset accent box-shadow (`box-shadow: inset 0 0 0 1px var(--accent)`)
- [x] 1.6 Flatten `.surface-list` (no radius, no card shadow, hairline border + flat surface background) and update `::selection` to the new accent

## 2. Fonts

- [x] 2.1 Add `@fontsource/ibm-plex-mono` (400/500) and `@fontsource/outfit` (500) to `package.json`, remove the `geist` dependency
- [x] 2.2 Import the fontsource CSS in `app/global.css`; remove the Geist `@font-face` stubs; remap `@theme inline` `--font-sans` → Outfit stack and `--font-mono` → IBM Plex Mono stack
- [x] 2.3 Update `app/layout.tsx`: drop `geist/font` imports and variables, set base font to mono at 13px with line-height 1.4

## 3. Design system and shared components

- [x] 3.1 Update `app/lib/design-system.ts`: hardcoded `duration-200`/`duration-100` → token-aligned values, remove `rounded-*` from `radius`/`surfaces`, restyle `surfaces.tag` to the flat hairline-border mono look, switch display/pageTitle typography to Outfit (`font-sans`) at weight 500
- [x] 3.2 Restyle `app/components/nav.tsx` and `app/components/link-section.tsx` to the startpage command-row idiom (mono text, subtle-to-accent hover color, focus-surface hover background, hairline separators)
- [x] 3.3 Grep `app/components/` for hardcoded `rounded-*` and stale green/duration classes; neutralize the visually prominent ones (button, card, input, textarea, tooltip, footer)
- [x] 3.4 Verify prose/MDX styles in `app/global.css` still read well at the new base size; adjust `.prose` sizes only if needed

## 4. Verification and docs

- [x] 4.1 Run `bun run build` and fix any failures
- [x] 4.2 Run `bun run format` (Prettier is source of truth)
- [x] 4.3 Visual pass of `/`, `/projects`, `/guestbook`, `/radio` in both dark and light schemes: palette matches startpage hexes, no rounded corners, no green accent, focus inset-shadow works, reduced-motion still honored
- [x] 4.4 Update `AGENTS.md`: correct the stale `app/globals.css` reference and note the new fonts/accent conventions
