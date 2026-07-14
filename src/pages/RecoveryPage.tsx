import { useState, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Header } from '@/components/Header'
import { Calculator } from '@/components/Calculator'
import { Dashboard } from '@/components/Dashboard'
import { RecoveryTable } from '@/components/RecoveryTable'
import { Charts, type ChartsHandle } from '@/components/Charts'
import { History } from '@/components/History'
import { Alerts } from '@/components/Alerts'
import { ExportButtons } from '@/components/ExportButtons'
import { useCalculator } from '@/hooks/useCalculator'
import { useHistory } from '@/hooks/useHistory'
import type { AppSettings, CalculatorInputs, HistoryEntry } from '@/types'

interface RecoveryPageProps {
  settings: AppSettings
  onBack: () => void
  onThemeToggle: () => void
  onSettingsOpen: () => void
}

type Tab = 'calculator' | 'results' | 'history'

const TABS: { id: Tab; label: string }[] = [
  { id: 'calculator', label: 'Calculator' },
  { id: 'results', label: 'Results' },
  { id: 'history', label: 'History' },
]

export function RecoveryPage({ settings, onBack, onThemeToggle, onSettingsOpen }: RecoveryPageProps) {
  const [tab, setTab] = useState<Tab>('calculator')
  const { result, errors, alerts, isCalculating, calculate, reset } = useCalculator()
  const { history, saveToHistory, deleteFromHistory, duplicateEntry, clearHistory } = useHistory()
  const chartsRef = useRef<ChartsHandle>(null)

  function handleCalculate(inputs: CalculatorInputs) {
    const calcResult = calculate(inputs, settings)
    if (calcResult) {
      saveToHistory(inputs, calcResult)
      setTab('results')
    }
  }

  return (
    <div className="min-h-screen bg-[#06060f]">
      {/* Background mesh */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-700/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-500/4 rounded-full blur-[100px]" />
      </div>

      <Header
        settings={settings}
        onThemeToggle={onThemeToggle}
        onSettingsOpen={onSettingsOpen}
        onHome={onBack}
      />

      <main className="container relative py-8">
        {/* Top bar: back button + tab nav */}
        <div className="flex items-center gap-3 mb-8 flex-wrap">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass border border-white/8 text-amber-400 hover:text-amber-300 hover:border-amber-500/30 text-sm font-semibold transition-all"
          >
            <span className="text-xs">◀</span>
            Menu
          </button>

          <div className="flex items-center gap-1 glass rounded-xl p-1 border border-white/5 w-fit">
            {TABS.map(t => {
              const label =
                t.id === 'history' && history.length > 0
                  ? `History (${history.length})`
                  : t.id === 'results' && !result
                    ? 'Results'
                    : t.label

              return (
                <button
                  key={t.id}
                  disabled={t.id === 'results' && !result}
                  onClick={() => setTab(t.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all disabled:opacity-30 disabled:cursor-not-allowed ${
                    tab === t.id
                      ? 'bg-gradient-gold text-black shadow-gold-sm'
                      : 'text-white/40 hover:text-white/70'
                  }`}
                >
                  {label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          {/* ── Calculator ── */}
          {tab === 'calculator' && (
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
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
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
          {tab === 'results' && result && (
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
          {tab === 'history' && (
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
                onLoad={(_entry: HistoryEntry) => setTab('results')}
                onDelete={deleteFromHistory}
                onDuplicate={duplicateEntry}
                onClear={clearHistory}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
