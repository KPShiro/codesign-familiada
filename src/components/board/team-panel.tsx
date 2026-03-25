import { useGameStore } from '@/lib/store'
import { cn } from '@/utils/cn'

type TeamPanelProps = Omit<React.ComponentProps<'div'>, 'children'> & {
  teamId: 0 | 1
}

export default function TeamPanel({
  teamId,
  className,
  ...props
}: TeamPanelProps) {
  const { teams, activeTeam } = useGameStore()

  const isActive = activeTeam === teamId

  return (
    <div
      {...props}
      className={cn(
        'flex items-center justify-center p-[4vmin] transition-colors duration-300 ease-linear',
        isActive ? 'bg-primary/25' : 'bg-current/2',
        className
      )}
    >
      <div
        className={cn(
          'flex flex-col items-center justify-center gap-[1vmin] transition-transform duration-300 ease-linear',
          isActive ? 'scale-120 text-current' : 'text-current/60'
        )}
      >
        <div className="w-full truncate text-center text-[2vmin] font-bold uppercase">
          {teams[teamId].name}
        </div>
        <div className="font-mono text-[6vmin] leading-none font-black">
          {teams[teamId].score}
        </div>
      </div>
    </div>
  )
}
