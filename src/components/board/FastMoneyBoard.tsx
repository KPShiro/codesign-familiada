'use client'

import { GameState } from '@/lib/store'

interface FastMoneyBoardProps {
  state: Pick<
    GameState,
    | 'fastMoneyQuestions'
    | 'fastMoneyPlayer1Answers'
    | 'fastMoneyPlayer2Answers'
    | 'fastMoneyActivePlayer'
    | 'fastMoneyTotalPoints'
  >
}

export default function FastMoneyBoard({ state }: FastMoneyBoardProps) {
  const {
    fastMoneyQuestions,
    fastMoneyPlayer1Answers,
    fastMoneyPlayer2Answers,
    fastMoneyActivePlayer,
    fastMoneyTotalPoints,
  } = state

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-4">
      {/* Header */}
      <div className="mb-2 text-center">
        <h2
          className="text-3xl font-black tracking-widest"
          style={{ color: '#f5c518' }}
        >
          FAST MONEY
        </h2>
        <div className="mt-1 text-4xl font-black text-white">
          Razem:{' '}
          <span style={{ color: '#f5c518' }}>{fastMoneyTotalPoints}</span> pkt
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-2 gap-6">
        {([1, 2] as const).map((player) => {
          const answers =
            player === 1 ? fastMoneyPlayer1Answers : fastMoneyPlayer2Answers
          const isActive = fastMoneyActivePlayer === player

          return (
            <div
              key={player}
              className={`flex flex-col gap-2 rounded-xl border-2 p-3 transition-all ${isActive ? 'border-yellow-400 bg-yellow-950/20' : 'border-blue-700 bg-blue-950/30'}`}
            >
              <div
                className={`text-center text-sm font-bold tracking-wider uppercase ${isActive ? 'text-yellow-400' : 'text-blue-300'}`}
              >
                Gracz {player}
              </div>

              {fastMoneyQuestions.map((q, idx) => {
                const ans = answers[idx]
                return (
                  <div key={q.id} className="flex items-stretch gap-2">
                    {/* Question */}
                    <div className="flex flex-1 items-center rounded bg-blue-900/60 px-2 py-1 text-xs text-blue-200">
                      {q.text}
                    </div>
                    {/* Answer */}
                    <div
                      className={`flex w-32 items-center justify-between rounded px-2 py-1 text-sm font-bold transition-all ${
                        ans?.revealed
                          ? 'bg-amber-600 text-white'
                          : 'bg-blue-800 text-blue-300'
                      }`}
                    >
                      <span className="truncate">
                        {ans?.revealed
                          ? ans.givenAnswer || '—'
                          : ans?.givenAnswer
                            ? '▓▓▓▓▓'
                            : '—'}
                      </span>
                      {ans?.revealed && ans.points > 0 && (
                        <span className="ml-1 font-black text-white">
                          {ans.points}
                        </span>
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
