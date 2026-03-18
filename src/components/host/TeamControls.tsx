'use client'

import { useState } from 'react'
import { useGameStore } from '@/lib/store'
import { playSuccess } from '@/lib/sounds'

export default function TeamControls() {
  const {
    teams,
    activeTeam,
    roundPoints,
    multiplier,
    setActiveTeam,
    addRoundPointsToTeam,
    setMultiplier,
    setTeamName,
    setTeamScore,
    adjustTeamScore,
    resetRound,
    phase,
    startFastMoney,
  } = useGameStore()

  const [editingName, setEditingName] = useState<0 | 1 | null>(null)
  const [nameValue, setNameValue] = useState('')

  function startEditName(team: 0 | 1) {
    setEditingName(team)
    setNameValue(teams[team].name)
  }

  function saveName(team: 0 | 1) {
    setTeamName(team, nameValue.trim() || teams[team].name)
    setEditingName(null)
  }

  function handleAddPoints(team: 0 | 1) {
    addRoundPointsToTeam(team)
    playSuccess()
  }

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-sm font-bold tracking-wider text-blue-300 uppercase">
        Drużyny i punkty
      </h2>

      {/* Multiplier */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-blue-400">Mnożnik:</span>
        {[1, 2].map((m) => (
          <button
            key={m}
            onClick={() => setMultiplier(m)}
            className={`rounded border px-3 py-1 text-sm font-bold transition-all ${
              multiplier === m
                ? 'border-yellow-400 bg-yellow-950/40 text-yellow-300'
                : 'border-blue-700 text-blue-400 hover:bg-blue-900/40'
            }`}
          >
            x{m}
          </button>
        ))}
        {roundPoints > 0 && (
          <span className="ml-auto text-sm font-bold text-yellow-400">
            Pula: {roundPoints} pkt
          </span>
        )}
      </div>

      {/* Team cards */}
      {([0, 1] as const).map((i) => (
        <div
          key={i}
          className={`rounded-xl border-2 p-3 transition-all ${activeTeam === i ? 'border-yellow-400 bg-yellow-950/20' : 'border-blue-800 bg-blue-950/40'}`}
        >
          <div className="mb-2 flex items-center gap-2">
            {/* Name */}
            {editingName === i ? (
              <input
                className="flex-1 rounded border border-blue-600 bg-blue-900 px-2 py-1 text-sm text-white focus:border-yellow-400 focus:outline-none"
                value={nameValue}
                onChange={(e) => setNameValue(e.target.value)}
                onBlur={() => saveName(i)}
                onKeyDown={(e) => e.key === 'Enter' && saveName(i)}
                autoFocus
              />
            ) : (
              <button
                onClick={() => startEditName(i)}
                className="flex-1 text-left text-sm font-semibold text-white transition-colors hover:text-yellow-300"
                title="Kliknij aby edytować nazwę"
              >
                {teams[i].name} ✏️
              </button>
            )}

            {/* Score display + quick adjust */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => adjustTeamScore(i, -50)}
                className="rounded border border-red-900 bg-red-950 px-1.5 py-1 text-xs font-bold text-red-400 transition-all hover:bg-red-800"
                title="Odejmij 50 pkt"
              >
                −50
              </button>
              <button
                onClick={() => adjustTeamScore(i, -10)}
                className="rounded border border-red-900 bg-red-950 px-1.5 py-1 text-xs font-bold text-red-400 transition-all hover:bg-red-800"
                title="Odejmij 10 pkt"
              >
                −10
              </button>
              <input
                type="number"
                min={0}
                value={teams[i].score}
                onChange={(e) => setTeamScore(i, Number(e.target.value))}
                className="w-16 rounded border border-blue-700 bg-blue-900 px-2 py-1 text-right text-sm font-bold text-white focus:border-yellow-400 focus:outline-none"
              />
              <button
                onClick={() => adjustTeamScore(i, 10)}
                className="rounded border border-green-900 bg-green-950 px-1.5 py-1 text-xs font-bold text-green-400 transition-all hover:bg-green-800"
                title="Dodaj 10 pkt"
              >
                +10
              </button>
              <button
                onClick={() => adjustTeamScore(i, 50)}
                className="rounded border border-green-900 bg-green-950 px-1.5 py-1 text-xs font-bold text-green-400 transition-all hover:bg-green-800"
                title="Dodaj 50 pkt"
              >
                +50
              </button>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setActiveTeam(activeTeam === i ? null : i)}
              className={`flex-1 rounded border py-1.5 text-xs font-semibold transition-all ${
                activeTeam === i
                  ? 'border-yellow-500 bg-yellow-900/40 text-yellow-300'
                  : 'border-blue-700 text-blue-400 hover:bg-blue-900/40'
              }`}
            >
              {activeTeam === i ? '★ Aktywna' : 'Ustaw aktywną'}
            </button>
            <button
              onClick={() => handleAddPoints(i)}
              disabled={roundPoints === 0}
              className="flex-1 rounded border border-green-700 bg-green-900 py-1.5 text-xs font-semibold text-green-300 transition-all hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              +{roundPoints} pkt → {teams[i].name}
            </button>
          </div>
        </div>
      ))}

      {/* Round controls */}
      <div className="flex gap-2 pt-1">
        <button
          onClick={resetRound}
          className="flex-1 rounded-lg border border-blue-700 py-2 text-sm text-blue-300 transition-all hover:bg-blue-900/40"
        >
          Nowa runda
        </button>
        <button
          onClick={startFastMoney}
          className="flex-1 rounded-lg border border-purple-700 bg-purple-950/40 py-2 text-sm font-semibold text-purple-300 transition-all hover:bg-purple-900/40"
        >
          Fast Money →
        </button>
      </div>
    </div>
  )
}
