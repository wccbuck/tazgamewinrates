export const VILLAINS = ['lich', 'dragon', 'darklord', 'cult', 'giant', 'crew'] as const
export const LOCATIONS = ['cave', 'tomb', 'carnival', 'temple', 'train', 'race'] as const
export const RELICS = ['staff', 'sash', 'idol', 'sword', 'ring', 'hoard'] as const
export const CLASSES = ['warrior', 'priest', 'wizard', 'rogue', 'bard'] as const

export type Villain = (typeof VILLAINS)[number]
export type GameLocation = (typeof LOCATIONS)[number]
export type Relic = (typeof RELICS)[number]
export type CharClass = (typeof CLASSES)[number]

export type DeckKind = 'villain' | 'location' | 'relic'

export type Selection = {
  villain: Villain | null
  location: GameLocation | null
  relic: Relic | null
  classes: CharClass[]
}

/** 1 = easiest (least skulls), 5 = hardest. null = unknown / not enough data. */
export type SkullRating = 1 | 2 | 3 | 4 | 5

export type RowStats = {
  wr: number
  wrLo: number
  wrHi: number
  turns: number
  turnsStd: number
  winHp: number
  villainPct: number
  locationPct: number
  completePct: number
  eolPct: number
  eolHp: number
  wrNem: number
  wrNoNem: number
  n: number
}
