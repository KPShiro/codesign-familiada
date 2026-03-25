'use client'

import { playWrong } from '@/lib/sounds'
import { MAX_STRIKES, useGameStore } from '@/lib/store'
import { cn } from '@/utils/cn'
import { XIcon } from 'lucide-react'
import { useEffect, useRef } from 'react'

type StrikeDisplayProps = Omit<React.ComponentProps<'div'>, 'children'> & {
  teamId: 0 | 1
}

export default function StrikeDisplay({
  teamId,
  className,
  ...props
}: StrikeDisplayProps) {
  const { strikes, activeTeam } = useGameStore()
  const prevStrikes = useRef(0)

  function hasStike(index: number) {
    return index < strikes && activeTeam === teamId
  }

  useEffect(() => {
    if (strikes > prevStrikes.current) {
      playWrong()
    }

    prevStrikes.current = strikes
  }, [strikes])

  return (
    <div
      {...props}
      className={cn(
        'flex flex-col items-center justify-center gap-[1vmin]',
        className
      )}
    >
      {Array.from({ length: MAX_STRIKES }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'flex size-[6vmin] items-center justify-center rounded-[0.75vmin] border-[0.25vmin]',
            hasStike(i)
              ? 'border-danger/60 bg-danger/25 text-danger'
              : 'border-dashed border-current/15 bg-current/5'
          )}
        >
          {hasStike(i) ? <XIcon size="4.5vmin" /> : null}
        </div>
      ))}
    </div>
  )
}
