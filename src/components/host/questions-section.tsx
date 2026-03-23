'use client'

import { useGameStore } from '@/lib/store'
import QuestionsList from './questions-list'

export default function QuestionSection() {
  const { questions } = useGameStore()

  return (
    <div className="relative isolate flex h-full flex-col">
      <div className="p-6">
        <h2 className="font-semibold">Questions ({questions.length})</h2>
      </div>
      <div className="overflow-y-auto p-6 pt-0">
        <QuestionsList />
      </div>
    </div>
  )
}
