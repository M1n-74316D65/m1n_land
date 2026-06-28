export const motionTransition = {
  quick: { duration: 0.15, ease: [0.22, 1, 0.36, 1] as const },
  standard: { duration: 0.25, ease: [0.22, 1, 0.36, 1] as const },
  spring: { type: 'spring' as const, stiffness: 420, damping: 32 },
  tap: { type: 'spring' as const, stiffness: 500, damping: 35 },
} as const

export const motionFade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
} as const

export const motionEnter = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
} as const
