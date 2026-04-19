import { type ReactNode, useEffect, useMemo, useRef } from 'react'
import ClassPicker from '../components/ClassPicker'
import DeckColumn from '../components/DeckColumn'
import InfoPopover from '../components/InfoPopover'
import WinRateDisplay from '../components/WinRateDisplay'
import { LOCATION_META, RELIC_META, VILLAIN_META } from '../data/options'
import { useAppContext } from '../lib/app-context'
import { skullsFor } from '../lib/lookup'
import { describeMissing } from '../lib/selection'
import { LOCATIONS, RELICS, VILLAINS } from '../types'

export default function Home() {
  const { sel, dispatch, stats, setHeroVisible } = useAppContext()

  const hasSelection =
    sel.villain !== null ||
    sel.location !== null ||
    sel.relic !== null ||
    sel.classes.length > 0

  const missing = useMemo(() => describeMissing(sel), [sel])

  const villainOptions = VILLAINS.map((id) => ({
    id,
    name: VILLAIN_META[id].name,
    blurb: VILLAIN_META[id].blurb,
    skulls: skullsFor('villain', id),
    expansion: VILLAIN_META[id].expansion,
    imageUrl: VILLAIN_META[id].image,
  }))
  const locationOptions = LOCATIONS.map((id) => ({
    id,
    name: LOCATION_META[id].name,
    blurb: LOCATION_META[id].blurb,
    skulls: skullsFor('location', id),
    expansion: LOCATION_META[id].expansion,
    imageUrl: LOCATION_META[id].image,
  }))
  const relicOptions = RELICS.map((id) => ({
    id,
    name: RELIC_META[id].name,
    blurb: RELIC_META[id].blurb,
    skulls: skullsFor('relic', id),
    expansion: RELIC_META[id].expansion,
    imageUrl: RELIC_META[id].image,
  }))

  const isTrainRace = sel.location === 'train' || sel.location === 'race'
  const isHoard = sel.relic === 'hoard'

  // Observe the hero section so the sticky header can show a mini WR indicator
  // when the main win rate % scrolls off-screen
  const heroRef = useRef<HTMLElement | null>(null)
  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { rootMargin: '-64px 0px 0px 0px', threshold: 0 },
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      // reset on unmount so routes without a hero (e.g. /about) don't leave the
      // header's mini WR stuck on.
      setHeroVisible(true)
    }
  }, [setHeroVisible])

  return (
    <div className="mx-auto max-w-6xl px-6 py-8 space-y-8">
      <section
        ref={heroRef}
        className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] items-center gap-4"
      >
        {/* left spacer keeps WR visually centered on desktop */}
        <div aria-hidden className="hidden md:block" />
        <WinRateDisplay
          stats={stats}
          missing={missing}
          isTrainRace={isTrainRace}
          isHoard={isHoard}
        />
        <div className="flex flex-col gap-2 items-center md:items-end">
          {stats && (
            <>
              <HeroStat
                value={stats.turns.toFixed(1)}
                label="avg turns"
                info={
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-taz-parchment-dim">Typical range</span>
                      <span className="tabular">
                        {(stats.turns - stats.turnsStd).toFixed(1)}–
                        {(stats.turns + stats.turnsStd).toFixed(1)}
                      </span>
                    </div>
                    <p className="text-taz-parchment-dim pt-1">
                      Turns played until the game ends, win or lose. Range spans one standard
                      deviation.
                    </p>
                  </div>
                }
              />
              <HeroStat
                value={stats.winHp.toFixed(1)}
                label="avg win hp"
                info={<p>Team's shared remaining health on games the party wins.</p>}
              />
            </>
          )}
        </div>
      </section>

      <ClassPicker
        classes={sel.classes}
        onToggle={(id) => dispatch({ type: 'toggleClass', id })}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DeckColumn
          title="Villain"
          options={villainOptions}
          selected={sel.villain}
          onSelect={(id) => dispatch({ type: 'setVillain', id })}
        />
        <DeckColumn
          title="Relic"
          options={relicOptions}
          selected={sel.relic}
          onSelect={(id) => dispatch({ type: 'setRelic', id })}
        />
        <DeckColumn
          title="Location"
          options={locationOptions}
          selected={sel.location}
          onSelect={(id) => dispatch({ type: 'setLocation', id })}
        />
      </div>

      {hasSelection && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => dispatch({ type: 'reset' })}
            className="text-xs uppercase tracking-widest text-taz-parchment-dim hover:text-taz-magenta transition-colors"
          >
            Reset all
          </button>
        </div>
      )}
    </div>
  )
}

function HeroStat({
  value,
  label,
  info,
}: {
  value: string
  label: string
  info: ReactNode
}) {
  return (
    <div className="flex items-baseline gap-1.5">
      <span className="font-germania text-2xl tabular text-taz-parchment leading-none">
        {value}
      </span>
      <span className="text-[10px] uppercase tracking-widest text-taz-parchment-dim whitespace-nowrap">
        {label}
      </span>
      <InfoPopover size={12} align="right">
        {info}
      </InfoPopover>
    </div>
  )
}
