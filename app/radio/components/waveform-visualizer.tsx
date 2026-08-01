'use client'

import React, { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'

import { cn } from 'app/lib/utils'

interface WaveformVisualizerProps {
  analyserRef: React.RefObject<AnalyserNode | null>
  analyserReady: boolean
  isPlaying: boolean
  isLoading: boolean
  className?: string
}

const BAR_COUNT = 48
const IDLE_PROFILE = Array.from({ length: BAR_COUNT }, (_, i) => {
  const t = i / (BAR_COUNT - 1)
  const envelope = Math.sin(t * Math.PI)
  return 0.08 + envelope * 0.22
})

function sampleBars(
  frequencyData: Uint8Array,
  out: Float32Array,
  barCount: number
): void {
  const len = frequencyData.length
  // Skip the very top bins (often empty on stream bitrate) and weight lows/mids
  const usable = Math.max(8, Math.floor(len * 0.72))

  for (let i = 0; i < barCount; i++) {
    // Logarithmic bin distribution for more musical spacing
    const t0 = i / barCount
    const t1 = (i + 1) / barCount
    const start = Math.floor(Math.pow(t0, 1.65) * usable)
    const end = Math.max(start + 1, Math.floor(Math.pow(t1, 1.65) * usable))

    let sum = 0
    for (let j = start; j < end && j < usable; j++) {
      sum += frequencyData[j]
    }
    const avg = sum / (end - start)
    // Soft curve so quiet ambient material still has presence
    out[i] = Math.pow(avg / 255, 0.72)
  }
}

const WaveformVisualizer: React.FC<WaveformVisualizerProps> = ({
  analyserRef,
  analyserReady,
  isPlaying,
  isLoading,
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduceMotion = useReducedMotion()
  const barsRef = useRef(new Float32Array(BAR_COUNT).fill(0.08))
  const targetRef = useRef(new Float32Array(BAR_COUNT).fill(0.08))
  const freqRef = useRef<Uint8Array<ArrayBuffer> | null>(null)
  const rafRef = useRef<number>(0)
  const phaseRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let running = true
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const w = Math.max(1, Math.floor(rect.width * dpr))
      const h = Math.max(1, Math.floor(rect.height * dpr))
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
      }
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const draw = (now: number) => {
      if (!running) return

      resize()
      const { width, height } = canvas
      const analyser = analyserRef.current
      const bars = barsRef.current
      const targets = targetRef.current

      // Drive targets from live FFT, loading pulse, or idle profile
      if (isPlaying && analyser && analyserReady && !reduceMotion) {
        if (!freqRef.current || freqRef.current.length !== analyser.frequencyBinCount) {
          freqRef.current = new Uint8Array(analyser.frequencyBinCount) as Uint8Array<ArrayBuffer>
        }
        analyser.getByteFrequencyData(freqRef.current)
        sampleBars(freqRef.current, targets, BAR_COUNT)
      } else if (isLoading && !reduceMotion) {
        phaseRef.current = now * 0.0025
        for (let i = 0; i < BAR_COUNT; i++) {
          const wave = 0.5 + 0.5 * Math.sin(phaseRef.current + i * 0.35)
          targets[i] = 0.1 + wave * 0.35 * IDLE_PROFILE[i] * 2.2
        }
      } else {
        for (let i = 0; i < BAR_COUNT; i++) {
          targets[i] = IDLE_PROFILE[i] * (isPlaying && reduceMotion ? 1.4 : 1)
        }
      }

      // Smooth follow so bars don't strobe
      const lerp = isPlaying && analyserReady ? 0.28 : 0.12
      for (let i = 0; i < BAR_COUNT; i++) {
        bars[i] += (targets[i] - bars[i]) * lerp
      }

      ctx.clearRect(0, 0, width, height)

      // Subtle baseline grid (CRT telemetry)
      ctx.save()
      ctx.strokeStyle = 'rgba(42, 42, 42, 0.9)'
      ctx.lineWidth = dpr
      const midY = height * 0.5
      ctx.beginPath()
      ctx.moveTo(0, midY)
      ctx.lineTo(width, midY)
      ctx.stroke()
      ctx.restore()

      const gap = Math.max(1, Math.floor(width * 0.004))
      const totalGap = gap * (BAR_COUNT - 1)
      const barWidth = Math.max(1, (width - totalGap) / BAR_COUNT)
      const maxBarH = height * 0.92

      for (let i = 0; i < BAR_COUNT; i++) {
        const level = Math.max(0.04, Math.min(1, bars[i]))
        const barH = Math.max(2 * dpr, level * maxBarH)
        const x = i * (barWidth + gap)
        const y = (height - barH) * 0.5

        const live = isPlaying && analyserReady
        if (live) {
          // Phosphor core
          ctx.fillStyle = '#4af626'
          ctx.globalAlpha = 0.85 + level * 0.15
          ctx.fillRect(x, y, barWidth, barH)
          // Soft top tick (hazard accent on peaks)
          if (level > 0.72) {
            ctx.fillStyle = '#e61919'
            ctx.globalAlpha = Math.min(1, (level - 0.72) * 3)
            ctx.fillRect(x, y, barWidth, Math.max(1, 2 * dpr))
          }
        } else if (isLoading) {
          ctx.fillStyle = '#8a8a8a'
          ctx.globalAlpha = 0.55 + level * 0.35
          ctx.fillRect(x, y, barWidth, barH)
        } else {
          ctx.fillStyle = '#eaeaea'
          ctx.globalAlpha = 0.28 + level * 0.2
          ctx.fillRect(x, y, barWidth, barH)
        }
      }

      ctx.globalAlpha = 1
      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      running = false
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
    }
  }, [analyserRef, analyserReady, isPlaying, isLoading, reduceMotion])

  const label = isPlaying
    ? analyserReady
      ? 'Live frequency spectrum'
      : 'Signal active'
    : isLoading
      ? 'Tuning signal'
      : 'Audio signal idle'

  return (
    <div
      className={cn(
        'relative min-h-24 w-full overflow-hidden border border-border bg-card sm:min-h-28',
        className
      )}
      role="img"
      aria-label={label}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between px-2 py-1 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-text-dim"
        aria-hidden="true"
      >
        <span>FFT / {BAR_COUNT}</span>
        <span className={isPlaying && analyserReady ? 'text-phosphor' : undefined}>
          {isPlaying ? (analyserReady ? 'LIVE' : 'SYN') : isLoading ? 'SYNC' : 'IDLE'}
        </span>
      </div>
    </div>
  )
}

export default WaveformVisualizer
