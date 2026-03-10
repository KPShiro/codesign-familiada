'use client'

import { useGameStore } from '@/lib/store'

export default function QuestionSelector() {
  const { questions, currentQuestionIndex, loadQuestion } = useGameStore()

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-sm font-bold text-blue-300 uppercase tracking-wider mb-1">
        Pytania ({questions.length})
      </h2>
      <div className="flex flex-col gap-1 max-h-[calc(100vh-8rem)] overflow-y-auto pr-1">
        {questions.map((q, i) => (
          <button
            key={q.id}
            onClick={() => loadQuestion(i)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm border transition-all
              ${currentQuestionIndex === i
                ? 'border-yellow-400 bg-yellow-950/40 text-yellow-300 font-semibold'
                : 'border-blue-800 bg-blue-950/40 text-blue-200 hover:border-blue-500 hover:bg-blue-900/40'
              }`}
          >
            <span className="text-blue-500 mr-2 font-mono text-xs">{i + 1}.</span>
            {q.text}
          </button>
        ))}
      </div>
    </div>
  )
}
