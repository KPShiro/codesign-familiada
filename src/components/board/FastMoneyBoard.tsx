'use client'

import { GameState } from '@/lib/store'

interface FastMoneyBoardProps {
  state: Pick<GameState,
    | 'fastMoneyQuestions'
    | 'fastMoneyPlayer1Answers'
    | 'fastMoneyPlayer2Answers'
    | 'fastMoneyActivePlayer'
    | 'fastMoneyTotalPoints'
  >
}

export default function FastMoneyBoard({ state }: FastMoneyBoardProps) {
  const { fastMoneyQuestions, fastMoneyPlayer1Answers, fastMoneyPlayer2Answers, fastMoneyActivePlayer, fastMoneyTotalPoints } = state

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-4">
      {/* Header */}
      <div className="text-center mb-2">
        <h2 className="text-3xl font-black tracking-widest" style={{ color: '#f5c518' }}>
          FAST MONEY
        </h2>
        <div className="text-4xl font-black text-white mt-1">
          Razem: <span style={{ color: '#f5c518' }}>{fastMoneyTotalPoints}</span> pkt
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-2 gap-6">
        {([1, 2] as const).map((player) => {
          const answers = player === 1 ? fastMoneyPlayer1Answers : fastMoneyPlayer2Answers
          const isActive = fastMoneyActivePlayer === player

          return (
            <div
              key={player}
              className={`flex flex-col gap-2 p-3 rounded-xl border-2 transition-all
                ${isActive ? 'border-yellow-400 bg-yellow-950/20' : 'border-blue-700 bg-blue-950/30'}`}
            >
              <div className={`text-center text-sm font-bold uppercase tracking-wider ${isActive ? 'text-yellow-400' : 'text-blue-300'}`}>
                Gracz {player}
              </div>

              {fastMoneyQuestions.map((q, idx) => {
                const ans = answers[idx]
                return (
                  <div key={q.id} className="flex gap-2 items-stretch">
                    {/* Question */}
                    <div className="flex-1 bg-blue-900/60 rounded px-2 py-1 text-xs text-blue-200 flex items-center">
                      {q.text}
                    </div>
                    {/* Answer */}
                    <div className={`w-32 rounded px-2 py-1 flex items-center justify-between text-sm font-bold transition-all
                      ${ans?.revealed
                        ? 'bg-amber-600 text-white'
                        : 'bg-blue-800 text-blue-300'
                      }`}>
                      <span className="truncate">
                        {ans?.revealed ? (ans.givenAnswer || '—') : (ans?.givenAnswer ? '▓▓▓▓▓' : '—')}
                      </span>
                      {ans?.revealed && ans.points > 0 && (
                        <span className="ml-1 text-white font-black">{ans.points}</span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}
