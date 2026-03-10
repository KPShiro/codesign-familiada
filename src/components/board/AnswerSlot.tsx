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
        <div className="answer-face answer-face-back px-3 gap-2 justify-between">
          <span className="text-white/60 font-bold text-sm shrink-0">{index + 1}.</span>
          <span className="text-white font-bold text-sm sm:text-base truncate flex-1 text-left pl-1">
            {answer.text}
          </span>
          <span
            className="text-white font-black text-lg sm:text-xl shrink-0"
            style={{ textShadow: '0 0 10px rgba(255,255,255,0.5)' }}
          >
            {answer.points}
          </span>
        </div>
      </div>
    </div>
  )
}
