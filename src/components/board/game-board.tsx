'use client'

import { playSuccess } from '@/lib/sounds'
import { useGameStore } from '@/lib/store'
import { useEffect, useRef } from 'react'
import AnswerSlot from './answer-slot'
import StrikeDisplay from './strike-display'
import TeamPanel from './team-panel'

export default function GameBoard() {
  const { currentQuestion, phase, teams, roundPoints } = useGameStore()
  const prevScores = useRef<[number, number]>([teams[0].score, teams[1].score])

  const answers = currentQuestion?.answers ?? []
  const isPlaying =
    (phase === 'playing' || phase === 'steal' || phase === 'round_end') &&
    currentQuestion

  useEffect(() => {
    const [score_0, score_1] = prevScores.current

    if (teams[0].score > score_0 || teams[1].score > score_1) {
      playSuccess()
    }

    prevScores.current = [teams[0].score, teams[1].score]
  }, [teams])

  return (
    <div className="grid min-h-screen grid-cols-[30vmin_1fr_30vmin]">
      <TeamPanel teamId={0} />

      <div className="flex flex-col items-center justify-center p-[10vmin]">
        {phase === 'idle' && (
          <div className="flex flex-col gap-[1vmin] text-center">
            <div className="text-[6vmin] font-black tracking-widest">
              FAMILY FEUD
            </div>
            <p className="text-[2.5vmin] text-current/80">
              Waiting for the host...
            </p>
          </div>
        )}

        {isPlaying ? (
          <div className="flex w-full max-w-[100vmin] gap-[4vmin]">
            <StrikeDisplay teamId={0} />
            <div className="flex flex-1 flex-col gap-[3vmin]">
              <div className="rounded-[0.75vmin] border-[0.25vmin] border-dashed border-current/15 px-[4vmin] py-[2vmin]">
                <p className="text-center text-[2.5vmin] leading-loose text-white">
                  {currentQuestion.text}
                </p>
              </div>
              <div className="flex flex-1 flex-col gap-[0.75vmin]">
                {answers.map((answer, index) => (
                  <AnswerSlot key={answer.id} answer={answer} index={index} />
                ))}
              </div>
              <div className="flex justify-end gap-[1vmin] px-[3vmin] text-[1.75vmin]">
                <span>Total Points:</span>
                <span className="font-semibold text-yellow-500">
                  {roundPoints} points
                </span>
              </div>
            </div>
            <StrikeDisplay teamId={1} />
          </div>
        ) : null}
      </div>

      <TeamPanel teamId={1} />
    </div>
  )
}
