import { cn } from '@/utils/cn'
import { ChevronRightIcon } from 'lucide-react'

type QuestionsListItemProps = Omit<
  React.ComponentProps<'button'>,
  'type' | 'children'
> & {
  index: number
  text: string
  isSelected: boolean
}

export default function QuestionsListItem({
  index,
  text,
  isSelected,
  className,
  ...props
}: QuestionsListItemProps) {
  return (
    <button
      {...props}
      type="button"
      className={cn(
        'flex w-full items-center gap-3 rounded-md border-2 px-4 py-3 transition-transform duration-75 ease-linear',
        'hover:scale-101 active:scale-100',
        isSelected
          ? 'border-primary/60 bg-primary/20'
          : 'border-current/15 bg-current/5 hover:border-current/25 hover:bg-current/10',
        className
      )}
    >
      <span className="text-current/60">
        {index < 9 ? '0' + (index + 1) : index + 1}
      </span>
      <span className="flex-1 truncate text-left">{text}</span>
      <ChevronRightIcon size={16} className="text-current/60" />
    </button>
  )
}
