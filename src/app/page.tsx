import { cn } from '@/utils/cn'
import Link from 'next/link'
import React from 'react'

type HomeItemProps = Pick<React.HTMLAttributes<HTMLDivElement>, 'className'> & {
  title: string
  description: string
}

function HomeItem({ className, title, description }: HomeItemProps) {
  return (
    <div
      className={cn(
        'flex w-full flex-col rounded-xl border-2 border-current/25 p-10',
        className
      )}
    >
      <h3 className="text-xl font-bold uppercase">{title}</h3>
      <p className="text-current/60">{description}</p>
    </div>
  )
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
      <div className="flex w-full max-w-xl flex-col gap-6 sm:flex-row">
        <Link href="/host">
          <HomeItem title="Host" description="View for Host" />
        </Link>
        <Link href="/board" target="_blank" rel="noopener">
          <HomeItem title="Game" description="View for Players" />
        </Link>
      </div>
    </main>
  )
}
