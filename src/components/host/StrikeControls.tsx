'use client'

import { useGameStore } from '@/lib/store'
import { playWrong } from '@/lib/sounds'

export default function StrikeControls() {
  const { strikes, addStrike, resetStrikes, phase } = useGameStore()

  function handleAddStrike() {
    addStrike()
    playWrong()
  }

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-sm font-bold text-blue-300 uppercase tracking-wider mb-1">Straty</h2>
      <div className="flex gap-3 items-center">
        {/* Strike indicators */}
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg font-black border-2 transition-all
              ${i < strikes ? 'border-red-500 bg-red-950 text-red-400' : 'border-blue-800 bg-blue-950'}`}
          >
            {i < strikes ? 'X' : ''}
          </div>
        ))}

        <div className="flex gap-2 ml-auto">
          <button
            onClick={handleAddStrike}
            disabled={strikes >= 3}
            className="px-4 py-2 rounded-lg bg-red-900 hover:bg-red-700 text-white font-bold text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            + Strata
          </button>
          <button
            onClick={resetStrikes}
            disabled={strikes === 0}
            className="px-3 py-2 rounded-lg border border-blue-700 hover:bg-blue-900 text-blue-300 text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Reset
          </button>
        </div>
      </div>

      {phase === 'steal' && (
        <div className="mt-1 px-3 py-2 rounded-lg border border-red-500 bg-red-950/40 text-red-400 text-sm font-semibold text-center">
          🚨 Czas na kradzież!
        </div>
      )}
    </div>
  )
}
