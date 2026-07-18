# Proposal: restyle-ui-like-startpage

## Why

The portfolio and the personal startpage (`../start.m1n.land`) are the two main public faces of the same identity, yet they look unrelated. The startpage has a distinctive, deliberate aesthetic — compact 13px IBM Plex Mono body text, Outfit display headings, a near-black `#0f0f0f` dark / warm `#f5f3ee` light palette with a burnt-orange accent (`#c24a2e`), hairline borders, sharp (non-rounded) surfaces, and subtle 80–220ms ease-out transitions. Bringing the portfolio in line with it creates one coherent visual identity and replaces the current default-looking Geist/shadcn theme.

## What Changes

- Replace the theme tokens with the startpage palette: dark `#0f0f0f` background, `#161616`/`#1c1c1c` surfaces, `#262626` borders, `#c24a2e` accent; light `#f5f3ee` background with `#a83c24` accent, expressed in the existing OKLCH token system.
- Switch fonts from Geist Sans/Mono to IBM Plex Mono (body/UI) and Outfit (display headings), loaded locally via `@fontsource` packages.
- Set base UI font size to 13px with the startpage's size scale (`xs` 0.72rem, `sm` 0.8rem, `md` 0.9rem) and weight conventions (bold = 500).
- Adopt the startpage's sharp, border-driven surface language: no border radius, hairline borders, `--color-focus` hover backgrounds, inset accent `box-shadow` focus rings.
- Align motion: 80/140/220ms durations with `cubic-bezier(0.16, 1, 0.3, 1)` easing, applied to existing entrance/hover animations.
- Restyle shared components (nav, link sections, tags, buttons, cards, footer) to match, keeping existing structure and content.
- Keep the `media`-based (system preference) dark mode strategy and existing routes/content unchanged.

## Capabilities

### New Capabilities

- `startpage-theme`: The site-wide visual theme — color tokens (dark/light via media query), typography (fonts, scale, weights), spacing, surfaces, borders, and motion values that make the portfolio match the start.m1n.land aesthetic.

### Modified Capabilities

<!-- No existing specs in openspec/specs/. -->

## Impact

- **Code**: `app/global.css` (tokens), `app/layout.tsx` (font loading), `app/lib/design-system.ts`, `app/components/nav.tsx`, `app/components/link-section.tsx`, `app/components/ui/*` (button, card, tag-like surfaces), `app/constants/`, route pages under `app/`.
- **Dependencies**: add `@fontsource/ibm-plex-mono` and `@fontsource/outfit`; remove `geist` font usage.
- **Docs**: `AGENTS.md` references a non-existent `app/globals.css` — the theme-token description should be corrected to match reality as part of this change.
- **No breaking changes** to routes, content, analytics, or SEO metadata.
