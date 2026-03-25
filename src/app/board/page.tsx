'use client'

import FullscreenToggle from '@/components/board/fullscreen-toggle'
import GameBoard from '@/components/board/game-board'
import { useBroadcastBoard } from '@/lib/broadcast'

export default function BoardPage() {
  useBroadcastBoard()

  return (
    <div className="relative">
      <GameBoard />
      <FullscreenToggle className="fixed right-4 bottom-4 z-50" />
    </div>
  )
}
