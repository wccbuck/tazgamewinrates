import { motion } from 'motion/react'
import type { SkullRating } from '../types'
import { cn } from '../lib/cn'
import skullUrl from '../assets/skull.svg'

type Props = {
  name: string
  blurb: string
  // undefined = no skull area; null = rating unknown; 1–5 = that many skulls
  skulls?: SkullRating | null
  expansion?: boolean
  selected: boolean
  disabled?: boolean
  // for challenge decks
  imageUrl?: string
  // for classes
  iconUrl?: string
  onClick: () => void
}

export default function DeckCard({
  name,
  blurb,
  skulls,
  expansion,
  selected,
  disabled,
  imageUrl,
  iconUrl,
  onClick,
}: Props) {
  const interactive = !disabled

  return (
    <motion.button
      type="button"
      onClick={interactive ? onClick : undefined}
      disabled={disabled}
      whileHover={interactive ? { rotateX: -3, rotateY: 3, y: -3 } : undefined}
      whileTap={interactive ? { scale: 0.97 } : undefined}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      style={{ transformStyle: 'preserve-3d', perspective: '800px' }}
      className={cn(
        'group relative p-3 text-left rounded-lg border',
        'bg-gradient-to-b from-taz-ink/80 to-taz-night/80',
        'transition-colors',
        interactive ? 'cursor-pointer' : 'cursor-not-allowed opacity-40',
        selected
          ? 'border-taz-brass shadow-[0_0_0_1px_rgba(230,184,84,0.6),0_0_28px_-4px_rgba(214,70,125,0.45)]'
          : 'border-taz-brass/15 hover:border-taz-brass/50',
      )}
    >
      {imageUrl && (
        <div
          className={cn(
            'absolute inset-y-0 right-0 w-3/5 bg-cover bg-center rounded-r-lg pointer-events-none transition-opacity duration-300',
            selected ? 'opacity-60' : 'opacity-10',
          )}
          style={{
            backgroundImage: `url(${imageUrl})`,
            maskImage: 'linear-gradient(to left, black 35%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to left, black 35%, transparent 100%)',
          }}
          aria-hidden
        />
      )}

      {iconUrl && (
        <div
          className={cn(
            'absolute inset-0 flex items-center justify-end pr-4 pointer-events-none transition-opacity duration-300',
            selected ? 'opacity-25' : 'opacity-5',
          )}
          aria-hidden
        >
          <img src={iconUrl} alt="" className="w-16 h-16 object-contain" />
        </div>
      )}

      <div className="relative z-[1] flex flex-col gap-2 w-full">
        <div className="flex items-center justify-between gap-2 h-5">
          <h3 className="font-germania text-2xl text-taz-parchment tracking-wide leading-none">
            {name}
          </h3>
          {expansion && (
            <span className="group/koabd relative flex items-center flex-shrink-0">
              <span className="text-[10px] uppercase tracking-[0.15em] text-taz-parchment-dim font-semibold whitespace-nowrap leading-none">
                KOABD
              </span>
              <span
                role="tooltip"
                className="absolute top-full right-0 mt-2 z-20 w-max max-w-[14rem] rounded-md border border-taz-brass/30 bg-taz-ink/95 backdrop-blur px-2.5 py-1.5 text-[11px] leading-snug text-taz-parchment shadow-xl opacity-0 pointer-events-none transition-opacity duration-150 group-hover/koabd:opacity-100 group-focus-visible:opacity-100"
              >
                From the "Kind of a Big Deal" expansion
              </span>
            </span>
          )}
        </div>

        <div className="flex items-end justify-between gap-2">
          <div className="flex-1 flex flex-col justify-end min-h-[2lh]">
            <p className="text-xs text-taz-parchment-dim leading-snug whitespace-pre-line line-clamp-2 drop-shadow-[0_0_2px_rgba(0,0,0,1)]">
              {blurb}
            </p>
          </div>
          {skulls != null && skulls > 0 && (
            <div
              className="flex gap-0.5 flex-shrink-0 pb-0.5 drop-shadow-[0_0_2px_rgba(0,0,0,1)]"
              aria-label={`Difficulty: ${skulls} of 5`}
            >
              {Array.from({ length: skulls }).map((_, i) => (
                <img
                  key={i}
                  src={skullUrl}
                  alt=""
                  width={14}
                  height={14}
                  className="opacity-90"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.button>
  )
}
