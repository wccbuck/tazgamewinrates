import winratesData from '../data/winrates.json'
import {
  type CharClass,
  type GameLocation,
  type Relic,
  type RowStats,
  type Selection,
  type SkullRating,
  type Villain,
  VILLAINS,
  LOCATIONS,
  RELICS,
} from '../types'

const winrates = winratesData as Record<string, RowStats>
const rows = Object.entries(winrates).map(([key, stats]) => {
  const parts = key.split('-')
  return {
    key,
    villain: parts[0] as Villain,
    relic: parts[1] as Relic,
    location: parts[2] as GameLocation,
    classes: parts.slice(3) as CharClass[],
    stats,
  }
})

export function makeKey(sel: {
  villain: Villain
  location: GameLocation
  relic: Relic
  classes: CharClass[]
}): string {
  const sortedClasses = [...sel.classes].sort().join('-')
  return `${sel.villain}-${sel.relic}-${sel.location}-${sortedClasses}`
}

export function isFullSelection(sel: Selection): boolean {
  return (
    sel.villain !== null &&
    sel.location !== null &&
    sel.relic !== null &&
    sel.classes.length >= 3 &&
    sel.classes.length <= 5
  )
}

function matchesFilter(
  row: (typeof rows)[number],
  filter: Partial<Selection>,
): boolean {
  if (filter.villain && row.villain !== filter.villain) return false
  if (filter.relic && row.relic !== filter.relic) return false
  if (filter.location && row.location !== filter.location) return false
  if (filter.classes && filter.classes.length > 0) {
    for (const c of filter.classes) {
      if (!row.classes.includes(c)) return false
    }
  }
  return true
}

/**
 * n-weighted aggregate across rows matching the (possibly partial) filter.
 * Returns null if no rows match.
 */
export function getAggregate(filter: Partial<Selection>): RowStats | null {
  const matching = rows.filter((r) => matchesFilter(r, filter))
  if (matching.length === 0) return null

  const totalN = matching.reduce((a, r) => a + r.stats.n, 0)
  if (totalN === 0) return null

  const w = (fn: (s: RowStats) => number) =>
    matching.reduce((a, r) => a + fn(r.stats), 0) / matching.length

  return {
    wr: w((s) => s.wr),
    wrLo: w((s) => s.wrLo),
    wrHi: w((s) => s.wrHi),
    turns: w((s) => s.turns),
    turnsStd: w((s) => s.turnsStd),
    winHp: w((s) => s.winHp),
    villainPct: w((s) => s.villainPct),
    locationPct: w((s) => s.locationPct),
    completePct: w((s) => s.completePct),
    eolPct: w((s) => s.eolPct),
    eolHp: w((s) => s.eolHp),
    wrNem: w((s) => s.wrNem),
    wrNoNem: w((s) => s.wrNoNem),
    n: totalN,
  }
}

/** Exact lookup if fully selected, else n-weighted aggregate over partial filter. */
export function getCurrentStats(sel: Selection): RowStats | null {
  if (isFullSelection(sel)) {
    const key = makeKey({
      villain: sel.villain!,
      location: sel.location!,
      relic: sel.relic!,
      classes: sel.classes,
    })
    const exact = winrates[key]
    if (exact) return exact
  }
  const filter: Partial<Selection> = {}
  if (sel.villain) filter.villain = sel.villain
  if (sel.location) filter.location = sel.location
  if (sel.relic) filter.relic = sel.relic
  if (sel.classes.length > 0) filter.classes = sel.classes
  return getAggregate(filter)
}

/** Skull rating (1 easiest – 5 hardest) for a deck option, from n-weighted avg WR. */
const skullCache = new Map<string, SkullRating | null>()
export function skullsFor(
  kind: 'villain' | 'location' | 'relic',
  id: string,
): SkullRating | null {
  const cacheKey = `${kind}:${id}`
  if (skullCache.has(cacheKey)) return skullCache.get(cacheKey) ?? null

  const filter: Partial<Selection> = {}
  if (kind === 'villain') filter.villain = id as Villain
  if (kind === 'location') filter.location = id as GameLocation
  if (kind === 'relic') filter.relic = id as Relic

  const agg = getAggregate(filter)
  const rating: SkullRating | null = agg
    ? agg.wr >= 80
      ? 1
      : agg.wr >= 70
        ? 2
        : agg.wr >= 60
          ? 3
          : agg.wr >= 50
            ? 4
            : 5
    : null
  skullCache.set(cacheKey, rating)
  return rating
}

// Re-export option lists so components don't need two imports.
export { VILLAINS, LOCATIONS, RELICS }
