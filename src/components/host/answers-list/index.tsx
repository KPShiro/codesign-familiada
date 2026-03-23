import { playCorrect } from '@/lib/sounds'
import { Answer, useGameStore } from '@/lib/store'
import { cn } from '@/utils/cn'
import AnswersListItem from './answers-list-item'

type AnswersListProps = Omit<React.ComponentProps<'div'>, 'children'>

export default function AnswersList({ className, ...props }: AnswersListProps) {
  const { currentQuestion, revealAnswer, hideAnswer } = useGameStore()

  function handleOnAnswerClick(answer: Answer) {
    if (answer.revealed) {
      hideAnswer(answer.id)
    } else {
      revealAnswer(answer.id)
      playCorrect()
    }
  }

  if (!currentQuestion) {
    return null
  }

  return (
    <div {...props} className={cn('flex flex-col gap-2', className)}>
      {currentQuestion.answers.map((answer, index) => (
        <AnswersListItem
          key={answer.id}
          index={index}
          text={answer.text}
          points={answer.points}
          isRevealed={answer.revealed}
          onClick={() => handleOnAnswerClick(answer)}
        />
      ))}
    </div>
  )
}
