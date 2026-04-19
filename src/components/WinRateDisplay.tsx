import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowDown, ArrowUp } from 'lucide-react'
import type { RowStats } from '../types'
import { cn } from '../lib/cn'
import InfoPopover from './InfoPopover'
import { joinMissing } from '../lib/selection'

const DELTA_VISIBLE_MS = 1500

function usePrevious<T>(value: T): T {
  const ref = useRef<T>(value)
  useEffect(() => {
    ref.current = value
  }, [value])
  return ref.current
}

/** Animated number display, similar to countup
 *  Animates from the currently displayed value to `value` whenever `value` changes,
 *  over `duration` seconds, using easeInOutQuad(ratic)
 *  Interrupts if props change in mid-animation */
function AnimatedNumber({
  value,
  duration = 1.2,
  decimals = 1,
  suffix = '', // e.g. '%'
}: {
  value: number
  duration?: number
  decimals?: number
  suffix?: string
}) {
  const [displayed, setDisplayed] = useState(() => Math.max(0, value - 1))
  const displayedRef = useRef(displayed)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    displayedRef.current = displayed
  }, [displayed])

  useEffect(() => {
    const from = displayedRef.current
    const to = value
    const delta = to - from
    if (Math.abs(delta) < 0.01) {
      setDisplayed(to)
      return
    }

    const startTime = performance.now()
    const durationMs = duration * 1000

    const tick = () => {
      const elapsed = performance.now() - startTime
      const p = Math.min(elapsed / durationMs, 1)
      // easeInOutQuad
      const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2
      setDisplayed(from + delta * eased)
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        rafRef.current = null
      }
    }

    if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }
  }, [value, duration])

  return (
    <>
      {displayed.toFixed(decimals)}
      {suffix}
    </>
  )
}

type Props = {
  stats: RowStats | null
  missing: string[]
  isTrainRace: boolean
  isHoard: boolean
}

export default function WinRateDisplay({ stats, missing, isTrainRace, isHoard }: Props) {
  const isComplete = missing.length === 0
  const wr = stats?.wr ?? null
  const prevIsComplete = usePrevious(isComplete)

  // Exponent-style delta indicator, auto-hides after a couple seconds
  const [deltaShown, setDeltaShown] = useState<{ value: number; id: number } | null>(null)
  const lastWrRef = useRef<number | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const idRef = useRef(0)

  useEffect(() => {
    if (wr == null) {
      setDeltaShown(null)
      lastWrRef.current = null
      return
    }
    const last = lastWrRef.current
    if (last != null && Math.abs(wr - last) >= 0.1) {
      idRef.current += 1
      setDeltaShown({ value: wr - last, id: idRef.current })
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => setDeltaShown(null), DELTA_VISIBLE_MS)
    }
    lastWrRef.current = wr
  }, [wr])

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  if (wr == null || stats == null) {
    return (
      <div className="flex flex-col items-center py-10">
        <div
          className="font-germania text-8xl text-taz-parchment-dim tabular transition-[filter] duration-300 ease-in-out"
          style={{ filter: `blur(${missing.length}px)` }}
        >
          ——%
        </div>
        <div className="text-xs uppercase tracking-[0.3em] text-taz-parchment-dim mt-3">
          Choose a deck or class to begin
        </div>
      </div>
    )
  }

  const hue = Math.round((wr * 120) / 100)
  const color = isComplete ? `hsl(${hue}, 75%, 62%)` : 'var(--color-taz-parchment-dim)'
  // Fade colors if going from complete game state to complete game state
  // But, instantly snap to/from muted color when going to/from incomplete game state
  const crossingBoundary = prevIsComplete !== isComplete

  return (
    <div className="flex flex-col items-center py-10">
      <div
        className={cn(
          'relative inline-block font-germania text-8xl tabular leading-none',
          !crossingBoundary && 'transition-[color,filter] duration-300 ease-in-out',
        )}
        style={{
          color,
          filter: `drop-shadow(0 0 24px rgba(0,0,0,0.8)) blur(${missing.length}px)`,
        }}
      >
        <AnimatedNumber value={wr} duration={1.2} decimals={1} suffix="%" />
        <AnimatePresence>
          {deltaShown && (
            <motion.span
              key={deltaShown.id}
              initial={{ opacity: 0, y: deltaShown.value > 0 ? 14 : -14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 0.3, ease: 'easeOut' },
                y: { duration: 0.35, ease: 'easeOut' },
              }}
              className={cn(
                'pointer-events-none absolute -top-1 left-full ml-1 flex items-center gap-0.5 text-sm font-medium tabular leading-none',
                deltaShown.value > 0 ? 'text-emerald-400' : 'text-rose-400',
              )}
            >
              {deltaShown.value > 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
              <span>
                {deltaShown.value > 0 ? '+' : ''}
                {deltaShown.value.toFixed(1)}%
              </span>
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <div className="mt-3 flex items-center gap-2 flex-wrap justify-center px-4 text-center">
        {isComplete ? (
          <span className="text-xs uppercase tracking-[0.3em] text-taz-parchment-dim">
            Estimated win rate
          </span>
        ) : (
          <span className="text-xs uppercase tracking-[0.2em] text-taz-parchment-dim">
            Pick <span className="text-taz-magenta">{joinMissing(missing)}</span>
          </span>
        )}
        <InfoPopover>
          <div className="space-y-2 min-w-[13rem]">
            {!isComplete && (
              <p className="text-taz-parchment-dim pb-1 border-b border-taz-brass/15">
                Average across all configurations that match the current partial selection.
              </p>
            )}
            <div className="space-y-1">
              <PopRow
                label="Range"
                value={`${stats.wrLo.toFixed(1)}%–${stats.wrHi.toFixed(1)}%`}
              />
              <PopRow label="Trials" value={stats.n.toLocaleString()} />
            </div>
            <div className="pt-2 border-t border-taz-brass/15 space-y-1">
              {isTrainRace ? (
                <PopRow
                  label="End-of-location losses"
                  value={`${stats.eolPct.toFixed(1)}%`}
                />
              ) : (
                <>
                  <PopRow label="Villain defeated" value={`${stats.villainPct.toFixed(1)}%`} />
                  <PopRow label="Location cleared" value={`${stats.locationPct.toFixed(1)}%`} />
                </>
              )}
            </div>
            {isHoard && (
              <div className="pt-2 border-t border-taz-brass/15 space-y-1">
                <PopRow label="Nemesis early" value={`${stats.wrNem.toFixed(1)}%`} />
                <PopRow label="Nemesis late" value={`${stats.wrNoNem.toFixed(1)}%`} />
              </div>
            )}
          </div>
        </InfoPopover>
      </div>
    </div>
  )
}

function PopRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-taz-parchment-dim">{label}</span>
      <span className="tabular">{value}</span>
    </div>
  )
}
