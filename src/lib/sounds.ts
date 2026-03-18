'use client'

let audioCtx: AudioContext | null = null

function getCtx(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext()
  }
  return audioCtx
}

function playTone(
  frequency: number,
  duration: number,
  type: OscillatorType = 'sine',
  gainValue = 0.3,
  delay = 0
) {
  const ctx = getCtx()
  const oscillator = ctx.createOscillator()
  const gainNode = ctx.createGain()

  oscillator.connect(gainNode)
  gainNode.connect(ctx.destination)

  oscillator.type = type
  oscillator.frequency.setValueAtTime(frequency, ctx.currentTime + delay)

  gainNode.gain.setValueAtTime(0, ctx.currentTime + delay)
  gainNode.gain.linearRampToValueAtTime(
    gainValue,
    ctx.currentTime + delay + 0.01
  )
  gainNode.gain.exponentialRampToValueAtTime(
    0.001,
    ctx.currentTime + delay + duration
  )

  oscillator.start(ctx.currentTime + delay)
  oscillator.stop(ctx.currentTime + delay + duration)
}

// Ding — correct answer
export function playCorrect() {
  playTone(880, 0.15, 'sine', 0.4)
  playTone(1320, 0.3, 'sine', 0.3, 0.1)
}

// Buzz — wrong answer / strike
export function playWrong() {
  const ctx = getCtx()
  const oscillator = ctx.createOscillator()
  const gainNode = ctx.createGain()

  oscillator.connect(gainNode)
  gainNode.connect(ctx.destination)

  oscillator.type = 'square'
  oscillator.frequency.setValueAtTime(120, ctx.currentTime)
  oscillator.frequency.linearRampToValueAtTime(80, ctx.currentTime + 0.4)

  gainNode.gain.setValueAtTime(0.35, ctx.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45)

  oscillator.start(ctx.currentTime)
  oscillator.stop(ctx.currentTime + 0.5)
}

// Reveal — flipping an answer card
export function playReveal() {
  playTone(440, 0.08, 'sine', 0.2)
  playTone(660, 0.08, 'sine', 0.2, 0.08)
  playTone(880, 0.15, 'sine', 0.25, 0.16)
}

// Applause-like success sound
export function playSuccess() {
  for (let i = 0; i < 5; i++) {
    playTone(300 + i * 80, 0.1, 'sine', 0.15, i * 0.07)
  }
}

// Timer tick
export function playTick() {
  playTone(800, 0.05, 'square', 0.1)
}
