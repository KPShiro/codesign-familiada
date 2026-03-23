'use client'

import { useBroadcastHost } from '@/lib/broadcast'
import { useGameStore } from '@/lib/store'
import { cn } from '@/utils/cn'
import AnswersSection from './answers-section'
import FastMoneyHost from './FastMoneyHost'
import QuestionSection from './questions-section'
import TeamsControls from './teams-controls'

export default function HostPanel() {
  useBroadcastHost()

  const phase = useGameStore((s) => s.phase)

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
    <div
      className={cn(
        'mx-auto grid h-screen min-h-screen max-w-500 grid-cols-[480px_1fr_480px]'
      )}
    >
      <aside className="flex flex-col overflow-hidden border-r-2 border-current/15">
        <QuestionSection />
      </aside>
      <div className="border-r-2 border-current/15">
        <AnswersSection />
      </div>
      <TeamsControls />
    </div>
  )
}
