export const designSystem = {
  colors: {
    text: {
      primary: 'text-foreground',
      secondary: 'text-muted-foreground',
      tertiary: 'text-muted-foreground/70',
      link: 'text-foreground hover:text-accent transition-colors',
      accent: 'text-accent',
      accentSecondary: 'text-accent-secondary',
      mono: 'font-mono text-muted-foreground',
    },
    background: {
      primary: 'bg-background',
      secondary: 'bg-card',
      tertiary: 'bg-muted',
      accent: 'bg-accent',
      accentSecondary: 'bg-accent-secondary',
    },
    border: {
      default: 'border border-border',
      brutal: 'border-[3px] border-border',
      accent: 'border-[3px] border-accent',
      accentSecondary: 'border-[3px] border-accent-secondary',
      input: 'border-2 border-border',
    },
  },
  spacing: {
    component: {
      xs: 'mb-2',
      sm: 'mb-4',
      md: 'mb-6',
      lg: 'mb-10',
      nav: 'mb-16',
      card: 'p-5',
    },
    padding: {
      card: 'p-5',
      cardLg: 'p-8',
    },
  },
  radius: {
    none: 'rounded-none',
    button: 'rounded-none',
    card: 'rounded-none',
    container: 'rounded-none',
  },
  interactions: {
    link: 'transition-colors duration-100 hover:text-accent active:text-accent/80',
    button:
      'transition-all duration-100 hover:-translate-y-1 hover:shadow-brutal-lg hover:-rotate-[0.5deg] active:translate-y-0 active:shadow-brutal active:rotate-0',
    card:
      'transition-all duration-100 hover:-translate-y-1 hover:shadow-brutal-lg hover:-rotate-[0.5deg] active:translate-y-0 active:shadow-brutal active:rotate-0',
    badge:
      'transition-[color,box-shadow,transform] duration-100 hover:-translate-y-1 hover:shadow-brutal-lg hover:-rotate-[0.5deg] active:translate-y-0 active:shadow-brutal active:rotate-0',
    navItem: 'transition-colors duration-100 hover:bg-accent hover:text-accent-foreground',
    lift: 'transition-all duration-100 hover:-translate-y-0.5 hover:shadow-brutal-lg active:translate-y-0 active:shadow-brutal',
  },
  typography: {
    display: 'text-4xl font-black tracking-tight',
    pageTitle: 'text-3xl font-black tracking-tight',
    sectionTitle: 'text-xl font-extrabold tracking-tight',
    subtitle: 'text-lg font-semibold tracking-tight',
    body: 'text-sm leading-relaxed',
    caption: 'text-xs text-muted-foreground font-mono uppercase tracking-widest',
    mono: 'font-mono text-sm',
    label: 'text-xs font-mono font-bold uppercase tracking-widest',
  },
  animations: {
    duration: {
      fast: 80,
      normal: 120,
      slow: 200,
    },
    entrance: {
      fadeInUp: 'animate-fade-in-up',
      fadeIn: 'animate-fade-in',
    },
    stagger: {
      '1': 'delay-1',
      '2': 'delay-2',
      '3': 'delay-3',
      '4': 'delay-4',
      '5': 'delay-5',
    },
  },
  effects: {
    shadow: {
      brutal: 'shadow-brutal',
      brutalAccent: 'shadow-brutal-accent',
      brutalLg: 'shadow-brutal-lg',
      brutalXl: 'shadow-brutal-xl',
    },
    border: {
      brutal: 'border-[3px]',
      input: 'border-2',
    },
  },
} as const

export type DesignSystem = typeof designSystem
