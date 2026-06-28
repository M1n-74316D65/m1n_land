import { designSystem } from 'app/lib/design-system'

const staggerKeys = ['1', '2', '3', '4', '5', '6', '7', '8'] as const

type StaggerKey = (typeof staggerKeys)[number]

export function entranceClasses(index = 0, variant: 'enter' | 'reveal' | 'fade' = 'enter'): string {
  const animation =
    variant === 'reveal'
      ? designSystem.animations.entrance.reveal
      : variant === 'fade'
        ? designSystem.animations.entrance.fadeIn
        : designSystem.animations.entrance.enter

  const staggerKey = staggerKeys[Math.min(index, staggerKeys.length - 1)] as StaggerKey

  return `${animation} ${designSystem.animations.stagger[staggerKey]}`
}
