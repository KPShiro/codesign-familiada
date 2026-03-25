import { cn } from '@/utils/cn'
import { useEffect } from 'react'

type FullscreenToggleProps = Omit<React.ComponentProps<'button'>, 'children'>

export default function FullscreenToggle({
  className,
  ...props
}: FullscreenToggleProps) {
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.body.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen()
      }
    }

    window.addEventListener('keydown', handleKey)

    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <button
      {...props}
      type={props.type || 'button'}
      onClick={toggleFullscreen}
      className={cn(
        'border-primary/50 bg-primary/25 hover:bg-primary/50 cursor-pointer rounded-md border-2 px-3 py-1.5 text-current backdrop-blur',
        'transition-all duration-75 ease-linear active:scale-98',
        className
      )}
    >
      <span className="text-sm font-semibold">Toggle Fullscreen</span>
    </button>
  )
}
