'use client'

import { useEffect, useRef } from 'react'
import { playWrong } from '@/lib/sounds'

interface StrikeDisplayProps {
  strikes: number
  maxStrikes?: number
  vertical?: boolean
}

export default function StrikeDisplay({
  strikes,
  maxStrikes = 3,
  vertical = false,
}: StrikeDisplayProps) {
  const prevStrikes = useRef(0)

  useEffect(() => {
    if (strikes > prevStrikes.current) {
      playWrong()
    }
    prevStrikes.current = strikes
  }, [strikes])

  return (
    <div
      className={`flex items-center justify-center gap-3 ${vertical ? 'flex-col' : 'flex-row'}`}
    >
      {Array.from({ length: maxStrikes }).map((_, i) => (
        <div
          key={i}
          className={`flex h-12 w-12 items-center justify-center rounded-lg border-2 text-2xl font-black transition-all sm:h-16 sm:w-16 sm:text-3xl ${
            i < strikes
              ? 'strike-appear border-red-500 bg-red-950 text-red-400'
              : 'border-blue-800 bg-blue-950 text-blue-900'
          }`}
        >
          {i < strikes ? 'X' : ''}
        </div>
      ))}
    </div>
  )
}
