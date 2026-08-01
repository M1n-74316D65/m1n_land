'use client'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import React from 'react'

import { motionEnter, motionTransition } from 'app/lib/motion'

interface WaveformVisualizerProps {
  isPlaying: boolean
  isLoading: boolean
  className?: string
}

const BAR_COUNT = 31
const barProfile = [
  0.16, 0.22, 0.18, 0.34, 0.28, 0.48, 0.38, 0.64, 0.46, 0.72, 0.56, 0.84, 0.68, 0.92, 0.76, 1, 0.72,
  0.9, 0.64, 0.82, 0.54, 0.7, 0.42, 0.6, 0.32, 0.48, 0.24, 0.36, 0.18, 0.28, 0.14,
]
const loadingKeyframes = [0.2, 0.5, 0.2]

const WaveformVisualizer: React.FC<WaveformVisualizerProps> = ({
  isPlaying,
  isLoading,
  className,
}) => {
  const reduceMotion = useReducedMotion()
  const state = isPlaying ? 'playing' : isLoading ? 'loading' : 'idle'

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={state}
        {...motionEnter}
        transition={reduceMotion ? { duration: 0 } : motionTransition.standard}
        className={`flex min-h-24 items-center justify-center gap-1 sm:min-h-28 sm:gap-1.5 ${className ?? ''}`}
        role="img"
        aria-label={
          isPlaying ? 'Live audio signal' : isLoading ? 'Tuning signal' : 'Audio signal idle'
        }
      >
        {Array.from({ length: BAR_COUNT }).map((_, index) => (
          <motion.div
            key={index}
            className={`h-full min-w-px flex-1 origin-center ${isPlaying ? 'bg-phosphor' : 'bg-foreground/40'}`}
            style={{ maxWidth: '3px' }}
            animate={
              reduceMotion
                ? { scaleY: state === 'idle' ? barProfile[index] * 0.35 : barProfile[index] }
                : state === 'playing'
                  ? {
                      scaleY: [
                        Math.max(0.12, barProfile[index] * 0.35),
                        barProfile[index],
                        Math.max(0.18, barProfile[(index + 7) % BAR_COUNT] * 0.7),
                      ],
                    }
                  : state === 'loading'
                    ? { scaleY: loadingKeyframes }
                    : { scaleY: barProfile[index] * 0.35 }
            }
            transition={
              reduceMotion
                ? { duration: 0 }
                : state === 'playing'
                  ? {
                      duration: 0.9 + (index % 5) * 0.12,
                      repeat: Infinity,
                      repeatType: 'reverse',
                      ease: 'easeInOut',
                      delay: (index % 7) * 0.04,
                    }
                  : state === 'loading'
                    ? {
                        duration: 1.8,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        ease: 'easeInOut',
                        delay: index * 0.07,
                      }
                    : {
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      }
            }
          />
        ))}
      </motion.div>
    </AnimatePresence>
  )
}

export default WaveformVisualizer
