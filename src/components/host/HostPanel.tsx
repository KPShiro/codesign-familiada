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
      <div className="flex min-h-screen flex-col bg-gray-950 text-white">
        <header className="flex items-center gap-3 border-b border-blue-900 px-4 py-3">
          <span className="text-xl font-black tracking-widest text-yellow-400">
            FAMILIADA
          </span>
          <span className="text-sm font-semibold text-purple-400 uppercase">
            — Fast Money
          </span>
        </header>
        <main className="flex-1 overflow-y-auto p-4">
          <FastMoneyHost />
        </main>
      </div>
    )
  }

  return (
    <div className="grid h-screen min-h-screen grid-cols-[280px_1fr] bg-gray-950 text-white">
      {/* Left sidebar — question list */}
      <aside className="flex flex-col overflow-hidden border-r border-blue-900">
        <header className="border-b border-blue-900 px-4 py-3">
          <span className="text-xl font-black tracking-widest text-yellow-400">
            FAMILIADA
          </span>
          <p className="mt-0.5 text-xs text-blue-400">Panel prowadzącego</p>
        </header>
        <div className="flex-1 overflow-y-auto p-3">
          <QuestionSelector />
        </div>
      </aside>

      {/* Main panel */}
      <main className="flex flex-col overflow-y-auto">
        <div className="flex flex-col gap-5 p-4">
          {!currentQuestion ? (
            <div className="flex h-64 flex-col items-center justify-center text-center text-blue-500">
              <div className="mb-3 text-4xl">←</div>
              <p className="text-lg font-semibold">Wybierz pytanie z listy</p>
              <p className="mt-1 text-sm">aby rozpocząć rundę</p>
            </div>
          ) : (
            <>
              {/* Current question preview */}
              <div className="rounded-xl border border-blue-700 bg-blue-950/40 px-4 py-3">
                <p className="mb-1 text-xs tracking-wider text-blue-400 uppercase">
                  Aktualne pytanie
                </p>
                <p className="font-semibold text-white">
                  {currentQuestion.text}
                </p>
              </div>

              {/* Answer controls */}
              <div className="rounded-xl border border-blue-800 bg-blue-950/20 p-4">
                <AnswerControls />
              </div>

              {/* Strike controls */}
              <div className="rounded-xl border border-blue-800 bg-blue-950/20 p-4">
                <StrikeControls />
              </div>
            </>
          )}

          {/* Team controls — always visible */}
          <div className="rounded-xl border border-blue-800 bg-blue-950/20 p-4">
            <TeamControls />
          </div>
        </div>
      </main>
    </div>
  )
}
