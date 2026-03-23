'use client'

import { useGameStore } from '@/lib/store'
import Button from '../shared/button'
import Input from '../shared/input'

export default function TeamsControls() {
  const {
    teams,
    activeTeam,
    setTeamName,
    setTeamScore,
    resetRound,
    startFastMoney,
  } = useGameStore()

  function saveName(team: 0 | 1, name: string) {
    setTeamName(team, name.trim() || teams[team].name)
  }

  function saveTotalScore(team: 0 | 1, score: string) {
    setTeamScore(team, Number(score.trim()))
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <Button variant="filled" onClick={resetRound}>
          New Round
        </Button>
        <Button variant="outlined" onClick={startFastMoney}>
          Fast Money
        </Button>
      </div>
      {([0, 1] as const).map((i) => (
        <div key={i} className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <h2 className="uppercase">Team {i + 1}</h2>
          </div>
          <div className="flex gap-4 rounded-md border-2 border-current/15 p-4">
            <label className="flex flex-1 flex-col gap-2">
              <span className="text-xs font-bold text-current/60">
                Display Name
              </span>
              <Input
                defaultValue={teams[i].name}
                onChange={(e) => saveName(i, e.target.value)}
                onBlur={(e) => saveName(i, e.target.value)}
              />
            </label>
            <div className="flex flex-1 flex-col gap-2">
              <span className="text-xs font-bold text-current/60">
                Total Score
              </span>
              <Input
                defaultValue={teams[i].score}
                onChange={(e) => saveTotalScore(i, e.target.value)}
                onBlur={(e) => saveTotalScore(i, e.target.value)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
