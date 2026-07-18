# Design: restyle-ui-like-startpage

## Context

The portfolio (`m1n.land`) uses a shadcn-style theme in `app/global.css` (OKLCH tokens, Geist fonts via `geist/font`, `--radius: 0.5rem`, green accent, a radial accent-gradient body background) plus a `designSystem` object in `app/lib/design-system.ts` holding shared Tailwind class strings. The startpage (`../start.m1n.land`) defines its aesthetic in `src/styles/variables.css` and `src/styles/layout.css`: near-black `#0f0f0f` dark theme (primary identity) and warm off-white `#f5f3ee` light theme, IBM Plex Mono body at 13px, Outfit display headings, burnt-orange accent (`#c24a2e` dark / `#a83c24` light), hairline `#262626` borders, zero border radius, and 80/140/220ms transitions on `cubic-bezier(0.16, 1, 0.3, 1)`.

Constraints: Tailwind v4 (`@theme inline` mapping in `app/global.css`), dark mode toggled by a `.dark` class set from `prefers-color-scheme` (see `app/layout.tsx` theme script), existing routes/content/components must keep working, no test runner.

## Goals / Non-Goals

**Goals:**

- The portfolio reads as the same product family as the startpage: same palette, fonts, scale, borders, and motion.
- Tokens stay semantic (shadcn names) so existing `bg-background` / `text-muted-foreground` / `text-accent` classes keep working — most of the restyle lands in `app/global.css` and `design-system.ts`.
- Dark theme matches startpage dark exactly; light theme matches startpage light exactly.

**Non-Goals:**

- No layout or IA redesign: routes, page structure, nav items, and content stay.
- No new features (no command palette, no tabs/workspaces, no HN feed).
- No component library swap — existing shadcn/ui components stay, restyled.
- Syntax-highlighting (`--sh-*`) palette stays as-is.

## Decisions

1. **Retokenize, don't re-theme with new names.** Replace OKLCH values in `app/global.css` with OKLCH conversions of the startpage hexes (e.g. `#0f0f0f` → `oklch(0.18 0 0)`, `#c24a2e` → `oklch(0.52 0.15 40)` — exact values computed at implementation time, verified against hex round-trip). Keep token names (`--background`, `--card`, `--muted`, `--accent`, `--ring`, ...) so all semantic utilities keep working. Map startpage roles: `surface`→`card`, `surface-elevated`→`popover`, `text-subtle`→`muted-foreground`, `text-muted`→new usage via `muted-foreground` dimmer or `border`-adjacent utilities as needed, `focus`→ hover surfaces, `border-subtle`→`border` (hairline), accent set from `#c24a2e`/`#a83c24` with `--accent-foreground` = background for contrast. Alternative considered: renaming tokens to startpage names — rejected, it would force edits in every component for zero gain.

2. **Fonts via `@fontsource` packages.** Add `@fontsource/ibm-plex-mono` (400/500) and `@fontsource/outfit` (500), import in `app/global.css`, drop `geist` from `app/layout.tsx`. Remap `@theme inline`: `--font-sans` → Outfit stack, `--font-mono` → IBM Plex Mono stack. Body/UI default becomes mono at 13px (startpage `--font-size`), display headings use Outfit via `designSystem.typography.display`/`pageTitle`. Alternative: `next/font/google` — rejected, adds network fetch at build and the startpage already self-hosts via fontsource.

3. **Zero radius via token + targeted cleanup.** Set `--radius: 0`; audit components for hardcoded `rounded-*` classes (`design-system.ts`, `app/components/ui/*`, `link-section.tsx`, `nav.tsx`) and remove/neutralize them. Hairline borders (`border-border`) replace rounded cards as the surface language; `surface-list` loses its radius and card shadow in favor of the startpage's flat surface + border.

4. **Motion values replaced in place.** `--duration-fast/normal/slow` → 80/140/220ms; `--ease-out` → `cubic-bezier(0.16, 1, 0.3, 1)`. Existing `animate-enter`/`animate-reveal` keyframes and `designSystem.interactions` keep their structure but inherit the new values; hardcoded `duration-200`/`duration-100` strings in `design-system.ts` are updated to reference the tokens' spirit (fast/normal).

5. **Flat background.** Remove the radial accent-gradient on `body`; solid `--background` like the startpage.

6. **Focus style: inset accent box-shadow.** Replace the `ring-2 ring-offset-2` `:focus-visible` rule with `box-shadow: inset 0 0 0 1px var(--accent)` on a focus surface — the startpage's signature focus look.

7. **Component restyle (same structure).** Nav items, link-section rows, and tags adopt the startpage "command row" idiom: mono text, subtle key/hint color that turns accent on hover, `--color-focus`-equivalent hover background, hairline separators (`border-border-subtle` → `border` token at reduced opacity or a `--border-subtle` token). The green accent is gone everywhere, including `::selection`, prose link underlines, and `accent-underline`.

## Risks / Trade-offs

- [OKLCH conversions drift from the exact hexes] → Compute conversions with a color tool and assert the rendered hex round-trips; where Tailwind/oklch math is awkward, plain hex in the token is acceptable (Tailwind v4 handles any color format).
- [13px mono body makes long-form prose harder to read] → Keep prose (MDX/guestbook) slightly larger/relaxed via the existing `.prose` rules; only UI chrome is locked to 13px.
- [Hardcoded `rounded-*`/`duration-*` classes linger in `ui/` and magicui components] → Grep for them as a task step; neutralize only what is visually prominent, leave decorative animation components alone.
- [Light mode is secondary on the startpage and may have contrast surprises on the portfolio's denser content] → Use the startpage light hexes verbatim; check text/background pairs against WCAG AA for body text.
- [Font metric swap (Geist → Plex Mono) shifts layouts] → Layout is max-width/flex based, so impact is wrapping only; verify key pages visually in dev.

## Migration Plan

Single-pass restyle, no staged rollout: tokens first (`app/global.css`), then fonts (`package.json`, `app/layout.tsx`), then `design-system.ts`, then component cleanup. Rollback = `git revert` of the change; no data or API surface is affected. Verify with `bun run build` and `bun run format`, plus a visual pass of `/`, `/projects`, `/guestbook`, `/radio` in both color schemes.

## Open Questions

- Keep the accent-tinted `::selection` (background accent, text background)? Startpage doesn't customize selection — default to keeping the pattern with the new accent, it's consistent.
- Serif-ish warmth of light mode (`#f5f3ee`) vs. pure white components: use startpage light tokens verbatim, no portfolio-specific tweaks unless contrast fails.
