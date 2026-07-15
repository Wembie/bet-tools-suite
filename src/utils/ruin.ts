import type { RuinInputs, RuinResult, RuinPoint } from '@/types'

// Abramowitz & Stegun approximation for standard normal CDF, max error ~1.5e-7
function normCDF(x: number): number {
  const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741
  const a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911
  const sign = x < 0 ? -1 : 1
  const ax = Math.abs(x) / Math.sqrt(2)
  const t = 1 / (1 + p * ax)
  const y = 1 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-ax * ax)
  return 0.5 * (1 + sign * y)
}

export function calculateRuin(inputs: RuinInputs): RuinResult {
  const { bankroll, stake, odds, winRate } = inputs
  const p = winRate / 100
  const q = 1 - p

  // Per-bet stats in units of stake
  const mu = p * (odds - 1) - q          // expected gain per bet
  const eX2 = p * Math.pow(odds - 1, 2) + q * 1
  const sigma2 = Math.max(1e-12, eX2 - mu * mu)
  const sigma = Math.sqrt(sigma2)

  const N = bankroll / stake              // bankroll in stake units

  const breakEvenWinRate = (1 / odds) * 100
  const maxConsecutiveLosses = Math.floor(bankroll / stake)
  const evPerBetPct = mu * 100

  // Kelly criterion
  const rawKelly = mu / (odds - 1)
  const kellyFraction = Math.max(0, rawKelly)
  const kellyStake = kellyFraction * bankroll

  // Ruin probability — Cramér-Lundberg exponential approximation
  let ruinProbability: number
  if (mu <= 0) {
    ruinProbability = 1.0
  } else {
    ruinProbability = Math.exp(-2 * mu * N / sigma2)
    ruinProbability = Math.min(1, Math.max(0, ruinProbability))
  }

  // Survival curve via reflection-principle approximation
  const maxBets = Math.min(2000, maxConsecutiveLosses * 15 + 50)
  const numPoints = 80
  const step = Math.max(1, Math.floor(maxBets / numPoints))
  const survivalCurve: RuinPoint[] = []

  for (let n = step; n <= maxBets; n += step) {
    let survivalProb: number
    const sqrtN = Math.sqrt(n)
    const term1 = normCDF((N + n * mu) / (sigma * sqrtN))
    const reflectionFactor = mu > 0
      ? Math.exp(-2 * mu * N / sigma2)
      : Math.exp(2 * Math.abs(mu) * N / sigma2)   // large but capped
    const term2 = Math.min(1e10, reflectionFactor) * normCDF((-N + n * mu) / (sigma * sqrtN))
    survivalProb = Math.max(0, Math.min(1, term1 - term2))
    survivalCurve.push({ bets: n, survivalProbability: Number((survivalProb * 100).toFixed(2)) })
  }

  return {
    bankroll,
    stake,
    odds,
    winRate,
    maxConsecutiveLosses,
    breakEvenWinRate: Number(breakEvenWinRate.toFixed(2)),
    evPerBetPct: Number(evPerBetPct.toFixed(3)),
    kellyFraction: Number((kellyFraction * 100).toFixed(2)),
    kellyStake: Number(kellyStake.toFixed(2)),
    ruinProbability: Number((ruinProbability * 100).toFixed(2)),
    survivalCurve,
  }
}
