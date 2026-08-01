'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

const STREAM_URL = 'https://ice6.somafm.com/deepspaceone-128-mp3'
const STORAGE_KEY = 'radio-volume'
const DEFAULT_VOLUME = 0.5
const FFT_SIZE = 256

interface AudioGraph {
  ctx: AudioContext
  analyser: AnalyserNode
  source: MediaElementAudioSourceNode
}

// Survive React Strict Mode remounts / soft navigations: one graph per media element.
const graphByAudio = new WeakMap<HTMLMediaElement, AudioGraph>()

function createAudioElement(): HTMLAudioElement {
  const audio = new Audio()
  audio.crossOrigin = 'anonymous'
  audio.preload = 'none'
  audio.src = STREAM_URL
  return audio
}

function getAudioContextCtor(): typeof AudioContext | null {
  if (typeof window === 'undefined') return null
  return (
    window.AudioContext ||
    (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext ||
    null
  )
}

function getOrCreateGraph(audio: HTMLMediaElement): AudioGraph | null {
  const existing = graphByAudio.get(audio)
  if (existing && existing.ctx.state !== 'closed') {
    return existing
  }

  const AudioContextCtor = getAudioContextCtor()
  if (!AudioContextCtor) return null

  try {
    const ctx = new AudioContextCtor()
    const source = ctx.createMediaElementSource(audio)
    const analyser = ctx.createAnalyser()
    analyser.fftSize = FFT_SIZE
    analyser.smoothingTimeConstant = 0.78
    analyser.minDecibels = -90
    analyser.maxDecibels = -20

    source.connect(analyser)
    analyser.connect(ctx.destination)

    const graph: AudioGraph = { ctx, analyser, source }
    graphByAudio.set(audio, graph)
    return graph
  } catch {
    // Element already wired, or browser blocked Web Audio
    return graphByAudio.get(audio) ?? null
  }
}

export function useRadioAudio() {
  const [volume, setVolumeState] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved !== null) {
        const parsed = parseFloat(saved)
        if (!isNaN(parsed) && parsed >= 0 && parsed <= 1) {
          return parsed
        }
      }
    }
    return DEFAULT_VOLUME
  })

  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isMuted, setIsMuted] = useState(false)
  const [analyserReady, setAnalyserReady] = useState(false)

  // Stable across Strict Mode remounts (same hook state)
  const [audio] = useState(createAudioElement)
  const audioRef = useRef(audio)
  audioRef.current = audio

  const isPlayingRef = useRef(isPlaying)
  const previousVolumeRef = useRef(DEFAULT_VOLUME)
  const analyserRef = useRef<AnalyserNode | null>(null)

  isPlayingRef.current = isPlaying

  useEffect(() => {
    const onLoadStart = () => {
      if (isPlayingRef.current || audio.readyState > 0) setIsLoading(true)
      setError(null)
    }
    const onCanPlay = () => setIsLoading(false)
    const onPlaying = () => {
      setIsPlaying(true)
      setIsLoading(false)
    }
    const onPause = () => {
      setIsPlaying(false)
      setIsLoading(false)
    }
    const onError = () => {
      setIsLoading(false)
      setIsPlaying(false)
      setError('Error loading stream')
    }
    const onAbort = () => setIsLoading(false)
    const onStalled = () => setIsLoading(true)

    audio.addEventListener('loadstart', onLoadStart)
    audio.addEventListener('canplay', onCanPlay)
    audio.addEventListener('playing', onPlaying)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('error', onError)
    audio.addEventListener('abort', onAbort)
    audio.addEventListener('stalled', onStalled)

    return () => {
      audio.removeEventListener('loadstart', onLoadStart)
      audio.removeEventListener('canplay', onCanPlay)
      audio.removeEventListener('playing', onPlaying)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('error', onError)
      audio.removeEventListener('abort', onAbort)
      audio.removeEventListener('stalled', onStalled)
      // Pause on leave, but do NOT close AudioContext — recreating
      // MediaElementSource on the same element is impossible.
      audio.pause()
    }
  }, [audio])

  useEffect(() => {
    audio.volume = isMuted ? 0 : volume
  }, [audio, volume, isMuted])

  useEffect(() => {
    if (typeof window !== 'undefined' && !isMuted) {
      localStorage.setItem(STORAGE_KEY, volume.toString())
    }
  }, [volume, isMuted])

  const ensureAnalyser = useCallback(async () => {
    const graph = getOrCreateGraph(audio)
    if (!graph) {
      setAnalyserReady(false)
      analyserRef.current = null
      return null
    }

    analyserRef.current = graph.analyser
    setAnalyserReady(true)

    if (graph.ctx.state === 'suspended') {
      try {
        await graph.ctx.resume()
      } catch {
        // Autoplay policy — play() gesture usually unlocks it
      }
    }

    return graph.analyser
  }, [audio])

  const togglePlay = useCallback(async () => {
    if (isPlayingRef.current) {
      audio.pause()
      setIsPlaying(false)
      setIsLoading(false)
      return
    }

    try {
      setIsLoading(true)
      setError(null)
      // Wire Web Audio before play so the first buffer is analysed
      await ensureAnalyser()
      await audio.play()
      // Resume again after play — some browsers suspend until playback starts
      await ensureAnalyser()
      setIsPlaying(true)
    } catch {
      setError('Unable to play')
      setIsPlaying(false)
      setIsLoading(false)
    }
  }, [audio, ensureAnalyser])

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      if (prev) {
        setVolumeState(previousVolumeRef.current || 0.5)
        return false
      }
      previousVolumeRef.current = volume
      return true
    })
  }, [volume])

  const setVolume = useCallback(
    (newVolume: number) => {
      setVolumeState(newVolume)
      if (newVolume > 0 && isMuted) {
        setIsMuted(false)
      }
    },
    [isMuted]
  )

  const retry = useCallback(() => {
    setError(null)
    void togglePlay()
  }, [togglePlay])

  return {
    isPlaying,
    isLoading,
    error,
    volume,
    isMuted,
    audioRef,
    analyserRef,
    analyserReady,
    streamUrl: STREAM_URL,
    togglePlay,
    toggleMute,
    setVolume,
    retry,
  }
}
