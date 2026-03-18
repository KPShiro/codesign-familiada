'use client'

import { useEffect, useRef } from 'react'
import { Team } from '@/lib/store'
import { playSuccess } from '@/lib/sounds'

interface TeamScoresProps {
  teams: [Team, Team]
  activeTeam: 0 | 1 | null
  roundPoints: number
}

export default function TeamScores({
  teams,
  activeTeam,
  roundPoints,
}: TeamScoresProps) {
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
          className={`flex flex-1 flex-col items-center justify-center rounded-xl border-2 px-4 py-3 transition-all ${
            activeTeam === i
              ? 'team-active border-yellow-400 bg-yellow-950/40'
              : 'border-blue-700 bg-blue-950/50'
          }`}
        >
          <span className="mb-1 text-xs font-semibold tracking-wider text-blue-300 uppercase sm:text-sm">
            {teams[i].name}
          </span>
          <span
            className="text-3xl font-black sm:text-4xl"
            style={{ color: activeTeam === i ? '#f5c518' : '#e2e8f0' }}
          >
            {teams[i].score}
          </span>
        </div>
      ))}

      {roundPoints > 0 && (
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-yellow-500 bg-yellow-950/40 px-6 py-3">
          <span className="text-xs tracking-wider text-yellow-300 uppercase">
            Runda
          </span>
          <span className="text-3xl font-black text-yellow-400 sm:text-4xl">
            {roundPoints}
          </span>
        </div>
      )}
    </div>
  )
}
