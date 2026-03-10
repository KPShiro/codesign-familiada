import { create } from 'zustand'
import questionsData from '@/data/questions.json'

export interface Answer {
  id: number
  text: string
  points: number
  revealed: boolean
}

export interface Question {
  id: number
  text: string
  answers: Answer[]
}

export interface Team {
  name: string
  score: number
}

export interface FastMoneyQuestion {
  id: number
  text: string
  correctAnswer: string
  points: number
}

export interface FastMoneyPlayerAnswer {
  givenAnswer: string
  points: number
  revealed: boolean
}

export type GamePhase = 'idle' | 'playing' | 'steal' | 'round_end' | 'fastmoney'

export interface GameState {
  // Data
  questions: Question[]

  // Current round
  currentQuestionIndex: number | null
  currentQuestion: Question | null
  activeTeam: 0 | 1 | null
  strikes: number
  roundPoints: number
  multiplier: number
  phase: GamePhase

  // Teams
  teams: [Team, Team]

  // Fast Money
  fastMoneyQuestions: FastMoneyQuestion[]
  fastMoneyPlayer1Answers: FastMoneyPlayerAnswer[]
  fastMoneyPlayer2Answers: FastMoneyPlayerAnswer[]
  fastMoneyActivePlayer: 1 | 2 | null
  fastMoneyTotalPoints: number

  // Actions
  loadQuestion: (index: number) => void
  revealAnswer: (answerId: number) => void
  hideAnswer: (answerId: number) => void
  revealAllAnswers: () => void
  addStrike: () => void
  resetStrikes: () => void
  setActiveTeam: (team: 0 | 1 | null) => void
  addRoundPointsToTeam: (team: 0 | 1) => void
  setMultiplier: (n: number) => void
  setPhase: (phase: GamePhase) => void
  setTeamName: (team: 0 | 1, name: string) => void
  setTeamScore: (team: 0 | 1, score: number) => void
  adjustTeamScore: (team: 0 | 1, delta: number) => void
  resetRound: () => void

  // Fast Money actions
  startFastMoney: () => void
  setFastMoneyPlayerAnswer: (player: 1 | 2, index: number, answer: Partial<FastMoneyPlayerAnswer>) => void
  setFastMoneyActivePlayer: (player: 1 | 2 | null) => void
  revealFastMoneyAnswer: (player: 1 | 2, index: number) => void
  revealAllFastMoneyAnswers: (player: 1 | 2) => void
}

const FAST_MONEY_QUESTIONS: FastMoneyQuestion[] = [
  { id: 1, text: 'Podaj popularny kolor samochodu', correctAnswer: 'Czarny', points: 0 },
  { id: 2, text: 'Podaj kraj w Europie', correctAnswer: 'Niemcy', points: 0 },
  { id: 3, text: 'Podaj zwierzę żyjące w lesie', correctAnswer: 'Jeleń', points: 0 },
  { id: 4, text: 'Podaj rzecz na plaży', correctAnswer: 'Piasek', points: 0 },
  { id: 5, text: 'Podaj popularny napój', correctAnswer: 'Woda', points: 0 },
]

const createEmptyFastMoneyAnswers = (): FastMoneyPlayerAnswer[] =>
  FAST_MONEY_QUESTIONS.map(() => ({ givenAnswer: '', points: 0, revealed: false }))

function parseQuestions(data: { id: number; text: string; answers: { id: number; text: string; points: number }[] }[]): Question[] {
  return data.map((q) => ({
    ...q,
    answers: q.answers.map((a) => ({ ...a, revealed: false })),
  }))
}

