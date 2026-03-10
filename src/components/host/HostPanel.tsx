'use client'

import { useBroadcastHost } from '@/lib/broadcast'
import { useGameStore } from '@/lib/store'
import QuestionSelector from './QuestionSelector'
import AnswerControls from './AnswerControls'
import StrikeControls from './StrikeControls'
import TeamControls from './TeamControls'
import FastMoneyHost from './FastMoneyHost'

export default function HostPanel() {
  useBroadcastHost()
  const phase = useGameStore((s) => s.phase)
  const currentQuestion = useGameStore((s) => s.currentQuestion)

  if (phase === 'fastmoney') {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex flex-col">
        <header className="px-4 py-3 border-b border-blue-900 flex items-center gap-3">
          <span className="text-yellow-400 font-black text-xl tracking-widest">FAMILIADA</span>
          <span className="text-purple-400 text-sm font-semibold uppercase">— Fast Money</span>
        </header>
        <main className="flex-1 overflow-y-auto p-4">
          <FastMoneyHost />
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white grid grid-cols-[280px_1fr] h-screen">
      {/* Left sidebar — question list */}
      <aside className="border-r border-blue-900 flex flex-col overflow-hidden">
        <header className="px-4 py-3 border-b border-blue-900">
          <span className="text-yellow-400 font-black text-xl tracking-widest">FAMILIADA</span>
          <p className="text-blue-400 text-xs mt-0.5">Panel prowadzącego</p>
        </header>
        <div className="flex-1 overflow-y-auto p-3">
          <QuestionSelector />
        </div>
      </aside>

      {/* Main panel */}
      <main className="flex flex-col overflow-y-auto">
        <div className="p-4 flex flex-col gap-5">
          {!currentQuestion ? (
            <div className="flex flex-col items-center justify-center h-64 text-center text-blue-500">
              <div className="text-4xl mb-3">←</div>
              <p className="text-lg font-semibold">Wybierz pytanie z listy</p>
              <p className="text-sm mt-1">aby rozpocząć rundę</p>
            </div>
          ) : (
            <>
              {/* Current question preview */}
              <div className="px-4 py-3 rounded-xl border border-blue-700 bg-blue-950/40">
                <p className="text-xs text-blue-400 uppercase tracking-wider mb-1">Aktualne pytanie</p>
                <p className="text-white font-semibold">{currentQuestion.text}</p>
              </div>

              {/* Answer controls */}
              <div className="p-4 rounded-xl border border-blue-800 bg-blue-950/20">
                <AnswerControls />
              </div>

              {/* Strike controls */}
              <div className="p-4 rounded-xl border border-blue-800 bg-blue-950/20">
                <StrikeControls />
              </div>
            </>
          )}

          {/* Team controls — always visible */}
          <div className="p-4 rounded-xl border border-blue-800 bg-blue-950/20">
            <TeamControls />
          </div>
        </div>
      </main>
    </div>
  )
}
