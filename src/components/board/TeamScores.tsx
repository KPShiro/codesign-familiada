'use client'

import { useEffect, useRef } from 'react'
import { Team } from '@/lib/store'
import { playSuccess } from '@/lib/sounds'

interface TeamScoresProps {
  teams: [Team, Team]
  activeTeam: 0 | 1 | null
  roundPoints: number
}

export default function TeamScores({ teams, activeTeam, roundPoints }: TeamScoresProps) {
  const prevScores = useRef<[number, number]>([0, 0])

  useEffect(() => {
    const [s0, s1] = prevScores.current
    if (teams[0].score > s0 || teams[1].score > s1) {
      playSuccess()
    }
    prevScores.current = [teams[0].score, teams[1].score]
  }, [teams])

  return (
    <div className="flex w-full items-stretch gap-4">
      {([0, 1] as const).map((i) => (
        <div
          key={i}
          className={`flex-1 flex flex-col items-center justify-center py-3 px-4 rounded-xl border-2 transition-all
            ${activeTeam === i
              ? 'border-yellow-400 bg-yellow-950/40 team-active'
              : 'border-blue-700 bg-blue-950/50'
            }`}
        >
          <span className="text-xs sm:text-sm text-blue-300 uppercase tracking-wider font-semibold mb-1">
            {teams[i].name}
          </span>
          <span
            className="text-3xl sm:text-4xl font-black"
            style={{ color: activeTeam === i ? '#f5c518' : '#e2e8f0' }}
          >
            {teams[i].score}
          </span>
        </div>
      ))}

      {roundPoints > 0 && (
        <div className="flex flex-col items-center justify-center px-6 py-3 rounded-xl border-2 border-yellow-500 bg-yellow-950/40">
          <span className="text-xs text-yellow-300 uppercase tracking-wider">Runda</span>
          <span className="text-3xl sm:text-4xl font-black text-yellow-400">{roundPoints}</span>
        </div>
      )}
    </div>
  )
}
