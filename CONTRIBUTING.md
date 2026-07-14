# Contributing

## Development Setup

```bash
git clone https://github.com/Wembie/bet-recovery-calculator.git
cd bet-recovery-calculator
npm install
npm run dev
```

## Code Standards

- **TypeScript strict mode** — no `any`, no unused vars
- **ESLint + Prettier** — run `npm run lint` and `npm run format` before committing
- **No backend** — everything client-side
- **Tests required** — add Vitest tests for any new utility functions
- **Conventional Commits** — `feat:`, `fix:`, `refactor:`, `docs:`, `test:`

## Pull Request Process

1. Fork and create a feature branch from `main`
2. Write tests for new logic
3. Ensure `npm test -- --run` passes
4. Ensure `npm run build` succeeds
5. Open a PR with a clear description

## Architecture Rules

- Logic lives in `src/utils/` — pure functions, no React imports
- React state lives in `src/hooks/` — no business logic, only state management
- UI lives in `src/components/` — no business logic
- Types live in `src/types/index.ts`
- Constants live in `src/constants/index.ts`

## Reporting Issues

Open an issue on GitHub with reproduction steps, expected behavior, and actual behavior.
