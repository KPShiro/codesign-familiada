'use client'

import { useBroadcastHost } from '@/lib/broadcast'
import { cn } from '@/utils/cn'
import AnswersSection from './answers-section'
import QuestionSection from './questions-section'
import TeamsControls from './teams-controls'

export default function HostPanel() {
  useBroadcastHost()

  return (
    <div
      className={cn(
        'mx-auto grid h-screen min-h-screen max-w-500 grid-cols-[480px_1fr_480px]'
      )}
    >
      <div className="flex flex-col overflow-hidden border-r-2 border-current/15">
        <QuestionSection />
      </div>
      <div className="border-r-2 border-current/15">
        <AnswersSection />
      </div>
      <TeamsControls />
    </div>
  )
}
