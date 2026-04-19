import type { SkullRating } from '../types'
import DeckCard from './DeckCard'

export type DeckOption<T extends string> = {
  id: T
  name: string
  blurb: string
  skulls: SkullRating | null
  expansion: boolean
  imageUrl?: string
}

type Props<T extends string> = {
  title: string
  options: DeckOption<T>[]
  selected: T | null
  onSelect: (id: T | null) => void
}

export default function DeckColumn<T extends string>({
  title,
  options,
  selected,
  onSelect,
}: Props<T>) {
  return (
    <section className="flex flex-col gap-3">
      <header className="flex items-baseline justify-between">
        <h2 className="font-germania text-2xl text-taz-brass tracking-wider uppercase">
          {title}
        </h2>
        {selected && (
          <button
            type="button"
            onClick={() => onSelect(null)}
            className="text-[10px] uppercase tracking-widest text-taz-parchment-dim hover:text-taz-brass transition-colors"
          >
            Clear
          </button>
        )}
      </header>
      <div className="flex flex-col gap-2">
        {[...options.filter((o) => !o.expansion), ...options.filter((o) => o.expansion)].map(
          (opt) => (
            <DeckCard
              key={opt.id}
              name={opt.name}
              blurb={opt.blurb}
              skulls={opt.skulls}
              expansion={opt.expansion}
              imageUrl={opt.imageUrl}
              selected={selected === opt.id}
              onClick={() => onSelect(selected === opt.id ? null : opt.id)}
            />
          ),
        )}
      </div>
    </section>
  )
}
