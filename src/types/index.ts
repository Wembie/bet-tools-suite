export interface CalculatorInputs {
  initialStake: number
  odds: number
  targetProfit: number
  maxAttempts: number
}

export interface RecoveryRow {
  attempt: number
  stake: number
  accumulatedLoss: number
  totalCapital: number
  grossReturn: number
  netProfit: number
  roi: number
  expectedResult: string
}

export interface CalculationResult {
  rows: RecoveryRow[]
  requiredCapital: number
  targetProfit: number
  odds: number
  attempts: number
  largestStake: number
  expectedROI: number
}

export interface HistoryEntry {
  id: string
  date: string
  initialStake: number
  odds: number
  targetProfit: number
  attempts: number
  requiredCapital: number
  result: CalculationResult
}

export type Currency = 'COP' | 'USD' | 'EUR' | 'MXN'
export type ThousandsSeparator = ',' | '.' | ' '
export type DecimalPlaces = 0 | 1 | 2 | 3 | 4

export interface AppSettings {
  theme: 'light' | 'dark'
  currency: Currency
  thousandsSeparator: ThousandsSeparator
  decimalPlaces: DecimalPlaces
  maxStakeAlert: number
  maxCapitalAlert: number
  maxAttemptsAlert: number
}

export type SortDirection = 'asc' | 'desc'
export type SortKey = keyof RecoveryRow

export interface SortConfig {
  key: SortKey
  direction: SortDirection
}

export interface ValidationError {
  field: keyof CalculatorInputs
  message: string
}

export interface AlertInfo {
  type: 'warning' | 'error' | 'info'
  messageKey: string
  params?: Record<string, string | number>
}

export interface StaircaseInputs {
  initialAmount: number
  odds: number
  attempts: number
}

export interface StaircaseRow {
  attempt: number
  betAmount: number
  grossReturn: number
  profit: number
  cumulativeProfit: number
  growthPercent: number
}

export interface StaircaseResult {
  rows: StaircaseRow[]
  initialAmount: number
  odds: number
  attempts: number
  finalAmount: number
  totalProfit: number
  totalGrowthPercent: number
}

export interface RuinInputs {
  bankroll: number
  stake: number
  odds: number
  winRate: number
}

export interface RuinPoint {
  bets: number
  survivalProbability: number
}

export interface RuinResult {
  bankroll: number
  stake: number
  odds: number
  winRate: number
  maxConsecutiveLosses: number
  breakEvenWinRate: number
  evPerBetPct: number
  kellyFraction: number
  kellyStake: number
  ruinProbability: number
  survivalCurve: RuinPoint[]
}
