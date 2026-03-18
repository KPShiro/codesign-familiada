'use client'

import { useGameStore } from '@/lib/store'
import { playCorrect } from '@/lib/sounds'

export default function AnswerControls() {
  const { currentQuestion, revealAnswer, hideAnswer, revealAllAnswers } =
    useGameStore()

  if (!currentQuestion) return null

  function handleReveal(id: number) {
    revealAnswer(id)
    playCorrect()
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="mb-1 flex items-center justify-between">
        <h2 className="text-sm font-bold tracking-wider text-blue-300 uppercase">
          Odpowiedzi
        </h2>
        <button
          onClick={revealAllAnswers}
          className="rounded border border-amber-700 px-2 py-1 text-xs text-amber-400 transition-all hover:bg-amber-950/40"
        >
          Odkryj wszystkie
        </button>
      </div>
      <div className="flex flex-col gap-1">
        {currentQuestion.answers.map((answer, i) => (
          <div
            key={answer.id}
            className={`flex items-center gap-2 rounded-lg border px-3 py-2 transition-all ${
              answer.revealed
                ? 'border-amber-700 bg-amber-950/30'
                : 'border-blue-800 bg-blue-950/40'
            }`}
          >
            <span className="w-4 font-mono text-xs text-blue-500">
              {i + 1}.
            </span>
            <span
              className={`flex-1 text-sm ${answer.revealed ? 'text-amber-300' : 'text-white'}`}
            >
              {answer.text}
            </span>
            <span className="w-8 text-right font-mono text-xs text-blue-400">
              {answer.points} pkt
            </span>

            {answer.revealed ? (
              <button
                onClick={() => hideAnswer(answer.id)}
                className="ml-1 rounded bg-red-900/60 px-3 py-1 text-xs font-bold text-red-300 transition-all hover:bg-red-800"
                title="Cofnij odkrycie i odejmij punkty z puli"
              >
                Ukryj
              </button>
            ) : (
              <button
                onClick={() => handleReveal(answer.id)}
                className="ml-1 rounded bg-blue-700 px-3 py-1 text-xs font-bold text-white transition-all hover:bg-blue-600"
              >
                Odkryj
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
