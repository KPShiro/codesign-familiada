'use client'

import { playWrong } from '@/lib/sounds'
import { MAX_STRIKES, useGameStore } from '@/lib/store'
import { cn } from '@/utils/cn'
import { XIcon } from 'lucide-react'
import Button from '../shared/button'

export default function StrikesControls() {
  const { strikes, addStrike, resetStrikes } = useGameStore()

  const canAddStrike = strikes < MAX_STRIKES

  function handleAddStrike() {
    if (!canAddStrike) {
      return
    }

    addStrike()
    playWrong()
  }

  return (
    <div className="flex items-center gap-2">
      <div
        className={cn(
          'flex h-12 items-center gap-1 rounded-md border-2 p-1',
          strikes > 0 ? 'border-danger' : 'border-current/15'
        )}
      >
        {Array.from({ length: MAX_STRIKES }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'flex aspect-square h-full items-center justify-center rounded-xs',
              i < strikes ? 'bg-danger/35' : 'bg-current/5'
            )}
          >
            <XIcon
              className={cn(
                '',
                i < strikes ? 'text-danger' : 'text-current/15'
              )}
            />
          </div>
        ))}
      </div>
      <Button
        onClick={handleAddStrike}
        variant="outlined"
        disabled={!canAddStrike}
      >
        Add
      </Button>
      <Button onClick={resetStrikes} variant="outlined">
        Reset
      </Button>
    </div>
  )
}
