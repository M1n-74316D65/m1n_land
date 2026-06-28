export const designSystem = {
  colors: {
    text: {
      primary: 'text-foreground',
      secondary: 'text-muted-foreground',
      link: 'text-muted-foreground hover:text-accent transition-colors duration-200 ease-out',
      linkEmphasis: 'text-foreground hover:text-accent transition-colors duration-200 ease-out',
      accent: 'text-accent',
      mono: 'font-mono text-muted-foreground',
    },
    background: {
      primary: 'bg-background',
      secondary: 'bg-card',
      tertiary: 'bg-muted',
      accent: 'bg-accent',
    },
    border: {
      default: 'border border-border',
      subtle: 'border border-border/60',
    },
  },
  spacing: {
    page: 'space-y-12',
    component: {
      xs: 'mb-2',
      sm: 'mb-4',
      md: 'mb-8',
      lg: 'mb-10',
      section: 'mb-12',
      nav: 'mb-12',
    },
    padding: {
      card: 'p-4',
      cardLg: 'p-6',
    },
  },
  radius: {
    default: 'rounded-md',
    card: 'rounded-lg',
    button: 'rounded-md',
  },
  interactions: {
    link: 'transition-colors duration-200 ease-out hover:text-accent',
    row: 'rounded-md transition-[color,background-color,transform] duration-200 ease-out hover:bg-muted/60',
    navItem: 'transition-colors duration-200 ease-out hover:text-foreground',
    card: 'transition-[border-color,box-shadow] duration-200 ease-out hover:border-accent/30',
    icon: 'transition-[color,opacity,transform] duration-200 ease-out group-hover:text-accent group-hover:translate-x-px group-hover:-translate-y-px',
    press: 'active:scale-[0.98] transition-transform duration-100 ease-out',
  },
  typography: {
    display: 'text-3xl font-semibold tracking-tight text-balance',
    pageTitle: 'text-2xl font-semibold tracking-tight',
    sectionTitle: 'text-sm font-medium text-muted-foreground',
    subtitle: 'text-sm leading-relaxed text-muted-foreground',
    secondaryText: 'text-muted-foreground',
    body: 'text-sm leading-relaxed',
    caption: 'text-xs text-muted-foreground',
    mono: 'font-mono text-xs text-muted-foreground',
    label: 'text-xs font-medium text-muted-foreground',
    meta: 'font-mono text-xs text-muted-foreground',
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
