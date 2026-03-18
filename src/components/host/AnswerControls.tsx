'use client'

import { playCorrect } from '@/lib/sounds'
import { Answer, useGameStore } from '@/lib/store'
import { cn } from '@/utils/cn'
import { ArrowLeftIcon } from 'lucide-react'
import Button from '../shared/button'
import InteractiveCard from '../shared/interactive-card'
import StrikeControls from './StrikeControls'

type AnswerControlsProps = React.ComponentProps<'div'>

export default function AnswerControls({
  className,
  ...props
}: AnswerControlsProps) {
  const {
    currentQuestion,
    revealAnswer,
    hideAnswer,
    revealAllAnswers,
    hideAllAnswers,
  } = useGameStore()

  const isAllAnswersRevealed = currentQuestion
    ? currentQuestion.answers.reduce((prev, curr) => {
        return prev && curr.revealed
      }, true)
    : false

  function handleToggleAllAnswers() {
    if (isAllAnswersRevealed) {
      hideAllAnswers()
    } else {
      revealAllAnswers()
      playCorrect()
    }
  }

  function handleOnAnswerClick(answer: Answer) {
    if (answer.revealed) {
      hideAnswer(answer.id)
    } else {
      revealAnswer(answer.id)
      playCorrect()
    }
  }

  if (!currentQuestion)
    return (
      <div
        {...props}
        className={cn(
          'flex size-full flex-col items-center justify-center gap-2 text-center',
          className
        )}
      >
        <div className="mb-6 flex size-16 items-center justify-center rounded-lg bg-current/10">
          <ArrowLeftIcon size={24} />
        </div>
        <h2 className="max-w-prose text-lg font-semibold">
          Select a question from the list
        </h2>
        <p className="max-w-prose text-sm text-current/60">
          You can easily edit <code>/data/questions.json</code> file to modify
          all the questions available in the game. Make sure the structure of
          the file is not changed.
        </p>
      </div>
    )

  return (
    <div {...props} className={cn('flex flex-col', className)}>
      <div className="p-6">
        <StrikeControls />
      </div>
      <div className="text-primary bg-primary/15 p-6">
        <h2 className="text-center font-semibold">
          &ldquo;{currentQuestion.text}&quot;
        </h2>
      </div>
      <div className="flex flex-col gap-6 p-6">
        <Button onClick={handleToggleAllAnswers} variant="outlined">
          Toggle All Answers
        </Button>
        <div className="flex flex-col gap-1">
          {currentQuestion.answers.map((answer, i) => (
            <InteractiveCard
              key={answer.id}
              isSelected={answer.revealed}
              onClick={() => handleOnAnswerClick(answer)}
              className="transition-transform duration-150 enabled:active:scale-99"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-current/60">
                  {`${i < 9 ? '0' + (i + 1) : i + 1}`}.
                </span>
                <div className={'flex-1 text-left text-sm'}>{answer.text}</div>
                <span className="text-right font-mono text-xs">
                  {answer.points} points
                </span>
              </div>
            </InteractiveCard>
          ))}
        </div>
      </div>
    </div>
  )
}
