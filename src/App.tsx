import { useMemo, useReducer, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import { AppContext, type AppContextValue } from './lib/app-context'
import { getCurrentStats } from './lib/lookup'
import { describeMissing, initialSelection, selectionReducer } from './lib/selection'

export default function App() {
  const [sel, dispatch] = useReducer(selectionReducer, initialSelection)
  const [heroVisible, setHeroVisible] = useState(true)

  const hasSelection =
    sel.villain !== null ||
    sel.location !== null ||
    sel.relic !== null ||
    sel.classes.length > 0

  const stats = useMemo(
    () => (hasSelection ? getCurrentStats(sel) : null),
    [sel, hasSelection],
  )
  const isComplete = useMemo(() => describeMissing(sel).length === 0, [sel])

  const value: AppContextValue = {
    sel,
    dispatch,
    stats,
    isComplete,
    heroVisible,
    setHeroVisible,
  }

  return (
    <AppContext.Provider value={value}>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <footer className="border-t border-taz-brass/10 py-4 text-center text-xs text-taz-parchment-dim">
          Simulated data · created by <a
            href="https://github.com/wccbuck"
            target="_blank"
            rel="noopener noreferrer"
            className="text-taz-brass hover:text-taz-brass-bright underline decoration-taz-brass/40 hover:decoration-taz-brass-bright underline-offset-2 transition-colors"
          >
            wccbuck
          </a>
        </footer>
      </div>
    </AppContext.Provider>
  )
}
