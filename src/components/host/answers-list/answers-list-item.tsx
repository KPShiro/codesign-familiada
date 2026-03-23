import { cn } from '@/utils/cn'

type AnswersListItemProps = Omit<React.ComponentProps<'button'>, 'children'> & {
  index: number
  text: string
  points: number
  isRevealed: boolean
}

export default function AnswersListItem({
  index,
  text,
  points,
  isRevealed,
  className,
  ...props
}: AnswersListItemProps) {
  return (
    <button
      {...props}
      type="button"
      className={cn(
        'rounded-sm border-2 px-4 py-3 transition-transform duration-75 ease-linear',
        'hover:scale-101 active:scale-100',
        isRevealed
          ? 'border-primary/60 bg-primary/20'
          : 'border-current/15 bg-current/5 hover:border-current/25 hover:bg-current/10',
        className
      )}
    >
      <div className="flex items-center gap-4">
        <span className="text-sm text-current/60">
          {index < 9 ? '0' + (index + 1) : index + 1}
        </span>
        <span className="flex-1 text-left">{text}</span>
        <span className="text-sm">
          {points} {points > 1 ? 'points' : 'point'}
        </span>
      </div>
    </button>
  )
}
