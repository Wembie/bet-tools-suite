import type { AppSettings } from '@/types'

export const DEFAULT_SETTINGS: AppSettings = {
  theme: 'dark',
  currency: 'USD',
  thousandsSeparator: ',',
  decimalPlaces: 2,
  maxStakeAlert: 10000,
  maxCapitalAlert: 50000,
  maxAttemptsAlert: 30,
}

export const CURRENCY_SYMBOLS: Record<string, string> = {
  COP: '$',
  USD: '$',
  EUR: '€',
  MXN: '$',
}

export const CURRENCY_CODES: Record<string, string> = {
  COP: 'COP',
  USD: 'USD',
  EUR: 'EUR',
  MXN: 'MXN',
}

export const MIN_ODDS = 1.01
export const MAX_ODDS = 1000
export const MIN_STAKE = 0.01
export const MAX_ATTEMPTS = 50
export const ODDS_WARNING_THRESHOLD = 1.1
export const STORAGE_KEY_HISTORY = 'bet-tools-history'
export const STORAGE_KEY_SETTINGS = 'bet-tools-settings'

export const APP_NAME = 'Bet Tools Suite'
export const APP_AUTHOR = 'Wembie'
export const GITHUB_URL = 'https://github.com/Wembie/bet-tools-suite'
