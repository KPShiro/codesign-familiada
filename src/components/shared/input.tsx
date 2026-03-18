import { cn } from '@/utils/cn'

type InputProps = React.ComponentProps<'input'>

export default function Input({ className, ...props }: InputProps) {
  return (
    <input
      {...props}
      className={cn(
        'h-10 min-w-0 rounded-md border-2 border-current/15 bg-current/5 px-4 text-sm',
        'disabled:text-current/50',
        className
      )}
    />
  )
}