export const useGameStore = create<GameState>((set, get) => ({
  questions: parseQuestions(questionsData),
  currentQuestionIndex: null,
  currentQuestion: null,
  activeTeam: null,
  strikes: 0,
  roundPoints: 0,
  multiplier: 1,
  phase: 'idle',

  teams: [
    { name: 'Drużyna 1', score: 0 },
    { name: 'Drużyna 2', score: 0 },
  ],

  fastMoneyQuestions: FAST_MONEY_QUESTIONS,
  fastMoneyPlayer1Answers: createEmptyFastMoneyAnswers(),
  fastMoneyPlayer2Answers: createEmptyFastMoneyAnswers(),
  fastMoneyActivePlayer: null,
  fastMoneyTotalPoints: 0,

  loadQuestion: (index) => {
    const q = get().questions[index]
    if (!q) return
    set({
      currentQuestionIndex: index,
      currentQuestion: {
        ...q,
        answers: q.answers.map((a) => ({ ...a, revealed: false })),
      },
      strikes: 0,
      roundPoints: 0,
      phase: 'playing',
      activeTeam: null,
    })
  },

  revealAnswer: (answerId) => {
    const cq = get().currentQuestion
    if (!cq) return
    const updated = {
      ...cq,
      answers: cq.answers.map((a) =>
        a.id === answerId ? { ...a, revealed: true } : a
      ),
    }
    const points = updated.answers.find((a) => a.id === answerId)?.points ?? 0
    set({
      currentQuestion: updated,
      roundPoints: get().roundPoints + points * get().multiplier,
    })
  },

  hideAnswer: (answerId) => {
    const cq = get().currentQuestion
    if (!cq) return
    const answer = cq.answers.find((a) => a.id === answerId)
    if (!answer || !answer.revealed) return
    const pointsToSubtract = answer.points * get().multiplier
    set({
      currentQuestion: {
        ...cq,
        answers: cq.answers.map((a) => (a.id === answerId ? { ...a, revealed: false } : a)),
      },
      roundPoints: Math.max(0, get().roundPoints - pointsToSubtract),
    })
  },

  revealAllAnswers: () => {
    const cq = get().currentQuestion
    if (!cq) return
    set({
      currentQuestion: {
        ...cq,
        answers: cq.answers.map((a) => ({ ...a, revealed: true })),
      },
    })
  },

  addStrike: () => {
    const strikes = Math.min(get().strikes + 1, 3)
    set({ strikes })
    if (strikes >= 3) {
      set({ phase: 'steal' })
    }
  },

  resetStrikes: () => set({ strikes: 0 }),

  setActiveTeam: (team) => set({ activeTeam: team }),

  addRoundPointsToTeam: (team) => {
    const teams = [...get().teams] as [Team, Team]
    teams[team] = { ...teams[team], score: teams[team].score + get().roundPoints }
    set({ teams, roundPoints: 0, phase: 'round_end' })
  },

  setMultiplier: (n) => set({ multiplier: n }),

  setPhase: (phase) => set({ phase }),

  setTeamName: (team, name) => {
    const teams = [...get().teams] as [Team, Team]
    teams[team] = { ...teams[team], name }
    set({ teams })
  },

  setTeamScore: (team, score) => {
    const teams = [...get().teams] as [Team, Team]
    teams[team] = { ...teams[team], score: Math.max(0, score) }
    set({ teams })
  },

  adjustTeamScore: (team, delta) => {
    const teams = [...get().teams] as [Team, Team]
    teams[team] = { ...teams[team], score: Math.max(0, teams[team].score + delta) }
    set({ teams })
  },

  resetRound: () =>
    set({
      currentQuestion: null,
      currentQuestionIndex: null,
      strikes: 0,
      roundPoints: 0,
      multiplier: 1,
      phase: 'idle',
      activeTeam: null,
    }),

  startFastMoney: () =>
    set({
      phase: 'fastmoney',
      fastMoneyPlayer1Answers: createEmptyFastMoneyAnswers(),
      fastMoneyPlayer2Answers: createEmptyFastMoneyAnswers(),
      fastMoneyActivePlayer: 1,
      fastMoneyTotalPoints: 0,
    }),

  setFastMoneyPlayerAnswer: (player, index, answer) => {
    const key = player === 1 ? 'fastMoneyPlayer1Answers' : 'fastMoneyPlayer2Answers'
    const answers = [...get()[key]]
    answers[index] = { ...answers[index], ...answer }
    set({ [key]: answers })
  },

  setFastMoneyActivePlayer: (player) => set({ fastMoneyActivePlayer: player }),

  revealFastMoneyAnswer: (player, index) => {
    const key = player === 1 ? 'fastMoneyPlayer1Answers' : 'fastMoneyPlayer2Answers'
    const answers = [...get()[key]]
    answers[index] = { ...answers[index], revealed: true }
    const total = [
      ...get().fastMoneyPlayer1Answers,
      ...get().fastMoneyPlayer2Answers,
    ]
      .filter((a) => a.revealed || (player === 1 && index >= 0 ? answers[index].revealed : false))
      .reduce((sum, a) => sum + a.points, 0)
    set({ [key]: answers, fastMoneyTotalPoints: calculateFastMoneyTotal(get(), player, index, answers) })
  },

  revealAllFastMoneyAnswers: (player) => {
    const key = player === 1 ? 'fastMoneyPlayer1Answers' : 'fastMoneyPlayer2Answers'
    const answers = get()[key].map((a) => ({ ...a, revealed: true }))
    set({ [key]: answers })
  },
}))

function calculateFastMoneyTotal(
  state: GameState,
  revealedPlayer: 1 | 2,
  revealedIndex: number,
  newAnswers: FastMoneyPlayerAnswer[]
): number {
  const p1 = revealedPlayer === 1 ? newAnswers : state.fastMoneyPlayer1Answers
  const p2 = revealedPlayer === 2 ? newAnswers : state.fastMoneyPlayer2Answers
  return [...p1, ...p2]
    .filter((a) => a.revealed)
    .reduce((sum, a) => sum + a.points, 0)
}

// Serializable snapshot for BroadcastChannel
export type GameSnapshot = Omit<
  GameState,
  | 'loadQuestion'
  | 'revealAnswer'
  | 'hideAnswer'
  | 'revealAllAnswers'
  | 'addStrike'
  | 'resetStrikes'
  | 'setActiveTeam'
  | 'addRoundPointsToTeam'
  | 'setMultiplier'
  | 'setPhase'
  | 'setTeamName'
  | 'setTeamScore'
  | 'adjustTeamScore'
  | 'resetRound'
  | 'startFastMoney'
  | 'setFastMoneyPlayerAnswer'
  | 'setFastMoneyActivePlayer'
  | 'revealFastMoneyAnswer'
  | 'revealAllFastMoneyAnswers'
>

export function getSnapshot(state: GameState): GameSnapshot {
  return {
    questions: state.questions,
    currentQuestionIndex: state.currentQuestionIndex,
    currentQuestion: state.currentQuestion,
    activeTeam: state.activeTeam,
    strikes: state.strikes,
    roundPoints: state.roundPoints,
    multiplier: state.multiplier,
    phase: state.phase,
    teams: state.teams,
    fastMoneyQuestions: state.fastMoneyQuestions,
    fastMoneyPlayer1Answers: state.fastMoneyPlayer1Answers,
    fastMoneyPlayer2Answers: state.fastMoneyPlayer2Answers,
    fastMoneyActivePlayer: state.fastMoneyActivePlayer,
    fastMoneyTotalPoints: state.fastMoneyTotalPoints,
  }
}

export function applySnapshot(snapshot: GameSnapshot): void {
  useGameStore.setState(snapshot)
}
