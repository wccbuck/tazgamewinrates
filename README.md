# TAZ Game Win Rates

An interactive win-rate calculator for the board game *The Adventure Zone*. Pick a villain
deck, location deck, relic deck, and a party of 3–5 classes; the estimated win rate updates
as you choose, along with other statistics: average turns to complete, how games tend to
end, and more.

Deployed at <https://wccbuck.github.io/tazgamewinrates>.

## Stack

Vite + React 19 + TypeScript · Tailwind CSS v4 · React Router v7 (HashRouter) · Motion ·
Lucide · Biome.

## Getting started

```bash
npm install
npm run dev
```

`npm run build` typechecks + builds to `dist/`, `npm run deploy` publishes to GitHub Pages.

## Data

`src/data/winrates.json` is keyed by `villain-relic-location-<classes sorted
alphabetically>`, e.g. `lich-staff-cave-bard-priest-rogue-warrior-wizard`. 3,456 rows
total (6 × 6 × 6 deck combos × 16 class combos). Data originates from a separate
simulator (<https://github.com/wccbuck/tazgamesim>); drop any updates into `winrates.json`.

Lookup is in `src/lib/lookup.ts`: exact match for a full selection, aggregate/average for a partial one.

## Deployment notes

Vite `base` is `/tazgamewinrates/`. The app uses `HashRouter` so `/#/about`-style deep
links survive GitHub Pages refreshes. `index.html` includes `<meta
name="darkreader-lock">` to avoid conflicts with darkreader.
