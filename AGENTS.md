# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## Project Overview

Personal portfolio website built with Next.js 16, React 19, Tailwind CSS v4, and MDX. Uses the App Router architecture with TypeScript strict mode.

## Commands

- **Install**: `bun install` (preferred) or `npm install`
- **Dev server**: `bun run dev`
- **Build**: `bun run build`
- **Production**: `bun run start`
- **Format**: `bun run format` (Prettier is source of truth)
- **Format check**: `bun run format:check`
- **Lint**: No dedicated lint script - uses ESLint via Next.js build
- **Tests**: No test runner configured - avoid adding tests unless requested

## Critical Architecture Notes

- **Single CSS entry**: `app/global.css` - imported by layout; holds theme tokens (start.m1n.land palette, hex values), Tailwind v4 `@theme inline` mapping, prose styles, and syntax highlighting. There is no `globals.css`.
- **Theme**: Mirrors `start.m1n.land` - dark `#0f0f0f` / light `#f5f3ee`, burnt-orange accent (`#c24a2e` dark, `#a83c24` light), zero border radius, hairline borders, motion 80/140/220ms on `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Fonts**: IBM Plex Mono (UI body, 13px base) and Outfit (display headings) via `@fontsource` imports in `app/layout.tsx`. No Geist.
- **Dark mode**: `.dark` class toggled from `prefers-color-scheme` by the inline script in `app/layout.tsx` (custom variant in `app/global.css`).
- **Analytics**: Custom Umami integration at `analytics.m1n.land`
- **Path alias**: Use `app/` prefix for imports (e.g., `import { cn } from 'app/lib/utils'`)

## Code Style Guidelines

### Imports

- Use `app/` path alias for internal imports: `import { cn } from 'app/lib/utils'`
- Group imports: React/Next first, then external packages, then internal modules
- Use named exports for utilities, default exports for page components

### Formatting (Prettier)

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "endOfLine": "lf"
}
```

### TypeScript

- Strict mode enabled with `noImplicitAny` and `strictNullChecks`
- Define interfaces for component props: `interface ComponentProps { ... }`
- Use `React.FC` or inline types for components
- Prefer `interface` over `type` for object shapes
- Export types alongside components when needed

### Naming Conventions

- **Components**: PascalCase files matching component name (`Button.tsx`, `nav.tsx`)
- **Utilities**: camelCase (`utils.ts`, `design-system.ts`)
- **Constants**: camelCase for objects (`navItems`, `footerLinks`)
- **CSS classes**: Use Tailwind utilities, semantic tokens, or design system

### Component Patterns

- Use `'use client'` directive for client components
- Wrap interactive components with `React.memo()` for performance
- Use `data-slot` attribute for component identification
- Prefer function declarations over arrow functions for components

```tsx
const Component: React.FC<Props> = ({ prop }) => {
  return <div>{prop}</div>
}
```

### Styling

- Use `cn()` utility from `app/lib/utils.ts` for class merging
- Use `designSystem` object from `app/lib/design-system.ts` for consistent spacing/colors
- Semantic tokens: `bg-background`, `text-foreground`, `text-muted-foreground`
- shadcn/ui configured with New York style and Lucide icons

### Error Handling

- Error boundary at `app/error.tsx` with reset functionality
- Include error details in collapsible section for debugging
- Provide user-friendly messages with retry action

### Animation

- Use Framer Motion / Motion library for animations
- Calculate timing values rather than hardcoding for cohesive sequences
- Reference `app/page.tsx` for animation coordination patterns

## Custom Utilities

| Utility        | Location                     | Purpose                                |
| -------------- | ---------------------------- | -------------------------------------- |
| `cn()`         | `app/lib/utils.ts:4`         | Class merging with tailwind-merge      |
| `designSystem` | `app/lib/design-system.ts:1` | Consistent spacing/colors/interactions |
| `CustomMDX`    | `app/components/mdx.tsx:105` | MDX rendering with custom components   |

## shadcn/ui Components

Located in `app/components/ui/`:

- `button.tsx` - Button with variants (default, outline, ghost, link)
- `card.tsx` - Card container
- `tooltip.tsx` - Tooltip component
- `input.tsx`, `textarea.tsx` - Form inputs
- `navigation-menu.tsx` - Navigation component
- `magicui/` - Animation components (blur-fade, morphing-text, particles, etc.)

## File Structure

```
app/
├── components/
│   ├── ui/           # shadcn/ui and magicui components
│   ├── footer/       # Footer components
│   └── *.tsx         # Shared components
├── constants/        # Static data (navItems, socials, footerLinks)
├── lib/              # Utilities (utils.ts, design-system.ts)
├── global.css        # Theme tokens, Tailwind theme mapping, prose styles, syntax highlighting
└── */                # Route segments
```

## Common Tasks

### Adding a new page

1. Create directory in `app/` with `page.tsx`
2. Add route to `app/constants/navItems.ts` if navigable
3. Use `designSystem` for consistent spacing

### Adding a new component

1. Create in `app/components/` or `app/components/ui/`
2. Use `cn()` for class merging
3. Export from component file
4. Use `'use client'` if interactive

### Adding a new UI variant

1. Update component variants using `cva()` from class-variance-authority
2. Follow existing pattern in `button.tsx`
