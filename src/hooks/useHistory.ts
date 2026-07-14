import { useState, useEffect } from 'react'
import type { HistoryEntry, CalculatorInputs, CalculationResult } from '@/types'
import { STORAGE_KEY_HISTORY } from '@/constants'
import { generateId } from '@/utils/formatters'

export function useHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_HISTORY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(history))
  }, [history])

  function saveToHistory(inputs: CalculatorInputs, result: CalculationResult) {
    const entry: HistoryEntry = {
      id: generateId(),
      date: new Date().toISOString(),
      initialStake: inputs.initialStake,
      odds: inputs.odds,
      targetProfit: inputs.targetProfit,
      attempts: inputs.maxAttempts,
      requiredCapital: result.requiredCapital,
      result,
    }
    setHistory(prev => [entry, ...prev].slice(0, 50))
  }

  function deleteFromHistory(id: string) {
    setHistory(prev => prev.filter(e => e.id !== id))
  }

  function duplicateEntry(id: string): HistoryEntry | undefined {
    const entry = history.find(e => e.id === id)
    if (!entry) return undefined
    const duplicate: HistoryEntry = { ...entry, id: generateId(), date: new Date().toISOString() }
    setHistory(prev => [duplicate, ...prev])
    return duplicate
  }

  function clearHistory() {
    setHistory([])
  }

  return { history, saveToHistory, deleteFromHistory, duplicateEntry, clearHistory }
}
