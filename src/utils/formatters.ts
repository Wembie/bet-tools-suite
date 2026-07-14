import type { Currency, ThousandsSeparator, DecimalPlaces } from '@/types'
import { CURRENCY_SYMBOLS } from '@/constants'

export function formatCurrency(
  value: number,
  currency: Currency = 'USD',
  thousandsSeparator: ThousandsSeparator = ',',
  decimalPlaces: DecimalPlaces = 2,
): string {
  const symbol = CURRENCY_SYMBOLS[currency] || '$'
  const decimalSeparator = thousandsSeparator === '.' ? ',' : '.'

  const fixed = value.toFixed(decimalPlaces)
  const [intPart, decPart] = fixed.split('.')

  const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator)

  const result =
    decimalPlaces > 0 ? `${formattedInt}${decimalSeparator}${decPart}` : formattedInt

  return `${symbol}${result}`
}

export function formatPercent(value: number, decimals: number = 2): string {
  return `${value.toFixed(decimals)}%`
}

export function formatNumber(
  value: number,
  thousandsSeparator: ThousandsSeparator = ',',
  decimalPlaces: DecimalPlaces = 2,
): string {
  const decimalSeparator = thousandsSeparator === '.' ? ',' : '.'
  const fixed = value.toFixed(decimalPlaces)
  const [intPart, decPart] = fixed.split('.')
  const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator)
  return decimalPlaces > 0 ? `${formattedInt}${decimalSeparator}${decPart}` : formattedInt
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}
