'use client'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import React from 'react'

import { motionEnter, motionTransition } from 'app/lib/motion'

interface WaveformVisualizerProps {
  isPlaying: boolean
  isLoading: boolean
  className?: string
}

const BAR_COUNT = 7

const playingKeyframes = [0.3, 1, 0.5, 0.9, 0.4, 0.8, 0.3]
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
        className={`flex h-32 items-end justify-center gap-1.5 sm:h-40 ${className ?? ''}`}
      >
        {Array.from({ length: BAR_COUNT }).map((_, index) => (
          <motion.div
            key={index}
            className={`w-1.5 origin-bottom rounded-full ${isPlaying ? 'bg-accent' : 'bg-foreground/70'}`}
            style={{ height: '100%' }}
            animate={
              reduceMotion
                ? { scaleY: state === 'idle' ? 0.15 : 0.45 }
                : state === 'playing'
                  ? { scaleY: playingKeyframes }
                  : state === 'loading'
                    ? { scaleY: loadingKeyframes }
                    : { scaleY: 0.15 }
            }
            transition={
              reduceMotion
                ? { duration: 0 }
                : state === 'playing'
                  ? {
                      duration: 1.1,
                      repeat: Infinity,
                      repeatType: 'reverse',
                      ease: 'easeInOut',
                      delay: index * 0.07,
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
