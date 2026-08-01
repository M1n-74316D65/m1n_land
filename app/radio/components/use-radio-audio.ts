'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

const STREAM_URL = 'https://ice6.somafm.com/deepspaceone-128-mp3'
const STORAGE_KEY = 'radio-volume'
const DEFAULT_VOLUME = 0.5
const FFT_SIZE = 256

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

  const audioRef = useRef<HTMLAudioElement>(null)
  const isPlayingRef = useRef(isPlaying)
  const previousVolumeRef = useRef(DEFAULT_VOLUME)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null)

  isPlayingRef.current = isPlaying

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    // Required for Web Audio analysis of cross-origin streams
    audio.crossOrigin = 'anonymous'

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
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      audio.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  useEffect(() => {
    if (typeof window !== 'undefined' && !isMuted) {
      localStorage.setItem(STORAGE_KEY, volume.toString())
    }
  }, [volume, isMuted])

  // Tear down Web Audio graph on unmount
  useEffect(() => {
    return () => {
      try {
        sourceRef.current?.disconnect()
        analyserRef.current?.disconnect()
        void audioContextRef.current?.close()
      } catch {
        // ignore teardown errors
      }
      sourceRef.current = null
      analyserRef.current = null
      audioContextRef.current = null
    }
  }, [])

  const ensureAnalyser = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return null

    if (analyserRef.current && audioContextRef.current) {
      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume()
      }
      return analyserRef.current
    }

    try {
      const AudioContextCtor = window.AudioContext || (window as typeof window & {
        webkitAudioContext?: typeof AudioContext
      }).webkitAudioContext
      if (!AudioContextCtor) return null

      const ctx = new AudioContextCtor()
      // MediaElementSource can only be created once per element
      const source = ctx.createMediaElementSource(audio)
      const analyser = ctx.createAnalyser()
      analyser.fftSize = FFT_SIZE
      analyser.smoothingTimeConstant = 0.78
      analyser.minDecibels = -85
      analyser.maxDecibels = -15

      source.connect(analyser)
      analyser.connect(ctx.destination)

      audioContextRef.current = ctx
      sourceRef.current = source
      analyserRef.current = analyser
      setAnalyserReady(true)

      if (ctx.state === 'suspended') {
        await ctx.resume()
      }

      return analyser
    } catch {
      // CORS / browser limits — visualizer falls back to synthetic motion
      setAnalyserReady(false)
      return null
    }
  }, [])

  const togglePlay = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlayingRef.current) {
      audio.pause()
      setIsPlaying(false)
      setIsLoading(false)
      return
    }

    try {
      setIsLoading(true)
      setError(null)
      await ensureAnalyser()
      await audio.play()
      setIsPlaying(true)
    } catch {
      setError('Unable to play')
      setIsPlaying(false)
      setIsLoading(false)
    }
  }, [ensureAnalyser])

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
    togglePlay()
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
