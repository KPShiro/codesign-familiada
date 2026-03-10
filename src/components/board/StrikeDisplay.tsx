'use client'

import { useEffect, useRef } from 'react'
import { playWrong } from '@/lib/sounds'

interface StrikeDisplayProps {
  strikes: number
  maxStrikes?: number
  vertical?: boolean
}

export default function StrikeDisplay({ strikes, maxStrikes = 3, vertical = false }: StrikeDisplayProps) {
  const prevStrikes = useRef(0)

  useEffect(() => {
    if (strikes > prevStrikes.current) {
      playWrong()
    }
    prevStrikes.current = strikes
  }, [strikes])

  return (
    <div className={`flex gap-3 justify-center items-center ${vertical ? 'flex-col' : 'flex-row'}`}>
      {Array.from({ length: maxStrikes }).map((_, i) => (
        <div
          key={i}
          className={`w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center text-2xl sm:text-3xl font-black border-2 transition-all
            ${i < strikes
              ? 'border-red-500 bg-red-950 text-red-400 strike-appear'
              : 'border-blue-800 bg-blue-950 text-blue-900'
            }`}
        >
          {i < strikes ? 'X' : ''}
        </div>
      ))}
    </div>
  )
}
