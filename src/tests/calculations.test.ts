import { describe, it, expect } from 'vitest'
import {
  calculateNextStake,
  calculateCapital,
  calculateProfit,
  calculateROI,
  calculateGrossReturn,
  calculateRecovery,
  validateInputs,
} from '@/utils/calculations'
import type { CalculatorInputs } from '@/types'

describe('calculateNextStake', () => {
  it('computes correct next stake', () => {
    // (loss + profit) / (odds - 1)
    expect(calculateNextStake(100, 100, 2.0)).toBeCloseTo(200)
  })

  it('returns 0 when odds <= 1', () => {
    expect(calculateNextStake(100, 100, 1.0)).toBe(0)
    expect(calculateNextStake(100, 100, 0.5)).toBe(0)
  })

  it('handles zero accumulated loss (first bet)', () => {
    expect(calculateNextStake(0, 100, 2.0)).toBeCloseTo(100)
  })

  it('handles fractional odds', () => {
    const result = calculateNextStake(50, 100, 1.5)
    expect(result).toBeCloseTo(300)
  })

  it('scales with higher odds', () => {
    const low = calculateNextStake(100, 100, 2.0)
    const high = calculateNextStake(100, 100, 3.0)
    expect(high).toBeLessThan(low)
  })
})

describe('calculateCapital', () => {
  it('sums all stakes', () => {
    const rows = [
      { stake: 100 },
      { stake: 200 },
      { stake: 300 },
    ] as Parameters<typeof calculateCapital>[0]
    expect(calculateCapital(rows)).toBe(600)
  })

  it('returns 0 for empty rows', () => {
    expect(calculateCapital([])).toBe(0)
  })
})

describe('calculateProfit', () => {
  it('computes stake * (odds - 1)', () => {
    expect(calculateProfit(100, 2.0)).toBeCloseTo(100)
    expect(calculateProfit(100, 1.5)).toBeCloseTo(50)
    expect(calculateProfit(200, 3.0)).toBeCloseTo(400)
  })
})

describe('calculateROI', () => {
  it('computes (profit / capital) * 100', () => {
    expect(calculateROI(100, 1000)).toBeCloseTo(10)
    expect(calculateROI(50, 200)).toBeCloseTo(25)
  })

  it('returns 0 when capital is 0', () => {
    expect(calculateROI(100, 0)).toBe(0)
  })
})

describe('calculateGrossReturn', () => {
  it('computes stake * odds', () => {
    expect(calculateGrossReturn(100, 2.0)).toBeCloseTo(200)
    expect(calculateGrossReturn(50, 1.85)).toBeCloseTo(92.5)
  })
})

describe('calculateRecovery', () => {
  const inputs: CalculatorInputs = {
    initialStake: 100,
    odds: 2.0,
    targetProfit: 100,
    maxAttempts: 5,
  }

  it('generates correct number of rows', () => {
    const result = calculateRecovery(inputs)
    expect(result.rows).toHaveLength(5)
  })

  it('first attempt uses initialStake', () => {
    const result = calculateRecovery(inputs)
    expect(result.rows[0].stake).toBeCloseTo(100)
  })

  it('first attempt has zero accumulated loss', () => {
    const result = calculateRecovery(inputs)
    expect(result.rows[0].accumulatedLoss).toBe(0)
  })

  it('second attempt accumulates first stake as loss', () => {
    const result = calculateRecovery(inputs)
    expect(result.rows[1].accumulatedLoss).toBeCloseTo(100)
  })

  it('net profit on any winning attempt equals targetProfit', () => {
    const result = calculateRecovery(inputs)
    result.rows.forEach(row => {
      expect(row.netProfit).toBeCloseTo(inputs.targetProfit, 1)
    })
  })

  it('required capital equals sum of all stakes', () => {
    const result = calculateRecovery(inputs)
    const sum = result.rows.reduce((s, r) => s + r.stake, 0)
    expect(result.requiredCapital).toBeCloseTo(sum, 1)
  })

  it('largest stake is the last row stake', () => {
    const result = calculateRecovery(inputs)
    const maxStake = Math.max(...result.rows.map(r => r.stake))
    expect(result.largestStake).toBeCloseTo(maxStake, 1)
  })

  it('total capital increases monotonically', () => {
    const result = calculateRecovery(inputs)
    for (let i = 1; i < result.rows.length; i++) {
      expect(result.rows[i].totalCapital).toBeGreaterThan(result.rows[i - 1].totalCapital)
    }
  })

  it('stakes increase monotonically', () => {
    const result = calculateRecovery(inputs)
    for (let i = 1; i < result.rows.length; i++) {
      expect(result.rows[i].stake).toBeGreaterThan(result.rows[i - 1].stake)
    }
  })

  it('works with different odds', () => {
    const result185 = calculateRecovery({ ...inputs, odds: 1.85 })
    expect(result185.rows[0].stake).toBeCloseTo(100)
    expect(result185.rows[1].stake).toBeCloseTo((100 + 100) / (1.85 - 1), 1)
  })
})

describe('validateInputs', () => {
  it('returns no errors for valid inputs', () => {
    const errors = validateInputs({ initialStake: 100, odds: 2, targetProfit: 100, maxAttempts: 10 })
    expect(errors).toHaveLength(0)
  })

  it('rejects zero initial stake', () => {
    const errors = validateInputs({ initialStake: 0, odds: 2, targetProfit: 100, maxAttempts: 10 })
    expect(errors.length).toBeGreaterThan(0)
  })

  it('rejects odds <= 1', () => {
    const errors = validateInputs({ initialStake: 100, odds: 1, targetProfit: 100, maxAttempts: 10 })
    expect(errors.length).toBeGreaterThan(0)
  })

  it('rejects zero target profit', () => {
    const errors = validateInputs({ initialStake: 100, odds: 2, targetProfit: 0, maxAttempts: 10 })
    expect(errors.length).toBeGreaterThan(0)
  })

  it('rejects maxAttempts > 50', () => {
    const errors = validateInputs({ initialStake: 100, odds: 2, targetProfit: 100, maxAttempts: 51 })
    expect(errors.length).toBeGreaterThan(0)
  })

  it('rejects negative values', () => {
    const errors = validateInputs({ initialStake: -100, odds: 2, targetProfit: 100, maxAttempts: 10 })
    expect(errors.length).toBeGreaterThan(0)
  })
})
