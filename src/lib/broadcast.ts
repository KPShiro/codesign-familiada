'use client'

import { useEffect, useRef } from 'react'
import { useGameStore, getSnapshot, applySnapshot, GameState } from './store'

const CHANNEL_NAME = 'familiada-game'

type BroadcastMessage = {
  type: 'STATE_UPDATE'
  payload: ReturnType<typeof getSnapshot>
}

// Hook for the HOST — subscribes to store changes and broadcasts them
export function useBroadcastHost() {
  const channelRef = useRef<BroadcastChannel | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const channel = new BroadcastChannel(CHANNEL_NAME)
    channelRef.current = channel

    // Subscribe to store and send updates
    const unsub = useGameStore.subscribe((state: GameState) => {
      const msg: BroadcastMessage = {
        type: 'STATE_UPDATE',
        payload: getSnapshot(state),
      }
      channel.postMessage(msg)
    })

    return () => {
      unsub()
      channel.close()
    }
  }, [])
}

// Hook for the BOARD — listens for broadcasts and applies them
export function useBroadcastBoard() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    const channel = new BroadcastChannel(CHANNEL_NAME)

    channel.onmessage = (event: MessageEvent<BroadcastMessage>) => {
      if (event.data?.type === 'STATE_UPDATE') {
        applySnapshot(event.data.payload)
      }
    }

    return () => {
      channel.close()
    }
  }, [])
}
