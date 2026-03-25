'use client'

import { playReveal } from '@/lib/sounds'
import { Answer } from '@/lib/store'
import { cn } from '@/utils/cn'
import { useEffect, useRef } from 'react'

interface AnswerSlotProps {
  answer: Answer
  index: number
}

export default function AnswerSlot({ answer, index }: AnswerSlotProps) {
  const prevRevealed = useRef(false)

  useEffect(() => {
    if (answer.revealed && !prevRevealed.current) {
      playReveal()
    }
    prevRevealed.current = answer.revealed
  }, [answer.revealed])

  return (
    <div className="h-[6vmin] perspective-distant">
      <div
        className={cn(
          'relative size-full transition-transform duration-500 ease-linear transform-3d',
          answer.revealed ? 'rotate-x-180' : ''
        )}
      >
        <div className="absolute inset-0 h-full rounded-[0.75vmin] border-[0.25vmin] border-dashed border-current/15 bg-current/5 backface-hidden"></div>
        <div className="border-primary/60 from-primary/30 to-primary/10 absolute inset-0 flex h-full rotate-x-180 items-center justify-between gap-[2vmin] rounded-[0.75vmin] border-[0.25vmin] bg-linear-to-r pr-[3vmin] pl-[2vmin] text-[1.75vmin] backface-hidden">
          <span className="text-current/50">{index + 1}</span>
          <span className="flex-1 truncate">{answer.text}</span>
          <span className="text-[1.5vmin] font-semibold">
            {answer.points} points
          </span>
        </div>
      </div>
    </div>
  )
}
