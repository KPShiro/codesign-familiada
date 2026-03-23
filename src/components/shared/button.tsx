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
        'enabled:cursor-pointer enabled:transition-transform enabled:duration-75 enabled:active:scale-98',
        'disabled:cursor-not-allowed disabled:text-current/40',
        size == 'md' && 'h-12 gap-2 px-4 text-sm',
        size == 'sm' && 'h-8 gap-1.5 px-2.5 text-xs',
        variant === 'filled' &&
          'enabled:bg-primary enabled:text-on-primary enabled:hover:bg-primary/90 enabled:active:bg-primary/80',
        variant === 'filled' && 'disabled:bg-current/15',
        variant === 'outlined' &&
          'enabled:border-current/15 enabled:bg-current/5 enabled:text-current enabled:hover:border-current/25 enabled:hover:bg-current/10',
        variant === 'outlined' && 'disabled:border-current/15',
        className
      )}
    >
      {children}
    </button>
  )
}
