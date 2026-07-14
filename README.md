# Bet Recovery Calculator

> Professional recovery betting calculator that computes the optimal next stake based on cumulative losses, fixed profit targets, and decimal odds.

[![Deploy](https://github.com/Wembie/bet-recovery-calculator/actions/workflows/deploy.yml/badge.svg)](https://github.com/Wembie/bet-recovery-calculator/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Live:** https://wembie.github.io/bet-recovery-calculator/

---

## Overview

Bet Recovery Calculator is a mathematically transparent tool for computing recovery betting plans. Unlike classic Martingale, every calculation is driven by a fixed profit target formula:

```
Next Stake = (Accumulated Losses + Target Profit) / (Odds − 1)
```

This guarantees that **if any attempt wins**, the net result is always exactly the target profit — regardless of how many losses preceded it.

---

## Features

- **Mathematical transparency** — formula shown, no black boxes
- **Recovery plan table** — sortable, copyable rows with all financial metrics
- **6-metric dashboard** — capital, profit, odds, attempts, largest stake, ROI
- **4 interactive charts** — stake growth, capital, losses, risk evolution
- **History** — auto-saved to LocalStorage, load/duplicate/delete
- **Export** — CSV, Excel (.xlsx), PDF (with charts)
- **Dark/Light mode** — preference saved
- **Multi-currency** — COP, USD, EUR, MXN
- **Configurable formatting** — separators, decimal places
- **Smart alerts** — low odds, high stakes, capital thresholds, too many attempts
- **Fully client-side** — zero backend, works offline

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build | Vite 5 |
| Styling | TailwindCSS + shadcn/ui |
| Animation | Framer Motion |
| Charts | Recharts |
| Forms | React Hook Form + Zod |
| Export | jsPDF + jspdf-autotable + xlsx |
| Testing | Vitest |
| Deploy | GitHub Pages |

---

## Installation

```bash
git clone https://github.com/Wembie/bet-recovery-calculator.git
cd bet-recovery-calculator
npm install
npm run dev
```

Open http://localhost:5173/bet-recovery-calculator/

---

## Usage

1. Enter **Initial Stake** — your first bet amount
2. Enter **Decimal Odds** — must be > 1.00 (e.g. 1.85, 2.50)
3. Enter **Target Profit** — the fixed net gain you want on each recovery
4. Enter **Max Attempts** — how many rows to generate (1–50)
5. Click **Calculate**
6. View the dashboard metrics, table, and charts
7. Export to CSV / Excel / PDF as needed

---

## Math

Given:
- `S₁` = initial stake
- `o` = decimal odds
- `P` = target profit

For attempt `n`:
```
S_n = (ΣS_(1..n-1) + P) / (o - 1)
```

If attempt `n` wins:
```
Net = S_n × o − S_n − ΣS_(1..n-1) = P  ✓
```

---

## Project Structure

```
src/
├── components/       # React components
│   └── ui/          # shadcn/ui primitives
├── pages/           # Page-level components
├── hooks/           # Custom hooks (calculator, history, settings)
├── utils/           # Pure functions (calculations, formatters, exporters)
├── lib/             # Shared utilities (cn)
├── types/           # TypeScript types
├── constants/       # App-wide constants
└── tests/           # Vitest unit tests
```

---

## Testing

```bash
npm test                  # watch mode
npm run test:coverage     # coverage report (>90%)
```

---

## Deployment

Deploys automatically to GitHub Pages on push to `main`.

### GitHub Pages setup
1. Go to repo **Settings → Pages**
2. Set source to **GitHub Actions**
3. Push to `main` — CI handles the rest

---

## Roadmap

- [ ] Multiple recovery strategies (flat, proportional)
- [ ] Bankroll simulator
- [ ] Probability of ruin calculator
- [ ] Odds comparison tool
- [ ] Monte Carlo simulation
- [ ] PWA / offline support

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit with conventional commits
4. Open a Pull Request

---

## License

MIT — see [LICENSE](LICENSE).

## Author

**Wembie**

> This tool is for educational and analytical purposes only. Bet responsibly.
