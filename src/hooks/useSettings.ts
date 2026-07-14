import { useState, useEffect } from 'react'
import type { AppSettings } from '@/types'
import { DEFAULT_SETTINGS, STORAGE_KEY_SETTINGS } from '@/constants'

export function useSettings() {
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_SETTINGS)
      return stored ? { ...DEFAULT_SETTINGS, ...JSON.parse(stored) } : DEFAULT_SETTINGS
    } catch {
      return DEFAULT_SETTINGS
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings))
  }, [settings])

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', settings.theme === 'dark')
  }, [settings.theme])

  function updateSettings(updates: Partial<AppSettings>) {
    setSettings(prev => ({ ...prev, ...updates }))
  }

  function resetSettings() {
    setSettings(DEFAULT_SETTINGS)
  }

  return { settings, updateSettings, resetSettings }
}
