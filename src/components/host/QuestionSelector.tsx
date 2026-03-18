'use client'

import { useGameStore } from '@/lib/store'
import InteractiveCard from '../shared/interactive-card'

export default function QuestionSelector() {
  const { questions, currentQuestionIndex, loadQuestion } = useGameStore()

  return (
    <div className="relative isolate flex h-full flex-col">
      <div className="p-6">
        <h2 className="font-semibold uppercase">
          Questions ({questions.length})
        </h2>
      </div>
      <div className="flex flex-col gap-1 overflow-y-auto p-6 pt-0">
        {questions.map((q, i) => (
          <InteractiveCard
            key={q.id}
            onClick={() => loadQuestion(i)}
            isSelected={currentQuestionIndex === i}
            className="flex items-center gap-3"
          >
            <div className="font-mono text-sm text-current/50">
              {`${i < 9 ? '0' + (i + 1) : i + 1}`}.
            </div>
            <div className="truncate text-sm">{q.text}</div>
          </InteractiveCard>
        ))}
      </div>
    </div>
  )
}
