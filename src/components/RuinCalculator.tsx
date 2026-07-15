import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { TrendingDown, RotateCcw } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Label } from '@/components/ui/label'
import type { RuinInputs } from '@/types'

const schema = z.object({
  bankroll: z.number({ invalid_type_error: 'validation.required' }).positive('validation.mustBePositive'),
  stake: z.number({ invalid_type_error: 'validation.required' }).positive('validation.mustBePositive'),
  odds: z.number({ invalid_type_error: 'validation.required' }).gt(1, 'validation.mustBeGreaterThan1'),
  winRate: z.number({ invalid_type_error: 'validation.required' }).min(1, 'validation.maxWinRate').max(99, 'validation.maxWinRate'),
}).refine(d => d.stake < d.bankroll, {
  message: 'validation.stakeExceedsBankroll',
  path: ['stake'],
})

interface RuinCalculatorProps {
  onCalculate: (inputs: RuinInputs) => void
  onReset: () => void
  isCalculating: boolean
}

export function RuinCalculator({ onCalculate, onReset, isCalculating }: RuinCalculatorProps) {
  const { t } = useTranslation()

  const FIELDS = [
    { id: 'bankroll' as const, labelKey: 'ruin.bankroll', hintKey: 'ruin.bankrollHint', placeholder: '1000000', step: '1', icon: '$' },
    { id: 'stake' as const, labelKey: 'ruin.stake', hintKey: 'ruin.stakeHint', placeholder: '10000', step: '1', icon: '$' },
    { id: 'odds' as const, labelKey: 'ruin.odds', hintKey: 'ruin.oddsHint', placeholder: '1.85', step: '0.01', icon: '×' },
    { id: 'winRate' as const, labelKey: 'ruin.winRate', hintKey: 'ruin.winRateHint', placeholder: '55', step: '0.1', icon: '%' },
  ]

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RuinInputs>({
    resolver: zodResolver(schema),
    defaultValues: { bankroll: 1000000, stake: 10000, odds: 1.85, winRate: 55 },
  })

  function handleReset() {
    reset()
    onReset()
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="glass rounded-2xl border border-white/8 overflow-hidden shadow-card"
    >
      <div className="px-6 py-5 border-b border-white/5">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
            <TrendingDown className="h-3.5 w-3.5 text-white" />
          </div>
          <h2 className="text-sm font-bold text-white">{t('ruin.title')}</h2>
        </div>
        <p className="text-xs text-white/30 font-mono pl-9">
          {t('ruin.formula')}
        </p>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit(onCalculate)} className="space-y-4">
          {FIELDS.map(field => (
            <div key={field.id}>
              <Label htmlFor={field.id} className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5 block">
                {t(field.labelKey)}
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-red-400/70 w-4 text-center select-none">
                  {field.icon}
                </span>
                <input
                  id={field.id}
                  type="number"
                  placeholder={field.placeholder}
                  step={field.step}
                  className={`w-full h-11 pl-9 pr-3 rounded-xl text-sm font-medium tabular-nums bg-white/5 border transition-all outline-none text-white placeholder:text-white/20
                    ${errors[field.id]
                      ? 'border-red-500/50 focus:border-red-500 focus:shadow-[0_0_0_2px_rgba(239,68,68,0.1)]'
                      : 'border-white/10 focus:border-red-500/40 focus:shadow-[0_0_0_2px_rgba(239,68,68,0.06)] focus:bg-red-500/3'
                    }`}
                  {...register(field.id, { valueAsNumber: true })}
                />
              </div>
              <p className={`text-[11px] mt-1 ${errors[field.id] ? 'text-red-400' : 'text-white/25'}`}>
                {errors[field.id]?.message ? t(errors[field.id]!.message!) : t(field.hintKey)}
              </p>
            </div>
          ))}

          <div className="flex gap-2 pt-2">
            <motion.button
              type="submit"
              disabled={isCalculating}
              whileHover={{ scale: 1.01, boxShadow: '0 0 30px rgba(239,68,68,0.4)' }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 h-11 bg-gradient-to-r from-red-600 to-orange-500 text-white font-black text-sm rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(239,68,68,0.3)]"
            >
              {isCalculating ? (
                <span className="animate-pulse">{t('ruin.calculating')}</span>
              ) : (
                <>
                  <TrendingDown className="h-3.5 w-3.5" />
                  {t('ruin.calculate')}
                </>
              )}
            </motion.button>
            <button
              type="button"
              onClick={handleReset}
              className="h-11 w-11 rounded-xl border border-white/10 bg-white/5 text-white/40 hover:text-white/70 hover:border-white/20 transition-all flex items-center justify-center"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  )
}
