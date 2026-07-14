import { useState, useCallback } from 'react'
import type { StaircaseInputs, StaircaseResult } from '@/types'
import { calculateStaircase } from '@/utils/staircase'

interface UseStaircaseReturn {
  result: StaircaseResult | null
  isCalculating: boolean
  calculate: (inputs: StaircaseInputs) => StaircaseResult | null
  reset: () => void
}

export function useStaircase(): UseStaircaseReturn {
  const [result, setResult] = useState<StaircaseResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const calculate = useCallback((inputs: StaircaseInputs): StaircaseResult | null => {
    setIsCalculating(true)
    const calcResult = calculateStaircase(inputs)
    setResult(calcResult)
    setIsCalculating(false)
    return calcResult
  }, [])

  const reset = useCallback(() => {
    setResult(null)
  }, [])

  return { result, isCalculating, calculate, reset }
}
