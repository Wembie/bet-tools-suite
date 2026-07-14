import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Header } from '@/components/Header'
import { StaircaseCalculator } from '@/components/StaircaseCalculator'
import { StaircaseDashboard } from '@/components/StaircaseDashboard'
import { StaircaseTable } from '@/components/StaircaseTable'
import { useStaircase } from '@/hooks/useStaircase'
import type { AppSettings, StaircaseInputs } from '@/types'

interface EscaleraPageProps {
  settings: AppSettings
  onBack: () => void
  onThemeToggle: () => void
  onSettingsOpen: () => void
}

type Tab = 'calculator' | 'results'

const TABS: { id: Tab; label: string }[] = [
  { id: 'calculator', label: 'Calculator' },
  { id: 'results', label: 'Results' },
]

export function EscaleraPage({ settings, onBack, onThemeToggle, onSettingsOpen }: EscaleraPageProps) {
  const { t } = useTranslation()
  const [tab, setTab] = useState<Tab>('calculator')
  const { result, isCalculating, calculate, reset } = useStaircase()

  function handleCalculate(inputs: StaircaseInputs) {
    const calcResult = calculate(inputs)
    if (calcResult) {
      setTab('results')
    }
  }

  return (
    <div className="min-h-screen bg-[#04040c]">
      {/* Grid overlay */}
      <div className="fixed inset-0 grid-overlay pointer-events-none z-0" />
      {/* Background mesh */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-purple-700/6 rounded-full blur-[160px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-violet-600/5 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 right-0 w-[300px] h-[300px] bg-purple-500/3 rounded-full blur-[100px]" />
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
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass border border-white/8 text-purple-400 hover:text-purple-300 hover:border-purple-500/30 text-sm font-semibold transition-all"
          >
            <span className="text-xs">◀</span>
            Menu
          </button>

          <div className="flex items-center gap-1 glass rounded-xl p-1 border border-white/5 w-fit">
            {TABS.map(t => (
              <button
                key={t.id}
                disabled={t.id === 'results' && !result}
                onClick={() => setTab(t.id)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all disabled:opacity-30 disabled:cursor-not-allowed ${
                  tab === t.id
                    ? 'bg-gradient-to-r from-purple-600 to-violet-500 text-white shadow-[0_2px_12px_rgba(168,85,247,0.4)]'
                    : 'text-white/40 hover:text-white/70'
                }`}
              >
                {t.label}
              </button>
            ))}
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
                  <StaircaseCalculator
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
                        <div className="absolute inset-0 rounded-2xl bg-purple-500/8 border border-purple-500/22 animate-pulse" />
                        <div className="absolute inset-0 rounded-2xl flex items-center justify-center">
                          <svg className="w-9 h-9 text-purple-400/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13l4-4 4 4 4-8 4 4" />
                          </svg>
                        </div>
                      </div>
                      <h2 className="text-lg font-bold text-white mb-2">{t('escalera.emptyTitle')}</h2>
                      <p className="text-sm text-white/28 max-w-xs leading-relaxed">
                        {t('escalera.emptyHint')}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <StaircaseDashboard result={result} settings={settings} />
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Results ── */}
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
                  <StaircaseDashboard result={result} settings={settings} />
                  <StaircaseTable result={result} settings={settings} />
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-24 text-center"
                >
                  <div className="relative w-20 h-20 mb-6">
                    <div className="absolute inset-0 rounded-2xl bg-purple-500/5 border border-purple-500/15" />
                    <div className="absolute inset-0 rounded-2xl flex items-center justify-center">
                      <svg className="w-9 h-9 text-purple-400/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13l4-4 4 4 4-8 4 4" />
                      </svg>
                    </div>
                  </div>
                  <h2 className="text-lg font-bold text-white/45 mb-2">{t('escalera.emptyResultsTitle')}</h2>
                  <p className="text-sm text-white/20 max-w-xs leading-relaxed">
                    {t('escalera.emptyResultsHint')}
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
