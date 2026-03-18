'use client'

import { playWrong } from '@/lib/sounds'
import { MAX_STRIKES, useGameStore } from '@/lib/store'
import { cn } from '@/utils/cn'
import { XIcon } from 'lucide-react'
import Button from '../shared/button'

export default function StrikeControls() {
  const { strikes, addStrike, resetStrikes } = useGameStore()

  const isStrikesMaxed = strikes >= MAX_STRIKES

  function handleAddStrike() {
    addStrike()
    playWrong()
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div
        className={cn(
          'flex h-10 items-center gap-1 rounded-md border-2 p-1',
          isStrikesMaxed
            ? 'border-danger outline-danger animate-ping-outline ping-outline-color-danger'
            : 'border-current/15'
        )}
      >
        {Array.from({ length: MAX_STRIKES }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'flex aspect-square h-full items-center justify-center rounded-xs',
              i < strikes ? 'bg-danger' : 'bg-current/5'
            )}
          >
            <XIcon
              className={cn(
                '',
                i < strikes ? 'text-on-danger' : 'text-current/15'
              )}
            />
          </div>
        ))}
      </div>
      <div className="flex gap-1">
        <Button onClick={handleAddStrike} variant="outlined">
          Add Strike
        </Button>
        <Button onClick={resetStrikes} variant="outlined">
          Rest Strikes
        </Button>
      </div>
    </div>
  )
}
