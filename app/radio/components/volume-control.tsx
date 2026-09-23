'use client'

import { Volume1, Volume2, VolumeX } from 'lucide-react'

import { Button } from 'app/components/ui/button'
import { cn } from 'app/lib/utils'

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
    <div className={cn('flex min-w-0 flex-1 items-center gap-3', className)}>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onToggleMute}
        className="size-11 shrink-0 rounded-md"
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
        aria-valuetext={`${volumePercent}%`}
        aria-valuenow={displayVolume}
        aria-valuemin={0}
        aria-valuemax={1}
        className="h-11 min-w-0 flex-1 cursor-pointer accent-accent"
      />

      <span className="w-9 shrink-0 text-right font-mono text-[0.6875rem] tabular-nums text-muted-foreground">
        {volumePercent}%
      </span>
    </div>
  )
}

export default VolumeControl
