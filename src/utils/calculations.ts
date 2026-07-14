import type {
  CalculatorInputs,
  CalculationResult,
  RecoveryRow,
  AlertInfo,
  AppSettings,
} from '@/types'
import { ODDS_WARNING_THRESHOLD } from '@/constants'

export function calculateNextStake(
  accumulatedLoss: number,
  targetProfit: number,
  odds: number,
): number {
  if (odds <= 1) return 0
  return (accumulatedLoss + targetProfit) / (odds - 1)
}

export function calculateCapital(rows: RecoveryRow[]): number {
  return rows.reduce((sum, row) => sum + row.stake, 0)
}

export function calculateProfit(stake: number, odds: number): number {
  return stake * (odds - 1)
}

export function calculateROI(profit: number, capital: number): number {
  if (capital === 0) return 0
  return (profit / capital) * 100
}

export function calculateGrossReturn(stake: number, odds: number): number {
  return stake * odds
}

export function calculateRecovery(inputs: CalculatorInputs): CalculationResult {
  const { initialStake, odds, targetProfit, maxAttempts } = inputs
  const rows: RecoveryRow[] = []
  let accumulatedLoss = 0
  let totalCapital = 0

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const stake =
      attempt === 1
        ? initialStake
        : calculateNextStake(accumulatedLoss, targetProfit, odds)

    const grossReturn = calculateGrossReturn(stake, odds)
    const netProfit = grossReturn - stake - accumulatedLoss
    totalCapital += stake
    const roi = calculateROI(targetProfit, totalCapital)

    rows.push({
      attempt,
      stake,
      accumulatedLoss,
      totalCapital,
      grossReturn,
      netProfit,
      roi,
      expectedResult: `Win +${targetProfit.toFixed(2)}`,
    })

    accumulatedLoss += stake
  }

  const requiredCapital = calculateCapital(rows)
  const largestStake = Math.max(...rows.map(r => r.stake))
  const expectedROI = calculateROI(targetProfit, requiredCapital)

  return {
    rows,
    requiredCapital,
    targetProfit,
    odds,
    attempts: maxAttempts,
    largestStake,
    expectedROI,
  }
}

export function validateInputs(inputs: Partial<CalculatorInputs>): string[] {
  const errors: string[] = []

  if (!inputs.initialStake || inputs.initialStake <= 0) {
    errors.push('Initial stake must be greater than 0')
  }

  if (!inputs.odds || inputs.odds <= 1) {
    errors.push('Odds must be greater than 1.00')
  }

  if (!inputs.targetProfit || inputs.targetProfit <= 0) {
    errors.push('Target profit must be greater than 0')
  }

  if (!inputs.maxAttempts || inputs.maxAttempts < 1 || inputs.maxAttempts > 50) {
    errors.push('Max attempts must be between 1 and 50')
  }

  return errors
}

export function generateAlerts(
  result: CalculationResult,
  settings: AppSettings,
): AlertInfo[] {
  const alerts: AlertInfo[] = []

  if (result.odds < ODDS_WARNING_THRESHOLD) {
    alerts.push({
      type: 'warning',
      messageKey: 'validation.lowOdds',
      params: { odds: result.odds },
    })
  }

  if (result.largestStake > settings.maxStakeAlert) {
    alerts.push({
      type: 'warning',
      messageKey: 'validation.stakeThreshold',
      params: { stake: result.largestStake.toFixed(2), threshold: settings.maxStakeAlert },
    })
  }

  if (result.requiredCapital > settings.maxCapitalAlert) {
    alerts.push({
      type: 'error',
      messageKey: 'validation.capitalThreshold',
      params: { capital: result.requiredCapital.toFixed(2), threshold: settings.maxCapitalAlert },
    })
  }

  if (result.attempts > settings.maxAttemptsAlert) {
    alerts.push({
      type: 'warning',
      messageKey: 'validation.highAttempts',
      params: { attempts: result.attempts },
    })
  }

  return alerts
}
