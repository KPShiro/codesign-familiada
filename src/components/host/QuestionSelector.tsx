'use client'

import { useGameStore } from '@/lib/store'

export default function QuestionSelector() {
  const { questions, currentQuestionIndex, loadQuestion } = useGameStore()

  return (
    <div className="flex flex-col gap-2">
      <h2 className="mb-1 text-sm font-bold tracking-wider text-blue-300 uppercase">
        Pytania ({questions.length})
      </h2>
      <div className="flex max-h-[calc(100vh-8rem)] flex-col gap-1 overflow-y-auto pr-1">
        {questions.map((q, i) => (
          <button
            key={q.id}
            onClick={() => loadQuestion(i)}
            className={`w-full rounded-lg border px-3 py-2 text-left text-sm transition-all ${
              currentQuestionIndex === i
                ? 'border-yellow-400 bg-yellow-950/40 font-semibold text-yellow-300'
                : 'border-blue-800 bg-blue-950/40 text-blue-200 hover:border-blue-500 hover:bg-blue-900/40'
            }`}
          >
            <span className="mr-2 font-mono text-xs text-blue-500">
              {i + 1}.
            </span>
            {q.text}
          </button>
        ))}
      </div>
    </div>
  )
}
