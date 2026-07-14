import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
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
  const [tab, setTab] = useState<Tab>('calculator')
  const { result, isCalculating, calculate, reset } = useStaircase()

  function handleCalculate(inputs: StaircaseInputs) {
    const calcResult = calculate(inputs)
    if (calcResult) {
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
                      <div className="w-16 h-16 rounded-2xl glass border border-purple-500/20 bg-purple-500/8 flex items-center justify-center mb-5 animate-pulse">
                        <svg className="w-7 h-7 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13l4-4 4 4 4-8 4 4" />
                        </svg>
                      </div>
                      <h2 className="text-lg font-bold text-white mb-2">Lista para escalar</h2>
                      <p className="text-sm text-white/30 max-w-xs leading-relaxed">
                        Ingresa tu monto inicial, cuota y número de apuestas para ver el plan completo.
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
                  <div className="w-16 h-16 rounded-2xl glass border border-purple-500/20 bg-purple-500/8 flex items-center justify-center mb-5">
                    <svg className="w-7 h-7 text-purple-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13l4-4 4 4 4-8 4 4" />
                    </svg>
                  </div>
                  <h2 className="text-lg font-bold text-white/50 mb-2">Sin resultados</h2>
                  <p className="text-sm text-white/20 max-w-xs leading-relaxed">
                    Vuelve a la calculadora e ingresa tus parámetros para generar el plan.
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
