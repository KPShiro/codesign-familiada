'use client'

import { useGameStore } from '@/lib/store'
import { playCorrect } from '@/lib/sounds'

export default function AnswerControls() {
  const { currentQuestion, revealAnswer, hideAnswer, revealAllAnswers } = useGameStore()

  if (!currentQuestion) return null

  function handleReveal(id: number) {
    revealAnswer(id)
    playCorrect()
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-sm font-bold text-blue-300 uppercase tracking-wider">Odpowiedzi</h2>
        <button
          onClick={revealAllAnswers}
          className="text-xs px-2 py-1 rounded border border-amber-700 text-amber-400 hover:bg-amber-950/40 transition-all"
        >
          Odkryj wszystkie
        </button>
      </div>
      <div className="flex flex-col gap-1">
        {currentQuestion.answers.map((answer, i) => (
          <div
            key={answer.id}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all
              ${answer.revealed
                ? 'border-amber-700 bg-amber-950/30'
                : 'border-blue-800 bg-blue-950/40'
              }`}
          >
            <span className="text-blue-500 font-mono text-xs w-4">{i + 1}.</span>
            <span className={`flex-1 text-sm ${answer.revealed ? 'text-amber-300' : 'text-white'}`}>
              {answer.text}
            </span>
            <span className="text-xs text-blue-400 w-8 text-right font-mono">{answer.points} pkt</span>

            {answer.revealed ? (
              <button
                onClick={() => hideAnswer(answer.id)}
                className="ml-1 px-3 py-1 rounded text-xs font-bold bg-red-900/60 hover:bg-red-800 text-red-300 transition-all"
                title="Cofnij odkrycie i odejmij punkty z puli"
              >
                Ukryj
              </button>
            ) : (
              <button
                onClick={() => handleReveal(answer.id)}
                className="ml-1 px-3 py-1 rounded text-xs font-bold bg-blue-700 hover:bg-blue-600 text-white transition-all"
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
