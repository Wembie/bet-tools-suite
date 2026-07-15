import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Header } from '@/components/Header'
import { RuinCalculator } from '@/components/RuinCalculator'
import { RuinDashboard } from '@/components/RuinDashboard'
import { RuinChart } from '@/components/RuinChart'
import { useRuin } from '@/hooks/useRuin'
import type { AppSettings, RuinInputs } from '@/types'

interface RuinPageProps {
  settings: AppSettings
  onBack: () => void
  onThemeToggle: () => void
  onSettingsOpen: () => void
}

type Tab = 'calculator' | 'results'

const TABS: { id: Tab; labelKey: string }[] = [
  { id: 'calculator', labelKey: 'calculator.title' },
  { id: 'results', labelKey: 'table.title' },
]

export function RuinPage({ settings, onBack, onThemeToggle, onSettingsOpen }: RuinPageProps) {
  const { t } = useTranslation()
  const [tab, setTab] = useState<Tab>('calculator')
  const { result, isCalculating, calculate, reset } = useRuin()

  function handleCalculate(inputs: RuinInputs) {
    const calcResult = calculate(inputs)
    if (calcResult) setTab('results')
  }

  return (
    <div className="min-h-screen bg-[#04040c]">
      {/* Grid overlay */}
      <div className="fixed inset-0 grid-overlay pointer-events-none z-0" />
      {/* Background mesh */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[160px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-orange-600/4 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 right-0 w-[300px] h-[300px] bg-red-700/3 rounded-full blur-[100px]" />
      </div>

      <Header
        settings={settings}
        onThemeToggle={onThemeToggle}
        onSettingsOpen={onSettingsOpen}
        onHome={onBack}
      />

      <main className="container relative py-8">
        {/* Top bar */}
        <div className="flex items-center gap-3 mb-8 flex-wrap">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass border border-white/8 text-red-400 hover:text-red-300 hover:border-red-500/30 text-sm font-semibold transition-all"
          >
            <span className="text-xs">◀</span>
            Menu
          </button>

          <div className="flex items-center gap-1 glass rounded-xl p-1 border border-white/5 w-fit">
            {TABS.map(tab_ => (
              <button
                key={tab_.id}
                disabled={tab_.id === 'results' && !result}
                onClick={() => setTab(tab_.id)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all disabled:opacity-30 disabled:cursor-not-allowed ${
                  tab === tab_.id
                    ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-[0_2px_12px_rgba(239,68,68,0.4)]'
                    : 'text-white/40 hover:text-white/70'
                }`}
              >
                {t(tab_.labelKey)}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
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
                  <RuinCalculator
                    onCalculate={handleCalculate}
                    onReset={reset}
                    isCalculating={isCalculating}
                  />
                </div>

                <div className="lg:col-span-2">
                  {!result ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center justify-center py-24 text-center"
                    >
                      <div className="relative w-20 h-20 mb-6">
                        <div className="absolute inset-0 rounded-2xl bg-red-500/8 border border-red-500/22 animate-pulse" />
                        <div className="absolute inset-0 rounded-2xl flex items-center justify-center">
                          <svg className="w-9 h-9 text-red-400/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                          </svg>
                        </div>
                      </div>
                      <h2 className="text-lg font-bold text-white mb-2">{t('ruin.emptyTitle')}</h2>
                      <p className="text-sm text-white/28 max-w-xs leading-relaxed">
                        {t('ruin.emptyHint')}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <RuinDashboard result={result} settings={settings} />
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {tab === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {result ? (
                <>
                  <RuinDashboard result={result} settings={settings} />
                  <RuinChart result={result} />
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-24 text-center"
                >
                  <div className="relative w-20 h-20 mb-6">
                    <div className="absolute inset-0 rounded-2xl bg-red-500/5 border border-red-500/15" />
                    <div className="absolute inset-0 rounded-2xl flex items-center justify-center">
                      <svg className="w-9 h-9 text-red-400/35" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                      </svg>
                    </div>
                  </div>
                  <h2 className="text-lg font-bold text-white/45 mb-2">{t('ruin.emptyResultsTitle')}</h2>
                  <p className="text-sm text-white/20 max-w-xs leading-relaxed">
                    {t('ruin.emptyResultsHint')}
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
