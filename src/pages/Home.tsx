import { useState, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Landing } from '@/pages/Landing'
import { Header } from '@/components/Header'
import { Calculator } from '@/components/Calculator'
import { Dashboard } from '@/components/Dashboard'
import { RecoveryTable } from '@/components/RecoveryTable'
import { Charts, type ChartsHandle } from '@/components/Charts'
import { History } from '@/components/History'
import { Settings } from '@/components/Settings'
import { Alerts } from '@/components/Alerts'
import { ExportButtons } from '@/components/ExportButtons'
import { useCalculator } from '@/hooks/useCalculator'
import { useHistory } from '@/hooks/useHistory'
import { useSettings } from '@/hooks/useSettings'
import type { CalculatorInputs } from '@/types'

type Page = 'landing' | 'calculator' | 'results' | 'history'

export function Home() {
  const { settings, updateSettings } = useSettings()
  const { result, errors, alerts, isCalculating, calculate, reset } = useCalculator()
  const { history, saveToHistory, deleteFromHistory, duplicateEntry, clearHistory } = useHistory()
  const [showSettings, setShowSettings] = useState(false)
  const [page, setPage] = useState<Page>('landing')
  const chartsRef = useRef<ChartsHandle>(null)

  function handleCalculate(inputs: CalculatorInputs) {
    const calcResult = calculate(inputs, settings)
    if (calcResult) {
      saveToHistory(inputs, calcResult)
      setPage('results')
    }
  }

  function goToCalculator() {
    setPage('calculator')
  }

  if (page === 'landing') {
    return <Landing onEnter={goToCalculator} />
  }

  const NAV_TABS: { id: Page; label: string; disabled?: boolean }[] = [
    { id: 'calculator', label: 'Calculator' },
    { id: 'results', label: 'Results', disabled: !result },
    { id: 'history', label: `History${history.length > 0 ? ` (${history.length})` : ''}` },
  ]

  return (
    <div className="min-h-screen bg-[#06060f]">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-700/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-500/4 rounded-full blur-[100px]" />
      </div>

      <Header
        settings={settings}
        onThemeToggle={() => updateSettings({ theme: settings.theme === 'dark' ? 'light' : 'dark' })}
        onSettingsOpen={() => setShowSettings(true)}
        onHome={() => setPage('landing')}
      />

      <main className="container relative py-8">
        {/* Tab nav */}
        <div className="flex items-center gap-1 mb-8 glass rounded-xl p-1 border border-white/5 w-fit">
          {NAV_TABS.map(tab => (
            <button
              key={tab.id}
              disabled={tab.disabled}
              onClick={() => setPage(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all disabled:opacity-30 disabled:cursor-not-allowed ${
                page === tab.id
                  ? 'bg-gradient-gold text-black shadow-gold-sm'
                  : 'text-white/40 hover:text-white/70'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Calculator ── */}
        <AnimatePresence mode="wait">
          {page === 'calculator' && (
            <motion.div
              key="calculator"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <Calculator
                    onCalculate={handleCalculate}
                    onReset={reset}
                    isCalculating={isCalculating}
                  />
                </div>

                <div className="lg:col-span-2 space-y-4">
                  {errors.length > 0 && (
                    <div className="space-y-2">
                      {errors.map((err, i) => (
                        <div
                          key={i}
                          className="text-xs text-red-300 bg-red-500/8 border border-red-500/20 rounded-xl px-4 py-3"
                        >
                          {err}
                        </div>
                      ))}
                    </div>
                  )}

                  {!result && errors.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center justify-center py-24 text-center"
                    >
                      <div className="w-16 h-16 rounded-2xl glass-gold border border-amber-500/20 flex items-center justify-center mb-5 animate-pulse-gold">
                        <svg className="w-7 h-7 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                            d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <h2 className="text-lg font-bold text-white mb-2">Ready to calculate</h2>
                      <p className="text-sm text-white/30 max-w-xs leading-relaxed">
                        Enter your parameters and hit Calculate to generate your full recovery plan.
                      </p>
                    </motion.div>
                  )}

                  {result && (
                    <AnimatePresence>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        <Alerts alerts={alerts} />
                        <Dashboard result={result} settings={settings} />
                        <div className="flex justify-end">
                          <ExportButtons result={result} settings={settings} />
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Results ── */}
          {page === 'results' && result && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <Alerts alerts={alerts} />
              <Dashboard result={result} settings={settings} />
              <div className="flex justify-end">
                <ExportButtons result={result} settings={settings} />
              </div>
              <RecoveryTable result={result} settings={settings} />
              <Charts ref={chartsRef} result={result} settings={settings} />
            </motion.div>
          )}

          {/* ── History ── */}
          {page === 'history' && (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <History
                history={history}
                settings={settings}
                onLoad={() => setPage('results')}
                onDelete={deleteFromHistory}
                onDuplicate={duplicateEntry}
                onClear={clearHistory}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {showSettings && (
          <Settings
            settings={settings}
            onUpdate={updateSettings}
            onClose={() => setShowSettings(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
