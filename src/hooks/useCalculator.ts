import { useState, useCallback } from 'react'
import type { CalculatorInputs, CalculationResult, AlertInfo, AppSettings } from '@/types'
import { calculateRecovery, validateInputs, generateAlerts } from '@/utils/calculations'

interface UseCalculatorReturn {
  result: CalculationResult | null
  errors: string[]
  alerts: AlertInfo[]
  isCalculating: boolean
  calculate: (inputs: CalculatorInputs, settings: AppSettings) => CalculationResult | null
  reset: () => void
}

export function useCalculator(): UseCalculatorReturn {
  const [result, setResult] = useState<CalculationResult | null>(null)
  const [errors, setErrors] = useState<string[]>([])
  const [alerts, setAlerts] = useState<AlertInfo[]>([])
  const [isCalculating, setIsCalculating] = useState(false)

  const calculate = useCallback(
    (inputs: CalculatorInputs, settings: AppSettings): CalculationResult | null => {
      setIsCalculating(true)
      setErrors([])
      setAlerts([])

      const validationErrors = validateInputs(inputs)
      if (validationErrors.length > 0) {
        setErrors(validationErrors)
        setIsCalculating(false)
        return null
      }

      const calcResult = calculateRecovery(inputs)
      const calcAlerts = generateAlerts(calcResult, settings)

      setResult(calcResult)
      setAlerts(calcAlerts)
      setIsCalculating(false)
      return calcResult
    },
    [],
  )

  const reset = useCallback(() => {
    setResult(null)
    setErrors([])
    setAlerts([])
  }, [])

  return { result, errors, alerts, isCalculating, calculate, reset }
}
