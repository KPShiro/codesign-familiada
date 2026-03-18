import { cn } from '@/utils/cn'

type InteractiveCardProps = Pick<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'className' | 'onClick' | 'disabled'
> & {
  isSelected?: boolean
}

export default function InteractiveCard({
  children,
  isSelected = false,
  className,
  ...props
}: InteractiveCardProps) {
  return (
    <button
      {...props}
      type="button"
      className={cn(
        'relative w-full border-2 p-4 select-none',
        'rounded-md border-current/10 bg-current/5 enabled:cursor-pointer',
        'disabled:opacity-disabled disabled:cursor-not-allowed',
        isSelected
          ? 'border-primary bg-primary/25 active:bg-primary/35'
          : 'enabled:hover:border-primary enabled:active:bg-current/10',
        className
      )}
    >
      {children}
    </button>
  )
}
