import { cn } from '@/utils/cn'

type ButtonProps = React.ComponentProps<'button'> & {
  variant?: 'filled' | 'outlined'
  size?: 'sm' | 'md'
}

export default function Button({
  variant = 'filled',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={props.type || 'button'}
      className={cn(
        'relative flex items-center justify-center overflow-clip rounded-md border-2 border-transparent font-medium',
        'duration-150 enabled:cursor-pointer enabled:transition-transform enabled:active:scale-98',
        size == 'md' && 'h-10 gap-2 px-4 text-sm',
        size == 'sm' && 'h-8 gap-1.5 px-2.5 text-xs',
        variant === 'filled' &&
          'enabled:bg-primary enabled:text-on-primary enabled:hover:bg-primary/90 enabled:active:bg-primary/80 disabled:bg-current/15',
        variant === 'outlined' &&
          'enabled:text-primary enabled:border-current/25 enabled:bg-transparent enabled:hover:bg-current/5 enabled:active:bg-current/10 disabled:border-current/15',
        'disabled:cursor-not-allowed disabled:text-current/50',
        className
      )}
    >
      {children}
    </button>
  )
}
