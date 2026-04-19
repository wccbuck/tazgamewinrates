import { type Dispatch, createContext, useContext } from 'react'
import type { RowStats, Selection } from '../types'
import type { SelectionAction } from './selection'

/** App-level state shared between Header, Home, and anywhere else under the App shell.
 *  Owning stats + isComplete here means the sticky Header can render a mini WR
 *  indicator when the main WR is scrolled off-screen. */
export type AppContextValue = {
  sel: Selection
  dispatch: Dispatch<SelectionAction>
  stats: RowStats | null
  isComplete: boolean
  /** True when the main WR display is at least partially in the viewport. */
  heroVisible: boolean
  setHeroVisible: (v: boolean) => void
}

export const AppContext = createContext<AppContextValue | null>(null)

export function useAppContext(): AppContextValue {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useAppContext must be used within AppContext.Provider')
  return ctx
}

/** Colour used for both the main WR number and the header mini-WR, so they match. */
export function wrColor(wr: number, isComplete: boolean): string {
  if (!isComplete) return 'var(--color-taz-parchment-dim)'
  const hue = Math.round((wr * 120) / 100)
  return `hsl(${hue}, 75%, 62%)`
}
