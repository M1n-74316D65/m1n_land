'use client'

import { Volume1, Volume2, VolumeX } from 'lucide-react'

import { Button } from 'app/components/ui/button'
import { cn } from 'app/lib/utils'
import { designSystem } from 'app/lib/design-system'

interface VolumeControlProps {
  volume: number
  isMuted: boolean
  onVolumeChange: (v: number) => void
  onToggleMute: () => void
  className?: string
}

const VolumeControl: React.FC<VolumeControlProps> = ({
  volume,
  isMuted,
  onVolumeChange,
  onToggleMute,
  className,
}) => {
  const displayVolume = isMuted ? 0 : volume
  const volumePercent = Math.round(displayVolume * 100)
  const VolumeIcon = isMuted || volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2

  return (
    <div className={cn('flex min-w-0 items-center gap-3 px-3 sm:px-4', className)}>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onToggleMute}
        className="h-8 w-8 shrink-0"
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        <VolumeIcon className="h-4 w-4" />
      </Button>

      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={displayVolume}
        onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
        aria-label="Radio volume"
        aria-valuenow={displayVolume}
        aria-valuemin={0}
        aria-valuemax={1}
        className="h-px min-w-0 flex-1 cursor-pointer appearance-none bg-border focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:bg-foreground [&::-webkit-slider-thumb]:appearance-none [&::-moz-slider-thumb]:h-3.5 [&::-moz-slider-thumb]:w-2 [&::-moz-slider-thumb]:bg-foreground [&::-moz-slider-thumb]:appearance-none [&::-moz-slider-thumb]:border-none"
        style={{
          background: `linear-gradient(to right, var(--foreground) ${volumePercent}%, var(--border) ${volumePercent}%)`,
        }}
      />

      <span
        className={`hidden w-10 shrink-0 text-right sm:block ${designSystem.typography.mono} text-xs tabular-nums`}
      >
        {volumePercent}%
      </span>
    </div>
  )
}

export default VolumeControl
