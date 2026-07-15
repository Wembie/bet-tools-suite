# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.7] - 2026-07-15

### Added
- **Ruin Calculator** — new third tool: bankroll ruin probability analysis
  - Inputs: bankroll, stake per bet, decimal odds, estimated win rate %
  - Outputs: ruin probability (Cramér-Lundberg exponential approximation), max consecutive losses, break-even win rate, EV per bet, Kelly criterion stake recommendation
  - Survival curve chart via Recharts AreaChart showing P(bankroll > 0) over N bets (reflection-principle approximation)
  - Edge indicator banner (positive / negative EV warning)
  - Color-coded metrics: red for high ruin risk, green for positive edge, amber for losses
  - `src/utils/ruin.ts` — pure math: `normCDF`, `calculateRuin`
  - `src/hooks/useRuin.ts`
  - `src/components/RuinCalculator.tsx`, `RuinDashboard.tsx`, `RuinChart.tsx`
  - `src/pages/RuinPage.tsx` with Calculator / Results tabs
- `src/types/index.ts`: `RuinInputs`, `RuinResult`, `RuinPoint`
- i18n: `ruin.*` namespace in `en.json` and `es.json`
- Validation keys: `maxWinRate`, `stakeExceedsBankroll` in both locales

### Changed
- `Landing.tsx`: added third Ruin card (red/orange theme), grid expanded to `lg:grid-cols-3`
- `Home.tsx`: `Mode` union extended to include `'ruin'`, `RuinPage` wired in

## [1.0.6] - 2026-07-14

### Changed
- Ultra-premium visual redesign: casino + sports gambling aesthetic across the entire app
- `Landing.tsx` fully rewritten: live sports ticker (scrolling match scores with LIVE badges), floating sport emojis (⚽🏀🥊🏈🎾🏒⚾🏆) alongside casino chips, sport category pills strip, live odds board widget (sample featured match), enhanced mode cards with animated gradient borders, stats mini-bar inside each card, shimmer CTA button
- `index.css`: new utility classes — `neon-gold`, `neon-purple`, `neon-green` text glow, `grid-overlay` dot grid background, `odds-cell`/`odds-cell-active` interactive odds buttons, `holo-wrap` holographic animated border, `sport-pill`, `input-premium`
- `tailwind.config.js`: new keyframes (`float-slow`, `gradient-border`, `scroll-x`, `neon-breathe`, `flicker`, `bounce-sport`, `odds-flip`, `sweep`, `rotate-hue`, `particle-rise`), new gradient variants (`gradient-gold-h`, `gradient-fire`, `gradient-holo`, `gradient-sport`, `grid-lines`, `odds-board`), expanded neon shadows
- `RecoveryPage.tsx`, `EscaleraPage.tsx`: darker unified background (`#04040c`), grid overlay, larger multi-color ambient glows, i18n-translated empty states, upgraded empty state visuals
- `en.json`, `es.json`: added `recovery.*` and `escalera.*` namespace keys for empty states

## [1.0.5] - 2026-07-13

### Added
- i18n support for English and Spanish via `react-i18next` + `i18next-browser-languagedetector`
- Translation files at `src/locales/en.json` and `src/locales/es.json` covering all UI surfaces
- Language toggle button in Header (EN ↔ ES), persisted to `localStorage` key `bet-tools-lang`
- Language auto-detected from browser preferences on first visit

### Changed
- All user-facing strings in 12 components and 1 page now use `t()` — labels, hints, table headers, alerts, settings, export buttons, dashboard metrics, staircase dashboard/table
- `AlertInfo` type: `message: string` replaced by `messageKey: string` + optional `params` for interpolation
- `generateAlerts()` in `calculations.ts` now returns translation keys with params instead of hardcoded English strings
- Zod schema error messages now use translation keys (`validation.*`) so form errors translate automatically

## [1.0.4] - 2026-07-13

### Changed
- Renamed repository from `bet-recovery-calculator` to `bet-tools-suite` to reflect multi-tool scope
- Renamed app from `Bet Recovery Calculator` to `Bet Tools Suite` across all surfaces
- Updated `vite.config.ts` base path to `/bet-tools-suite/` (fixes GitHub Pages deployment URL)
- Updated `package.json` and `package-lock.json` name field
- Updated `APP_NAME` constant, `index.html` title and meta description, README heading and description
- Updated GitHub URL in constants, README badges, live URL, clone instructions, and CONTRIBUTING setup guide
- Renamed LocalStorage keys from `bet-recovery-*` to `bet-tools-*` (existing saved history/settings will not migrate automatically)
- Renamed export filenames from `bet-recovery-*.{csv,xlsx,pdf}` to `bet-tools-*.{csv,xlsx,pdf}`
- Fixed workflow names in `ci.yml` and `cd.yml` (still referenced old app name)
- Added `CLAUDE.md` to `.gitignore`
- Documented full version history in CHANGELOG (1.0.0 through 1.0.3 entries added)

## [1.0.3] - 2026-07-13

### Changed
- Full architecture overhaul: Home.tsx is now a clean router between isolated calculator pages
- Landing redesigned as mode chooser with floating casino chips, card suits, and ambient glows
- Recovery Calculator and Escalera Calculator each moved to dedicated pages (`RecoveryPage`, `EscaleraPage`) with own tab navigation and back-to-menu navigation
- Two premium entry cards replace the previous single-tool layout

## [1.0.2] - 2026-07-13

### Added
- Reto Escalera calculator mode: new dedicated calculator for escalating bet recovery strategies

## [1.0.1] - 2026-07-13

### Added
- Premium gambling-themed visual redesign: dark casino aesthetic with gold accents across all components

### Fixed
- Replaced `xlsx` with `write-excel-file/browser` to eliminate prototype pollution and ReDoS vulnerabilities
- Upgraded `jspdf` to 4.2.1 and `jspdf-autotable` to 5.x to patch DOMPurify vulnerability chain
- Upgraded Vite 5→8 and Vitest 2→4 to eliminate all remaining dependency vulnerabilities
- Resolved ESLint errors that were blocking CI pipeline

### Changed
- CI/CD: upgraded Node.js 20→24 in GitHub Actions workflows
- Removed deprecated `baseUrl` from `tsconfig.json` (TypeScript 6 migration)

## [1.0.0] - 2026-07-13

### Added
- Core recovery calculator with formula: `(Losses + Profit) / (Odds - 1)`
- 6-metric dashboard (capital, profit, odds, attempts, largest stake, ROI)
- Sortable, copyable recovery table with 8 columns
- 4 interactive charts: stake growth, capital, losses, risk evolution
- Calculation history with LocalStorage persistence
- Export to CSV, Excel (.xlsx), PDF
- Dark/light theme toggle with persistence
- Multi-currency support: COP, USD, EUR, MXN
- Configurable thousands separator and decimal places
- Smart alerts for low odds, high stakes, capital, and attempt thresholds
- `VERSION` file as single source of truth for app version, injected at build time via `vite.config.ts`
- Version badge displayed in Header, version string in PDF export footer
- GitHub Actions CI/CD: PR validation (blocks merge if VERSION not bumped, type-check, lint, test, build) and CD deploy to GitHub Pages with auto-tagging and GitHub Release on version change
- 40 Vitest unit tests with >90% coverage on math utilities
