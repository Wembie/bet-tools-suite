import { useState, useCallback } from 'react'
import type { RuinInputs, RuinResult } from '@/types'
import { calculateRuin } from '@/utils/ruin'

interface UseRuinReturn {
  result: RuinResult | null
  isCalculating: boolean
  calculate: (inputs: RuinInputs) => RuinResult | null
  reset: () => void
}

export function useRuin(): UseRuinReturn {
  const [result, setResult] = useState<RuinResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const calculate = useCallback((inputs: RuinInputs): RuinResult | null => {
    setIsCalculating(true)
    const calcResult = calculateRuin(inputs)
    setResult(calcResult)
    setIsCalculating(false)
    return calcResult
  }, [])

  const reset = useCallback(() => {
    setResult(null)
  }, [])

  return { result, isCalculating, calculate, reset }
}
