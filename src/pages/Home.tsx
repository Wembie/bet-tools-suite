import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Calculator } from '@/components/Calculator'
import { Dashboard } from '@/components/Dashboard'
import { RecoveryTable } from '@/components/RecoveryTable'
import { Charts, type ChartsHandle } from '@/components/Charts'
import { History } from '@/components/History'
import { Settings } from '@/components/Settings'
import { Alerts } from '@/components/Alerts'
import { ExportButtons } from '@/components/ExportButtons'
import { Header } from '@/components/Header'
import { useCalculator } from '@/hooks/useCalculator'
import { useHistory } from '@/hooks/useHistory'
import { useSettings } from '@/hooks/useSettings'
import type { CalculatorInputs, HistoryEntry } from '@/types'

export function Home() {
  const { settings, updateSettings } = useSettings()
  const { result, errors, alerts, isCalculating, calculate, reset } = useCalculator()
  const { history, saveToHistory, deleteFromHistory, duplicateEntry, clearHistory } = useHistory()
  const [showSettings, setShowSettings] = useState(false)
  const [activeTab, setActiveTab] = useState('calculator')
  const chartsRef = useRef<ChartsHandle>(null)

  function handleCalculate(inputs: CalculatorInputs) {
    const calcResult = calculate(inputs, settings)
    if (calcResult) {
      saveToHistory(inputs, calcResult)
      setActiveTab('results')
    }
  }

  function handleLoadHistory(_entry: HistoryEntry) {
    setActiveTab('results')
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        settings={settings}
        onThemeToggle={() => updateSettings({ theme: settings.theme === 'dark' ? 'light' : 'dark' })}
        onSettingsOpen={() => setShowSettings(true)}
      />

      <main className="container py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid lg:grid-cols-3">
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
            <TabsTrigger value="results" disabled={!result}>
              Results
            </TabsTrigger>
            <TabsTrigger value="history">
              History {history.length > 0 && `(${history.length})`}
            </TabsTrigger>
          </TabsList>

          {/* Calculator tab */}
          <TabsContent value="calculator">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <Calculator
                  onCalculate={handleCalculate}
                  onReset={reset}
                  isCalculating={isCalculating}
                />
              </div>

              <div className="lg:col-span-2 space-y-4">
                {/* Error display */}
                {errors.length > 0 && (
                  <div className="space-y-2">
                    {errors.map((err, i) => (
                      <div
                        key={i}
                        className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-3"
                      >
                        {err}
                      </div>
                    ))}
                  </div>
                )}

                {/* Empty state */}
                {!result && errors.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                      <svg
                        className="w-8 h-8 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <h2 className="text-lg font-semibold mb-2">Ready to calculate</h2>
                    <p className="text-sm text-muted-foreground max-w-sm">
                      Enter your parameters on the left and hit Calculate to generate your recovery
                      plan with charts, table, and export options.
                    </p>
                  </div>
                )}

                {/* Results preview on calculator tab */}
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
          </TabsContent>

          {/* Results tab */}
          <TabsContent value="results" className="space-y-6">
            {result && (
              <>
                <Alerts alerts={alerts} />
                <Dashboard result={result} settings={settings} />
                <div className="flex justify-end">
                  <ExportButtons result={result} settings={settings} />
                </div>
                <RecoveryTable result={result} settings={settings} />
                <Charts ref={chartsRef} result={result} settings={settings} />
              </>
            )}
          </TabsContent>

          {/* History tab */}
          <TabsContent value="history">
            <History
              history={history}
              settings={settings}
              onLoad={handleLoadHistory}
              onDelete={deleteFromHistory}
              onDuplicate={duplicateEntry}
              onClear={clearHistory}
            />
          </TabsContent>
        </Tabs>
      </main>

      {/* Settings modal */}
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
