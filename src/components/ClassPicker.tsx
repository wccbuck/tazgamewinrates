import DeckCard from './DeckCard'
import { type CharClass, CLASSES } from '../types'
import { CLASS_META } from '../data/options'

type Props = {
  classes: CharClass[]
  onToggle: (id: CharClass) => void
}

export default function ClassPicker({ classes, onToggle }: Props) {
  const count = classes.length
  const hint =
    count < 3
      ? `Pick ${3 - count} more player${3 - count > 1 ? 's' : ''} to reach the minimum party size`
      : count > 5 // shouldn't be possible
        ? 'Too many players'
        : null

  return (
    <section className="flex flex-col gap-3">
      <header className="flex items-baseline justify-between">
        <h2 className="font-germania text-2xl text-taz-brass tracking-wider uppercase">
          Party
        </h2>
        <span className="text-xs text-taz-parchment-dim">
          {count}/3–5 players
        </span>
      </header>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {CLASSES.map((id) => {
          const meta = CLASS_META[id]
          const selected = classes.includes(id)
          const disabled = !selected && count >= 5
          return (
            <DeckCard
              key={id}
              name={meta.name}
              blurb={meta.blurb}
              iconUrl={meta.icon}
              selected={selected}
              disabled={disabled}
              onClick={() => onToggle(id)}
            />
          )
        })}
      </div>
      {hint && <p className="text-xs text-taz-parchment-dim italic">{hint}</p>}
    </section>
  )
}
