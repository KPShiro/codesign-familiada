import { useGameStore } from '@/lib/store'
import { cn } from '@/utils/cn'

export default function ActiveTeamSwitcher() {
  const { activeTeam, teams, setActiveTeam } = useGameStore()

  return (
    <div className="flex h-12 w-fit gap-1 rounded-md border-2 border-current/15 p-1">
      <button
        type="button"
        onClick={() => setActiveTeam(null)}
        className={cn(
          'flex h-full items-center justify-center rounded-xs px-4 text-sm font-semibold',
          activeTeam === null ? 'bg-primary/25 text-primary' : 'text-current/60'
        )}
      >
        Noone
      </button>
      {([0, 1] as const).map((team, index) => (
        <button
          key={index}
          type="button"
          onClick={() => setActiveTeam(activeTeam === team ? null : team)}
          className={cn(
            'flex h-full items-center justify-center rounded-xs px-4 text-sm font-semibold',
            activeTeam !== null && activeTeam === index
              ? 'bg-primary/25 text-primary'
              : 'text-current/60'
          )}
        >
          &ldquo;{teams[index].name}&rdquo;
        </button>
      ))}
    </div>
  )
}
