import type { Dispatch } from 'react'
import type { CharClass, GameLocation, Relic, Selection, Villain } from '../types'

export const initialSelection: Selection = {
  villain: null,
  location: null,
  relic: null,
  classes: [],
}

export type SelectionAction =
  | { type: 'setVillain'; id: Villain | null }
  | { type: 'setLocation'; id: GameLocation | null }
  | { type: 'setRelic'; id: Relic | null }
  | { type: 'toggleClass'; id: CharClass }
  | { type: 'reset' }

export function selectionReducer(state: Selection, action: SelectionAction): Selection {
  switch (action.type) {
    case 'setVillain':
      return { ...state, villain: action.id }
    case 'setLocation':
      return { ...state, location: action.id }
    case 'setRelic':
      return { ...state, relic: action.id }
    case 'toggleClass': {
      if (state.classes.includes(action.id)) {
        return { ...state, classes: state.classes.filter((c) => c !== action.id) }
      }
      if (state.classes.length >= 5) return state
      return { ...state, classes: [...state.classes, action.id] }
    }
    case 'reset':
      return initialSelection
  }
}

export type SelectionCtx = {
  sel: Selection
  dispatch: Dispatch<SelectionAction>
}

/** Pieces still needed for a complete selection; empty when the selection is done. */
export function describeMissing(sel: Selection): string[] {
  const missing: string[] = []
  if (!sel.villain) missing.push('a villain')
  if (!sel.location) missing.push('a location')
  if (!sel.relic) missing.push('a relic')
  if (sel.classes.length < 3) {
    const more = 3 - sel.classes.length
    missing.push(`${more} more player${more > 1 ? 's' : ''}`)
  }
  return missing
}

export function isComplete(sel: Selection): boolean {
  return describeMissing(sel).length === 0
}

/** Format ["a villain", "a relic", "2 more players"] -> "a villain, a relic, and 2 more players" */
export function joinMissing(items: string[]): string {
  if (items.length === 0) return ''
  if (items.length === 1) return items[0]
  if (items.length === 2) return `${items[0]} and ${items[1]}`
  return items.join(', ')
}
