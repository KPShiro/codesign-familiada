'use client'

import { useEffect, useRef } from 'react'
import { useBroadcastBoard } from '@/lib/broadcast'
import { useGameStore } from '@/lib/store'
import GameBoard from '@/components/board/GameBoard'

export default function BoardPage() {
  useBroadcastBoard()
  const state = useGameStore()
  const containerRef = useRef<HTMLDivElement>(null)

  // Listen for keyboard F for fullscreen
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <GameBoard state={state} />
      {/* Fullscreen button */}
      <button
        onClick={toggleFullscreen}
        className="fixed bottom-4 right-4 z-50 bg-blue-900/80 hover:bg-blue-700 text-blue-300 hover:text-white text-xs px-3 py-1.5 rounded-lg border border-blue-700 transition-all backdrop-blur"
        title="Pełny ekran (F)"
      >
        ⛶ Pełny ekran
      </button>
    </div>
  )
}
