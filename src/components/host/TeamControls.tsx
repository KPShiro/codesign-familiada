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
      <h2 className="text-sm font-bold text-blue-300 uppercase tracking-wider">Drużyny i punkty</h2>

      {/* Multiplier */}
      <div className="flex gap-2 items-center">
        <span className="text-xs text-blue-400">Mnożnik:</span>
        {[1, 2].map((m) => (
          <button
            key={m}
            onClick={() => setMultiplier(m)}
            className={`px-3 py-1 rounded text-sm font-bold border transition-all
              ${multiplier === m
                ? 'border-yellow-400 bg-yellow-950/40 text-yellow-300'
                : 'border-blue-700 text-blue-400 hover:bg-blue-900/40'
              }`}
          >
            x{m}
          </button>
        ))}
        {roundPoints > 0 && (
          <span className="ml-auto text-yellow-400 font-bold text-sm">
            Pula: {roundPoints} pkt
          </span>
        )}
      </div>

      {/* Team cards */}
      {([0, 1] as const).map((i) => (
        <div
          key={i}
          className={`p-3 rounded-xl border-2 transition-all
            ${activeTeam === i ? 'border-yellow-400 bg-yellow-950/20' : 'border-blue-800 bg-blue-950/40'}`}
        >
          <div className="flex items-center gap-2 mb-2">
            {/* Name */}
            {editingName === i ? (
              <input
                className="flex-1 bg-blue-900 border border-blue-600 rounded px-2 py-1 text-white text-sm focus:outline-none focus:border-yellow-400"
                value={nameValue}
                onChange={(e) => setNameValue(e.target.value)}
                onBlur={() => saveName(i)}
                onKeyDown={(e) => e.key === 'Enter' && saveName(i)}
                autoFocus
              />
            ) : (
              <button
                onClick={() => startEditName(i)}
                className="flex-1 text-left text-white font-semibold text-sm hover:text-yellow-300 transition-colors"
                title="Kliknij aby edytować nazwę"
              >
                {teams[i].name} ✏️
              </button>
            )}

            {/* Score display + quick adjust */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => adjustTeamScore(i, -50)}
                className="px-1.5 py-1 rounded text-xs font-bold bg-red-950 hover:bg-red-800 text-red-400 border border-red-900 transition-all"
                title="Odejmij 50 pkt"
              >−50</button>
              <button
                onClick={() => adjustTeamScore(i, -10)}
                className="px-1.5 py-1 rounded text-xs font-bold bg-red-950 hover:bg-red-800 text-red-400 border border-red-900 transition-all"
                title="Odejmij 10 pkt"
              >−10</button>
              <input
                type="number"
                min={0}
                value={teams[i].score}
                onChange={(e) => setTeamScore(i, Number(e.target.value))}
                className="w-16 bg-blue-900 border border-blue-700 rounded px-2 py-1 text-white text-right text-sm font-bold focus:outline-none focus:border-yellow-400"
              />
              <button
                onClick={() => adjustTeamScore(i, 10)}
                className="px-1.5 py-1 rounded text-xs font-bold bg-green-950 hover:bg-green-800 text-green-400 border border-green-900 transition-all"
                title="Dodaj 10 pkt"
              >+10</button>
              <button
                onClick={() => adjustTeamScore(i, 50)}
                className="px-1.5 py-1 rounded text-xs font-bold bg-green-950 hover:bg-green-800 text-green-400 border border-green-900 transition-all"
                title="Dodaj 50 pkt"
              >+50</button>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setActiveTeam(activeTeam === i ? null : i)}
              className={`flex-1 py-1.5 rounded text-xs font-semibold transition-all border
                ${activeTeam === i
                  ? 'border-yellow-500 bg-yellow-900/40 text-yellow-300'
                  : 'border-blue-700 text-blue-400 hover:bg-blue-900/40'
                }`}
            >
              {activeTeam === i ? '★ Aktywna' : 'Ustaw aktywną'}
            </button>
            <button
              onClick={() => handleAddPoints(i)}
              disabled={roundPoints === 0}
              className="flex-1 py-1.5 rounded text-xs font-semibold bg-green-900 hover:bg-green-700 text-green-300 border border-green-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
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
          className="flex-1 py-2 rounded-lg border border-blue-700 text-blue-300 hover:bg-blue-900/40 text-sm transition-all"
        >
          Nowa runda
        </button>
        <button
          onClick={startFastMoney}
          className="flex-1 py-2 rounded-lg border border-purple-700 bg-purple-950/40 text-purple-300 hover:bg-purple-900/40 text-sm font-semibold transition-all"
        >
          Fast Money →
        </button>
      </div>
    </div>
  )
}
