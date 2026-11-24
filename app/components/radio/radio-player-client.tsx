'use client'

import { useCallback, useRef } from 'react'

import { useRadioAudio } from './use-radio-audio'
import WaveformVisualizer from './waveform-visualizer'
import PlayButton from './play-button'
import VolumeControl from './volume-control'
import StationInfo from './station-info'
import ConnectionStatus from './connection-status'

export default function RadioPlayerClient() {
  const {
    isPlaying,
    isLoading,
    error,
    volume,
    isMuted,
    analyserRef,
    analyserReady,
    togglePlay,
    toggleMute,
    setVolume,
    retry,
  } = useRadioAudio()

  const containerRef = useRef<HTMLDivElement>(null)

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.target !== event.currentTarget) return

      switch (event.key) {
        case ' ':
        case 'Spacebar':
          event.preventDefault()
          if (isLoading || error) return
          togglePlay()
          break
        case 'm':
        case 'M':
          event.preventDefault()
          toggleMute()
          break
        case 'ArrowUp':
          event.preventDefault()
          setVolume(Math.min(volume + 0.05, 1))
          break
        case 'ArrowDown':
          event.preventDefault()
          setVolume(Math.max(volume - 0.05, 0))
          break
      }
    },
    [togglePlay, toggleMute, setVolume, volume, isLoading, error]
  )

  return (
    <div
      ref={containerRef}
      className="group/player relative bg-card p-4 sm:p-7"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label="Radio player"
      aria-describedby="radio-keyboard-help"
    >
      <div className="flex flex-col">
        <StationInfo isPlaying={isPlaying} isLoading={isLoading} hasError={Boolean(error)} />

        <WaveformVisualizer
          analyserRef={analyserRef}
          analyserReady={analyserReady}
          isPlaying={isPlaying}
          isLoading={isLoading}
          className="my-6 sm:my-8"
        />

        <ConnectionStatus isLoading={isLoading} error={error} onRetry={retry} />
      </div>

      <div className="flex flex-col gap-4 pt-5 sm:flex-row sm:items-center sm:gap-6">
        <PlayButton
          isPlaying={isPlaying}
          isLoading={isLoading}
          disabled={isLoading || Boolean(error)}
          onToggle={togglePlay}
        />
        <VolumeControl
          volume={volume}
          isMuted={isMuted}
          onVolumeChange={setVolume}
          onToggleMute={toggleMute}
        />
      </div>

      <p
        id="radio-keyboard-help"
        className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-[0.8125rem] leading-relaxed text-muted-foreground"
      >
        <span>
          <span className="text-foreground">Space</span> play / pause
        </span>
        <span>
          <span className="text-foreground">M</span> mute
        </span>
        <span>
          <span className="text-foreground">↑ ↓</span> volume
        </span>
      </p>
    </div>
  )
}
