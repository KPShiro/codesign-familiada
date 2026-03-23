import { useGameStore } from '@/lib/store'
import { cn } from '@/utils/cn'
import QuestionsListItem from './questions-list-item'

type QuestionsListProps = Omit<React.ComponentProps<'div'>, 'children'>

export default function QuestionsList({
  className,
  ...props
}: QuestionsListProps) {
  const { questions, currentQuestion, loadQuestion } = useGameStore()

  return (
    <div {...props} className={cn('flex flex-col gap-2', className)}>
      {questions.map((question, index) => (
        <QuestionsListItem
          key={question.id}
          index={index}
          text={question.text}
          isSelected={question.id === currentQuestion?.id}
          onClick={() => loadQuestion(index)}
        />
      ))}
    </div>
  )
}
