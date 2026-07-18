# Spec: startpage-theme

## ADDED Requirements

### Requirement: Startpage color tokens

The site SHALL define its theme tokens in `app/global.css` using the startpage palette, keeping the existing semantic token names (shadcn convention) and OKLCH/hex values that round-trip to the source hexes.

Dark theme (`.dark`) SHALL use: background `#0f0f0f`, surface `#161616`, surface-elevated `#1c1c1c`, text `#d6d6d6`, text-subtle `#8a8a8a`, text-muted `#5c5c5c`, focus `#1a1a1a`, border `#262626`, border-subtle `#1e1e1e`, accent `#c24a2e`, accent-hover `#d95f40`, accent-dim `#96402a`.

Light theme (`:root`) SHALL use: background `#f5f3ee`, surface `#faf8f4`, surface-elevated `#ffffff`, text `#191919`, text-subtle `#6b6b6b`, text-muted `#9a9a9a`, focus `#eceae4`, border `#ddd9d2`, border-subtle `#e7e4de`, accent `#a83c24`, accent-hover `#8a2f1b`, accent-dim `#bf4e33`.

The body background SHALL be a flat `--background` color with no gradient imagery.

#### Scenario: Dark theme matches startpage palette

- **WHEN** the page renders with the `.dark` class active
- **THEN** `background`, `card`, `popover`, `foreground`, `muted-foreground`, `border`, and `accent` resolve to the startpage dark hex values listed above (within OKLCH round-trip tolerance)

#### Scenario: Light theme matches startpage palette

- **WHEN** the page renders without the `.dark` class
- **THEN** the same tokens resolve to the startpage light hex values listed above

#### Scenario: Flat body background

- **WHEN** any page renders
- **THEN** the body background is the solid `--background` token with no radial-gradient or image layer

### Requirement: Startpage typography

The site SHALL load IBM Plex Mono (weights 400 and 500) and Outfit (weight 500) from locally bundled `@fontsource` packages, and SHALL NOT load Geist fonts. UI body text SHALL default to IBM Plex Mono at 13px with line-height 1.4. Display headings (`designSystem.typography.display`, `pageTitle`) SHALL use Outfit. Font weight "bold" in UI chrome SHALL be 500, not 600/700.

#### Scenario: Fonts loaded locally

- **WHEN** any page loads
- **THEN** IBM Plex Mono and Outfit are served from the site's own bundle via `@fontsource` imports and no `geist` font package is imported

#### Scenario: UI body size

- **WHEN** UI chrome (nav, link sections, tags, buttons) renders
- **THEN** body-size text uses IBM Plex Mono at a base font size of 13px

#### Scenario: Display headings use Outfit

- **WHEN** a page title or display heading renders
- **THEN** it uses the Outfit font family at weight 500

### Requirement: Sharp border-driven surfaces

The site SHALL use zero border radius: the `--radius` token SHALL be `0` and prominent hardcoded `rounded-*` classes in shared components SHALL be removed. Surfaces (lists, cards, tags, rows) SHALL be defined by hairline `border` colors and flat surface backgrounds rather than rounded corners and drop shadows. `:focus-visible` styling SHALL use an inset accent box-shadow (`inset 0 0 0 1px` accent) instead of the offset ring.

#### Scenario: No visible rounded corners

- **WHEN** nav, link rows, tags, buttons, and cards render
- **THEN** their computed `border-radius` is `0`

#### Scenario: Focus indicator

- **WHEN** an interactive element receives keyboard focus
- **THEN** the indicator is an inset 1px accent box-shadow, with no `ring-offset` outline

#### Scenario: Flat surfaces

- **WHEN** the shared list surface (`surface-list`) and tags render
- **THEN** they show a hairline border and flat background with no card drop shadow

### Requirement: Startpage motion values

Theme motion tokens SHALL be `--duration-fast: 80ms`, `--duration-normal: 140ms`, `--duration-slow: 220ms`, and `--ease-out: cubic-bezier(0.16, 1, 0.3, 1)`. Shared interaction classes in `app/lib/design-system.ts` SHALL use these values. Existing entrance keyframes and reduced-motion handling SHALL be preserved.

#### Scenario: Transition durations

- **WHEN** hover or entrance transitions run on shared components
- **THEN** their durations come from the 80/140/220ms token set and the startpage easing curve

#### Scenario: Reduced motion preserved

- **WHEN** the user has `prefers-reduced-motion: reduce`
- **THEN** animations and transitions are still suppressed as before

### Requirement: Accent usage consistency

The burnt-orange accent SHALL replace the previous green accent everywhere it appears: `::selection`, prose link underlines, `accent-underline`, hover states in `designSystem.interactions`, and any component using `text-accent`/`decoration-accent`/`ring` tokens. No residual green accent values SHALL remain in `app/global.css`.

#### Scenario: Selection color

- **WHEN** the user selects text
- **THEN** the selection background is the accent color with the background color as foreground

#### Scenario: No green accent remains

- **WHEN** `app/global.css` is inspected
- **THEN** no token references the previous green accent (`oklch(0.72 0.19 155)`)

### Requirement: System-preference dark mode preserved

Dark mode SHALL continue to follow `prefers-color-scheme` via the existing `.dark` class mechanism in `app/layout.tsx`; no toggle or class-strategy change is introduced.

#### Scenario: Dark scheme honored

- **WHEN** the OS is set to dark appearance
- **THEN** the layout applies the `.dark` class and the dark startpage tokens render, with no flash of the light theme tokens' values
