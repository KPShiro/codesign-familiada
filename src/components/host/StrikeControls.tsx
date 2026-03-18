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
      <h2 className="mb-1 text-sm font-bold tracking-wider text-blue-300 uppercase">
        Straty
      </h2>
      <div className="flex items-center gap-3">
        {/* Strike indicators */}
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className={`flex h-10 w-10 items-center justify-center rounded-lg border-2 text-lg font-black transition-all ${i < strikes ? 'border-red-500 bg-red-950 text-red-400' : 'border-blue-800 bg-blue-950'}`}
          >
            {i < strikes ? 'X' : ''}
          </div>
        ))}

        <div className="ml-auto flex gap-2">
          <button
            onClick={handleAddStrike}
            disabled={strikes >= 3}
            className="rounded-lg bg-red-900 px-4 py-2 text-sm font-bold text-white transition-all hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            + Strata
          </button>
          <button
            onClick={resetStrikes}
            disabled={strikes === 0}
            className="rounded-lg border border-blue-700 px-3 py-2 text-sm text-blue-300 transition-all hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Reset
          </button>
        </div>
      </div>

      {phase === 'steal' && (
        <div className="mt-1 rounded-lg border border-red-500 bg-red-950/40 px-3 py-2 text-center text-sm font-semibold text-red-400">
          🚨 Czas na kradzież!
        </div>
      )}
    </div>
  )
}
