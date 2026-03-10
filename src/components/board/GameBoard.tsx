'use client'

import { useEffect, useRef } from 'react'
import AnswerSlot from './AnswerSlot'
import StrikeDisplay from './StrikeDisplay'
import FastMoneyBoard from './FastMoneyBoard'
import { GameState } from '@/lib/store'
import { playSuccess } from '@/lib/sounds'

interface GameBoardProps {
  state: GameState
}

export default function GameBoard({ state }: GameBoardProps) {
  const { currentQuestion, phase, strikes, teams, activeTeam, roundPoints } = state
  const prevScores = useRef<[number, number]>([teams[0].score, teams[1].score])

  useEffect(() => {
    const [s0, s1] = prevScores.current
    if (teams[0].score > s0 || teams[1].score > s1) {
      playSuccess()
    }
    prevScores.current = [teams[0].score, teams[1].score]
  }, [teams])

  if (phase === 'fastmoney') {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-6"
        style={{ background: 'linear-gradient(135deg, #0a1628 0%, #1a2a50 100%)' }}
      >
        <FastMoneyBoard state={state} />
      </div>
    )
  }

  const answers = currentQuestion?.answers ?? []

  return (
    <div
      className="min-h-screen flex"
      style={{ background: 'linear-gradient(135deg, #0a1628 0%, #1a2a50 100%)' }}
    >
      {/* Left panel — Team 0 */}
      <div
        className={`w-44 sm:w-52 shrink-0 flex flex-col items-center justify-center gap-5 p-4
          border-r-2 transition-all
          ${activeTeam === 0
            ? 'bg-yellow-950/30 border-yellow-500 team-active'
            : 'bg-blue-950/20 border-blue-900/60'
          }`}
      >
        <span
          className={`text-xs sm:text-sm font-bold uppercase tracking-widest text-center leading-tight
            ${activeTeam === 0 ? 'text-yellow-300' : 'text-blue-300'}`}
        >
          {teams[0].name}
        </span>
        <span
          className="text-5xl sm:text-6xl font-black tabular-nums"
          style={{ color: activeTeam === 0 ? '#f5c518' : '#e2e8f0' }}
        >
          {teams[0].score}
        </span>
        {activeTeam === 0 && <StrikeDisplay strikes={strikes} vertical />}
      </div>

      {/* Center */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-4 gap-3 min-w-0">

        {/* Idle */}
        {phase === 'idle' && (
          <div className="text-center">
            <div
              className="text-5xl font-black tracking-widest mb-4"
              style={{ color: '#f5c518', textShadow: '0 0 40px rgba(245,197,24,0.5)' }}
            >
              FAMILIADA
            </div>
            <p className="text-blue-300 text-lg">Oczekiwanie na prowadzącego...</p>
          </div>
        )}

        {/* Playing / steal / round_end */}
        {(phase === 'playing' || phase === 'steal' || phase === 'round_end') && currentQuestion && (
          <div className="w-full max-w-2xl flex flex-col gap-3">

            {/* Question */}
            <div
              className="rounded-xl border-2 border-blue-500 px-6 py-4 text-center"
              style={{ background: 'rgba(26, 58, 107, 0.8)' }}
            >
              <p className="text-white text-xl sm:text-2xl font-bold leading-snug">
                {currentQuestion.text}
              </p>
            </div>

            {/* Steal banner */}
            {phase === 'steal' && (
              <div className="rounded-xl border-2 border-red-500 px-4 py-2 text-center bg-red-950/60">
                <p className="text-red-400 font-black text-xl tracking-wider">
                  🚨 KRADZIEŻ — Czas na odpowiedź drużyny!
                </p>
              </div>
            )}

            {/* Answers */}
            <div className="flex flex-col gap-2">
              {answers.map((answer, i) => (
                <AnswerSlot key={answer.id} answer={answer} index={i} />
              ))}
            </div>

            {/* Round points */}
            {roundPoints > 0 && (
              <div
                className="rounded-xl border-2 border-yellow-500 py-3 text-center"
                style={{ background: 'rgba(120, 80, 0, 0.25)' }}
              >
                <span className="text-yellow-400 font-black text-3xl sm:text-4xl tabular-nums">
                  {roundPoints}
                </span>
                <span className="text-yellow-600 text-lg ml-2 font-semibold">pkt</span>
              </div>
            )}

            {/* Strikes when no active team */}
            {activeTeam === null && strikes > 0 && (
              <div className="flex justify-center pt-1">
                <StrikeDisplay strikes={strikes} />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right panel — Team 1 */}
      <div
        className={`w-44 sm:w-52 shrink-0 flex flex-col items-center justify-center gap-5 p-4
          border-l-2 transition-all
          ${activeTeam === 1
            ? 'bg-yellow-950/30 border-yellow-500 team-active'
            : 'bg-blue-950/20 border-blue-900/60'
          }`}
      >
        <span
          className={`text-xs sm:text-sm font-bold uppercase tracking-widest text-center leading-tight
            ${activeTeam === 1 ? 'text-yellow-300' : 'text-blue-300'}`}
        >
          {teams[1].name}
        </span>
        <span
          className="text-5xl sm:text-6xl font-black tabular-nums"
          style={{ color: activeTeam === 1 ? '#f5c518' : '#e2e8f0' }}
        >
          {teams[1].score}
        </span>
        {activeTeam === 1 && <StrikeDisplay strikes={strikes} vertical />}
      </div>
    </div>
  )
}
