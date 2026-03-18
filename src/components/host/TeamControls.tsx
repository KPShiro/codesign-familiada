'use client'

import { playSuccess } from '@/lib/sounds'
import { useGameStore } from '@/lib/store'
import { cn } from '@/utils/cn'
import { useState } from 'react'
import Button from '../shared/button'
import Input from '../shared/input'

export default function TeamControls() {
  const {
    teams,
    activeTeam,
    roundPoints,
    setActiveTeam,
    addRoundPointsToTeam,
    setTeamName,
    setTeamScore,
    adjustTeamScore,
    resetRound,
    startFastMoney,
  } = useGameStore()

  const [nameValue, setNameValue] = useState('')

  function saveName(team: 0 | 1) {
    setTeamName(team, nameValue.trim() || teams[team].name)
  }

  function handleAddPoints(team: 0 | 1) {
    addRoundPointsToTeam(team)
    playSuccess()
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <Button variant="outlined" onClick={resetRound}>
          New Round
        </Button>
        <Button variant="outlined" onClick={startFastMoney}>
          Fast Money
        </Button>
      </div>
      {([0, 1] as const).map((i) => (
        <div key={i} className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <h2
              className={cn(
                'font-bold uppercase',
                activeTeam === i ? 'text-primary' : ''
              )}
            >
              Team {i + 1}
            </h2>
            {activeTeam === i ? (
              <div className="bg-primary/25 text-primary rounded-md px-2 py-1 text-xs font-medium">
                Active
              </div>
            ) : (
              ''
            )}
          </div>
          <div
            className={cn(
              'flex flex-col gap-4 rounded-md border-2 p-4',
              activeTeam === i ? 'border-primary' : 'border-current/15'
            )}
          >
            <label className="flex flex-col gap-2">
              <span className="text-xs font-bold text-current/60">
                Edit Name
              </span>
              <Input
                defaultValue={teams[i].name}
                onChange={(e) => setNameValue(e.target.value)}
                onBlur={() => saveName(i)}
                onKeyDown={(e) => e.key === 'Enter' && saveName(i)}
              />
            </label>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-current/60">
                Adjust Team&apos;s Total Score
              </span>
              <div className="flex gap-2">
                <Input
                  value={teams[i].score}
                  disabled
                  className="text-center"
                />
                <Button
                  variant="outlined"
                  onClick={() => adjustTeamScore(i, -10)}
                  className="flex-1"
                >
                  <span className="font-mono">-10</span>
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => adjustTeamScore(i, 10)}
                  className="flex-1"
                >
                  <span className="font-mono">+10</span>
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setTeamScore(i, -10)}
                  className="flex-1"
                >
                  <span className="font-mono">Reset</span>
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-current/60">
                Other Actions
              </span>
              <Button
                variant="filled"
                onClick={() => handleAddPoints(i)}
                disabled={roundPoints <= 0 || activeTeam !== i}
              >
                Give reward:
                <div className="flex items-center gap-0.5">
                  {roundPoints} points
                </div>
              </Button>
              <Button
                variant="outlined"
                onClick={() => setActiveTeam(activeTeam === i ? null : i)}
              >
                {activeTeam === i ? 'Set Inactive' : 'Set Active'}
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
