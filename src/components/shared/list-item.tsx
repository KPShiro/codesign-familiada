import { cn } from '@/utils/cn'
import { ChevronRightIcon } from 'lucide-react'

type MenuButtonProps = Pick<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'className' | 'onClick' | 'disabled'
> & {
  primaryText: string
  secondaryText?: string
  icon?: React.ReactNode
}

export default function MenuButton({
  primaryText,
  secondaryText,
  icon,
  className,
  ...props
}: MenuButtonProps) {
  return (
    <button
      {...props}
      type="button"
      className={cn(
        'justify-content group relative flex w-full items-center gap-4 border-2 p-4 pr-5 text-left select-none',
        'rounded-md border-current/15 bg-current/5 enabled:cursor-pointer',
        'enabled:hover:border-primary/40 enabled:hover:bg-primary/10',
        'disabled:opacity-disabled disabled:cursor-not-allowed',
        className
      )}
    >
      {icon ? (
        <div className="flex aspect-square h-14 items-center justify-center rounded-sm bg-current/10">
          {icon}
        </div>
      ) : null}
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <div className="truncate font-semibold">{primaryText}</div>
        {secondaryText ? (
          <p className="truncate text-sm text-current/60">{secondaryText}</p>
        ) : null}
      </div>
      <ChevronRightIcon size={20} className="stroke-current/60" />
    </button>
  )
}
