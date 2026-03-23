'use client'

import { playSuccess } from '@/lib/sounds'
import { useGameStore } from '@/lib/store'
import { cn } from '@/utils/cn'
import Button from '../shared/button'
import ActiveTeamSwitcher from './active-team-switcher'
import AnswersList from './answers-list'
import StrikesControls from './strikes-controls'

type AnswersSectionProps = Omit<React.ComponentProps<'div'>, 'children'>

export default function AnswersSection({
  className,
  ...props
}: AnswersSectionProps) {
  const {
    currentQuestion,
    revealAllAnswers,
    hideAllAnswers,
    addRoundPointsToTeam,
    activeTeam,
    roundPoints,
  } = useGameStore()

  const canRewardTeam = activeTeam !== null && roundPoints > 0

  const isAllAnswersRevealed = currentQuestion
    ? currentQuestion.answers.reduce((prev, curr) => {
        return prev && curr.revealed
      }, true)
    : false

  function handleRewadTeam() {
    if (!canRewardTeam) {
      return
    }

    addRoundPointsToTeam(activeTeam)
    playSuccess()
  }

  if (!currentQuestion)
    return (
      <div
        {...props}
        className={cn(
          'flex size-full flex-col items-center justify-center gap-4 p-6 text-center',
          className
        )}
      >
        <h2 className="max-w-prose text-xl font-semibold uppercase">
          Question Not Selected
        </h2>
        <p className="max-w-prose text-current/60">
          You can easily edit <code>/data/questions.json</code> file to modify
          all the questions available in the game. Make sure the structure of
          the file is not changed.
        </p>
      </div>
    )

  return (
    <div {...props} className={cn('flex flex-col gap-4 p-6', className)}>
      <ActiveTeamSwitcher />
      <h2 className="text-xl font-semibold">
        &ldquo;{currentQuestion.text}&rdquo;
      </h2>
      <div className="flex flex-wrap justify-between gap-4">
        <div className="flex gap-2">
          <Button
            variant="filled"
            disabled={!canRewardTeam}
            onClick={handleRewadTeam}
          >
            Reward: +{roundPoints} points
          </Button>
          {isAllAnswersRevealed ? (
            <Button variant="outlined" onClick={hideAllAnswers}>
              Hide all answers
            </Button>
          ) : (
            <Button variant="outlined" onClick={revealAllAnswers}>
              Reveal all answers
            </Button>
          )}
        </div>
        <StrikesControls />
      </div>
      <AnswersList />
    </div>
  )
}
