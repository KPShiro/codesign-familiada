import MenuButton from '@/components/shared/list-item'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-6">
      <div className="flex w-full max-w-md flex-col gap-2">
        <Link href="/host" className="flex-1">
          <MenuButton
            icon={'👑'}
            primaryText="Game Management"
            secondaryText="Only for host"
          />
        </Link>
        <Link href="/board" className="flex-1">
          <MenuButton
            icon={'🎲'}
            primaryText="Game Board"
            secondaryText="View for players and host"
          />
        </Link>
      </div>
    </main>
  )
}
