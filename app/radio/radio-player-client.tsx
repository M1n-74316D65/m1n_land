'use client'

import { useCallback, useRef } from 'react'

import { useRadioAudio } from './components/use-radio-audio'
import WaveformVisualizer from './components/waveform-visualizer'
import PlayButton from './components/play-button'
import VolumeControl from './components/volume-control'
import StationInfo from './components/station-info'
import ConnectionStatus from './components/connection-status'

export default function RadioPlayerClient() {
  const {
    isPlaying,
    isLoading,
    error,
    volume,
    isMuted,
    audioRef,
    streamUrl,
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
      className="group/player relative bg-background focus-visible:outline-none"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label="Radio player"
      aria-describedby="radio-keyboard-help"
    >
      <div className="flex min-h-64 flex-col p-4 sm:min-h-72 sm:p-5">
        <StationInfo isPlaying={isPlaying} isLoading={isLoading} hasError={Boolean(error)} />

        <WaveformVisualizer
          isPlaying={isPlaying}
          isLoading={isLoading}
          className="my-8 flex-1 sm:my-10"
        />

        <ConnectionStatus isLoading={isLoading} error={error} onRetry={retry} />
      </div>

      <div className="grid grid-cols-[auto_1fr] border-t border-border">
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
        className="border-t border-border px-4 py-2.5 font-mono text-[0.65rem] uppercase leading-none tracking-[0.1em] text-text-dim sm:px-5"
      >
        Space: play/pause&nbsp;&nbsp; M: mute&nbsp;&nbsp; Up/Down: volume
      </p>

      <audio ref={audioRef} src={streamUrl} preload="none" />
    </div>
  )
}
