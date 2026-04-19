import { AnimatePresence, motion } from 'motion/react'
import { Link, NavLink } from 'react-router-dom'
import { useAppContext, wrColor } from '../lib/app-context'
import { cn } from '../lib/cn'

const navLinkCls = ({ isActive }: { isActive: boolean }) =>
  cn(
    'transition-colors tracking-widest uppercase text-xs',
    isActive ? 'text-taz-brass' : 'text-taz-parchment-dim hover:text-taz-brass',
  )

export default function Header() {
  const { stats, isComplete, heroVisible } = useAppContext()
  const showMiniWR = stats != null && !heroVisible

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-taz-brass/20 bg-taz-ink/90 backdrop-blur-md">
      <div className="mx-auto h-full max-w-6xl px-6 flex items-center gap-4">
        <Link
          to="/"
          className="font-germania text-2xl text-taz-brass tracking-wider shrink-0"
        >
          <span className="text-taz-brass-bright">TAZ</span>
          <span className="text-taz-parchment-dim mx-2">·</span>
          <span className="sm:hidden">WR</span>
          <span className="hidden sm:inline">Win Rates</span>
        </Link>
        <div className="flex-1 flex justify-center min-w-0">
          <AnimatePresence>
            {showMiniWR && stats && (
              <motion.div
                key="mini-wr"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="font-germania text-2xl tabular leading-none"
                style={{ color: wrColor(stats.wr, isComplete) }}
                aria-label={`Current win rate ${stats.wr.toFixed(1)}%`}
              >
                {stats.wr.toFixed(1)}%
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <nav className="flex gap-6 sm:gap-8 shrink-0">
          <NavLink to="/" className={navLinkCls} end>
            Calculator
          </NavLink>
          <NavLink to="/about" className={navLinkCls}>
            About
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
