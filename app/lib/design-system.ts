const durationNormal = 'duration-[var(--duration-normal)]'
const durationFast = 'duration-[var(--duration-fast)]'

export const designSystem = {
  colors: {
    text: {
      primary: 'text-foreground',
      secondary: 'text-muted-foreground',
      dim: 'text-text-dim',
      link: `text-muted-foreground hover:text-accent transition-colors ${durationNormal} ease-out`,
      linkEmphasis: `text-foreground hover:text-accent transition-colors ${durationNormal} ease-out`,
      accent: 'text-accent',
      phosphor: 'text-phosphor',
      mono: 'font-mono text-muted-foreground',
    },
    background: {
      primary: 'bg-background',
      secondary: 'bg-card',
      tertiary: 'bg-muted',
      accent: 'bg-accent',
      focus: 'bg-focus',
    },
    border: {
      default: 'border border-border',
      subtle: 'border border-border-subtle',
    },
  },
  spacing: {
    page: 'flex flex-col',
    component: {
      xs: 'mb-2',
      sm: 'mb-4',
      md: 'mb-0',
      lg: 'mb-0',
      section: 'mb-0',
      nav: 'mb-0',
    },
    padding: {
      card: 'p-4',
      cardLg: 'p-5',
    },
  },
  radius: {
    default: 'rounded-none',
    card: 'rounded-none',
    button: 'rounded-none',
  },
  interactions: {
    link: `transition-colors ${durationNormal} ease-out hover:text-accent`,
    row: `transition-colors ${durationNormal} ease-out`,
    navItem: `transition-colors ${durationNormal} ease-out hover:text-foreground`,
    card: `transition-[border-color,background-color] ${durationNormal} ease-out hover:border-accent`,
    icon: `transition-colors ${durationNormal} ease-out group-hover:text-accent`,
    press: `active:scale-[0.98] transition-transform ${durationFast} ease-out`,
  },
  surfaces: {
    list: 'surface-list divide-y divide-border',
    tag: 'inline-flex items-center border border-border bg-transparent px-2 py-0.5 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-muted-foreground',
  },
  typography: {
    display: 'display-type text-foreground',
    pageTitle:
      'font-sans text-2xl font-extrabold uppercase tracking-[-0.04em] leading-none text-foreground sm:text-3xl',
    sectionTitle:
      'font-mono text-[0.7rem] font-medium uppercase tracking-[0.1em] text-muted-foreground',
    subtitle: 'prose-desc text-[0.95rem] leading-relaxed text-muted-foreground',
    secondaryText: 'text-muted-foreground',
    body: 'prose-desc text-[0.95rem] leading-relaxed',
    caption: 'font-mono text-[0.7rem] uppercase tracking-[0.1em] text-muted-foreground',
    mono: 'font-mono text-[0.7rem] uppercase tracking-[0.1em] text-muted-foreground',
    label: 'font-mono text-[0.7rem] font-medium uppercase tracking-[0.1em] text-muted-foreground',
    meta: 'font-mono text-[0.7rem] uppercase tracking-[0.1em] text-text-dim',
  },
  animations: {
    entrance: {
      enter: 'animate-enter',
      reveal: 'animate-reveal',
      fadeIn: 'animate-fade-in',
    },
    stagger: {
      '1': 'animate-enter-delay-1',
      '2': 'animate-enter-delay-2',
      '3': 'animate-enter-delay-3',
      '4': 'animate-enter-delay-4',
      '5': 'animate-enter-delay-5',
      '6': 'animate-enter-delay-6',
      '7': 'animate-enter-delay-7',
      '8': 'animate-enter-delay-8',
    },
  },
} as const

export type DesignSystem = typeof designSystem
