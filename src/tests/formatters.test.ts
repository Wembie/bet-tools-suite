import { describe, it, expect } from 'vitest'
import { formatCurrency, formatPercent, formatNumber, generateId } from '@/utils/formatters'

describe('formatCurrency', () => {
  it('formats USD with dollar sign', () => {
    expect(formatCurrency(1000, 'USD', ',', 2)).toBe('$1,000.00')
  })

  it('formats EUR with euro sign', () => {
    expect(formatCurrency(1000, 'EUR', ',', 2)).toBe('€1,000.00')
  })

  it('handles dot separator', () => {
    expect(formatCurrency(1000, 'USD', '.', 2)).toBe('$1.000,00')
  })

  it('handles zero decimals', () => {
    expect(formatCurrency(1000, 'USD', ',', 0)).toBe('$1,000')
  })

  it('handles large numbers', () => {
    expect(formatCurrency(1000000, 'USD', ',', 2)).toBe('$1,000,000.00')
  })

  it('handles small values', () => {
    expect(formatCurrency(0.5, 'USD', ',', 2)).toBe('$0.50')
  })
})

describe('formatPercent', () => {
  it('formats with 2 decimals by default', () => {
    expect(formatPercent(10.5)).toBe('10.50%')
  })

  it('handles zero', () => {
    expect(formatPercent(0)).toBe('0.00%')
  })

  it('handles custom decimals', () => {
    expect(formatPercent(10.1234, 4)).toBe('10.1234%')
  })
})

describe('formatNumber', () => {
  it('formats with comma separator', () => {
    expect(formatNumber(1234.56, ',', 2)).toBe('1,234.56')
  })

  it('formats with dot separator', () => {
    expect(formatNumber(1234.56, '.', 2)).toBe('1.234,56')
  })
})

describe('generateId', () => {
  it('generates unique ids', () => {
    const a = generateId()
    const b = generateId()
    expect(a).not.toBe(b)
  })

  it('generates non-empty strings', () => {
    expect(generateId().length).toBeGreaterThan(0)
  })
})
