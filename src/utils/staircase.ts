import type { StaircaseInputs, StaircaseResult, StaircaseRow } from '@/types'

export function calculateStaircase(inputs: StaircaseInputs): StaircaseResult {
  const { initialAmount, odds, attempts } = inputs
  const rows: StaircaseRow[] = []
  let currentAmount = initialAmount

  for (let attempt = 1; attempt <= attempts; attempt++) {
    const betAmount = currentAmount
    const grossReturn = Number((betAmount * odds).toFixed(2))
    const profit = Number((grossReturn - betAmount).toFixed(2))
    currentAmount = grossReturn
    const cumulativeProfit = Number((currentAmount - initialAmount).toFixed(2))
    const growthPercent = Number((((currentAmount - initialAmount) / initialAmount) * 100).toFixed(2))

    rows.push({ attempt, betAmount, grossReturn, profit, cumulativeProfit, growthPercent })
  }

  return {
    rows,
    initialAmount,
    odds,
    attempts,
    finalAmount: currentAmount,
    totalProfit: Number((currentAmount - initialAmount).toFixed(2)),
    totalGrowthPercent: Number((((currentAmount - initialAmount) / initialAmount) * 100).toFixed(2)),
  }
}
