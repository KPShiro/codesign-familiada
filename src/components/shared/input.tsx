import { cn } from '@/utils/cn'

type InputProps = React.ComponentProps<'input'>

export default function Input({ className, ...props }: InputProps) {
  return (
    <input
      {...props}
      className={cn(
        'h-12 w-full rounded-md border-2 border-current/15 px-4 text-sm outline-none',
        'hover:border-current/25 hover:bg-current/5',
        'focus:border-current focus:bg-current/10',
        'disabled:text-current/50',
        className
      )}
    />
  )
}
