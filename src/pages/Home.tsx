import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Landing } from '@/pages/Landing'
import { RecoveryPage } from '@/pages/RecoveryPage'
import { EscaleraPage } from '@/pages/EscaleraPage'
import { Settings } from '@/components/Settings'
import { useSettings } from '@/hooks/useSettings'

type Mode = 'landing' | 'recovery' | 'escalera'

export function Home() {
  const { settings, updateSettings } = useSettings()
  const [mode, setMode] = useState<Mode>('landing')
  const [showSettings, setShowSettings] = useState(false)

  const themeToggle = () => updateSettings({ theme: settings.theme === 'dark' ? 'light' : 'dark' })

  return (
    <>
      <AnimatePresence mode="wait">
        {mode === 'landing' && (
          <Landing key="landing" onSelectMode={setMode} />
        )}
        {mode === 'recovery' && (
          <RecoveryPage
            key="recovery"
            settings={settings}
            onBack={() => setMode('landing')}
            onThemeToggle={themeToggle}
            onSettingsOpen={() => setShowSettings(true)}
          />
        )}
        {mode === 'escalera' && (
          <EscaleraPage
            key="escalera"
            settings={settings}
            onBack={() => setMode('landing')}
            onThemeToggle={themeToggle}
            onSettingsOpen={() => setShowSettings(true)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSettings && (
          <Settings
            settings={settings}
            onUpdate={updateSettings}
            onClose={() => setShowSettings(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
