'use client'

import { useEffect, useRef } from 'react'
import { Answer } from '@/lib/store'
import { playReveal } from '@/lib/sounds'

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
    <div className="answer-card-wrapper h-14 sm:h-16">
      <div className={`answer-card ${answer.revealed ? 'revealed' : ''}`}>
        {/* Front — hidden: empty dark slot */}
        <div className="answer-face answer-face-front" />
        {/* Back — revealed */}
        <div className="answer-face answer-face-back justify-between gap-2 px-3">
          <span className="shrink-0 text-sm font-bold text-white/60">
            {index + 1}.
          </span>
          <span className="flex-1 truncate pl-1 text-left text-sm font-bold text-white sm:text-base">
            {answer.text}
          </span>
          <span
            className="shrink-0 text-lg font-black text-white sm:text-xl"
            style={{ textShadow: '0 0 10px rgba(255,255,255,0.5)' }}
          >
            {answer.points}
          </span>
        </div>
      </div>
    </div>
  )
}
