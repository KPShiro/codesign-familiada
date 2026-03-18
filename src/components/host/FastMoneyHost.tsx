'use client'

import { useState, useEffect, useRef } from 'react'
import { useGameStore } from '@/lib/store'
import { playReveal, playTick, playSuccess } from '@/lib/sounds'

const PLAYER_TIME = 20 // seconds

export default function FastMoneyHost() {
  const {
    fastMoneyQuestions,
    fastMoneyPlayer1Answers,
    fastMoneyPlayer2Answers,
    fastMoneyActivePlayer,
    fastMoneyTotalPoints,
    setFastMoneyPlayerAnswer,
    setFastMoneyActivePlayer,
    revealFastMoneyAnswer,
    revealAllFastMoneyAnswers,
    setPhase,
  } = useGameStore()

  const [timer, setTimer] = useState(PLAYER_TIME)
  const [timerRunning, setTimerRunning] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (timerRunning) {
      intervalRef.current = setInterval(() => {
        setTimer((t) => {
          if (t <= 1) {
            setTimerRunning(false)
            return 0
          }
          if (t <= 6) playTick()
          return t - 1
        })
      }, 1000)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [timerRunning])

  function startTimer() {
    setTimer(PLAYER_TIME)
    setTimerRunning(true)
  }

  function stopTimer() {
    setTimerRunning(false)
  }

  function switchPlayer(player: 1 | 2) {
    setFastMoneyActivePlayer(player)
    setTimerRunning(false)
    setTimer(PLAYER_TIME)
  }

  function handleReveal(player: 1 | 2, index: number) {
    revealFastMoneyAnswer(player, index)
    playReveal()
  }

  function handleRevealAll(player: 1 | 2) {
    revealAllFastMoneyAnswers(player)
    playSuccess()
  }

  const answers1 = fastMoneyPlayer1Answers
  const answers2 = fastMoneyPlayer2Answers

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-black tracking-wider text-purple-300 uppercase">
          Fast Money
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black text-yellow-400">
            {fastMoneyTotalPoints} pkt
          </span>
          <button
            onClick={() => setPhase('idle')}
            className="rounded border border-blue-700 px-2 py-1 text-xs text-blue-400 transition-all hover:bg-blue-900"
          >
            ← Wróć
          </button>
        </div>
      </div>

      {/* Player selector + timer */}
      <div className="flex items-center gap-2">
        {([1, 2] as const).map((p) => (
          <button
            key={p}
            onClick={() => switchPlayer(p)}
            className={`flex-1 rounded-lg border py-2 text-sm font-bold transition-all ${
              fastMoneyActivePlayer === p
                ? 'border-purple-400 bg-purple-950/50 text-purple-300'
                : 'border-blue-700 text-blue-400 hover:bg-blue-900/40'
            }`}
          >
            Gracz {p}
          </button>
        ))}

        <div
          className={`flex h-10 w-14 items-center justify-center rounded-lg border-2 text-xl font-black ${timer <= 5 ? 'timer-warning border-red-500 text-red-400' : 'border-blue-700 text-white'}`}
        >
          {timer}
        </div>
        <button
          onClick={timerRunning ? stopTimer : startTimer}
          className={`rounded-lg border px-3 py-2 text-sm font-bold transition-all ${
            timerRunning
              ? 'border-red-600 bg-red-950/40 text-red-400 hover:bg-red-900/40'
              : 'border-green-700 bg-green-950/40 text-green-400 hover:bg-green-900/40'
          }`}
        >
          {timerRunning ? '⏸' : '▶'}
        </button>
      </div>

      {/* Answer tables — two players */}
      {([1, 2] as const).map((player) => {
        const answers = player === 1 ? answers1 : answers2
        const isActive = fastMoneyActivePlayer === player

        return (
          <div
            key={player}
            className={`rounded-xl border-2 p-3 transition-all ${isActive ? 'border-purple-500 bg-purple-950/20' : 'border-blue-800 bg-blue-950/30'}`}
          >
            <div className="mb-2 flex items-center justify-between">
              <h3
                className={`text-sm font-bold tracking-wider uppercase ${isActive ? 'text-purple-300' : 'text-blue-400'}`}
              >
                Gracz {player}
              </h3>
              <button
                onClick={() => handleRevealAll(player)}
                className="rounded border border-amber-700 px-2 py-0.5 text-xs text-amber-400 transition-all hover:bg-amber-950/40"
              >
                Odkryj wszystkie
              </button>
            </div>

            <div className="flex flex-col gap-1.5">
              {fastMoneyQuestions.map((q, idx) => {
                const ans = answers[idx]
                return (
                  <div key={q.id} className="flex items-center gap-2">
                    <span className="w-4 font-mono text-xs text-blue-500">
                      {idx + 1}.
                    </span>
                    <span className="flex-1 truncate text-xs text-blue-200">
                      {q.text}
                    </span>

                    {/* Given answer input */}
                    <input
                      className="w-28 rounded border border-blue-700 bg-blue-900 px-2 py-0.5 text-xs text-white focus:border-purple-400 focus:outline-none"
                      placeholder="Odpowiedź..."
                      value={ans?.givenAnswer ?? ''}
                      onChange={(e) =>
                        setFastMoneyPlayerAnswer(player, idx, {
                          givenAnswer: e.target.value,
                        })
                      }
                    />

                    {/* Points input */}
                    <input
                      type="number"
                      min={0}
                      max={100}
                      className="w-14 rounded border border-blue-700 bg-blue-900 px-2 py-0.5 text-right text-xs text-white focus:border-yellow-400 focus:outline-none"
                      placeholder="Pkt"
                      value={ans?.points || ''}
                      onChange={(e) =>
                        setFastMoneyPlayerAnswer(player, idx, {
                          points: Number(e.target.value),
                        })
                      }
                    />

                    {/* Reveal button */}
                    <button
                      onClick={() => handleReveal(player, idx)}
                      disabled={ans?.revealed}
                      className={`rounded px-2 py-0.5 text-xs font-bold transition-all ${
                        ans?.revealed
                          ? 'cursor-default bg-green-900/40 text-green-500'
                          : 'bg-purple-900 text-purple-200 hover:bg-purple-700'
                      }`}
                    >
                      {ans?.revealed ? '✓' : 'Odkryj'}
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
