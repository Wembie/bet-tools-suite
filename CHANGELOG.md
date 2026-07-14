# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
- GitHub Actions CI/CD pipeline deploying to GitHub Pages
- Vitest unit tests with >90% coverage on math utilities
