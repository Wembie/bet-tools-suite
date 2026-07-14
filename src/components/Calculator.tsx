import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Zap, RotateCcw } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Label } from '@/components/ui/label'
import type { CalculatorInputs } from '@/types'

const schema = z.object({
  initialStake: z.number({ invalid_type_error: 'validation.required' }).positive('validation.mustBePositive'),
  odds: z.number({ invalid_type_error: 'validation.required' }).gt(1, 'validation.mustBeGreaterThan1'),
  targetProfit: z.number({ invalid_type_error: 'validation.required' }).positive('validation.mustBePositive'),
  maxAttempts: z.number({ invalid_type_error: 'validation.required' }).int().min(1).max(50, 'validation.maxAttempts'),
})

interface CalculatorProps {
  onCalculate: (inputs: CalculatorInputs) => void
  onReset: () => void
  isCalculating: boolean
}

export function Calculator({ onCalculate, onReset, isCalculating }: CalculatorProps) {
  const { t } = useTranslation()

  const FIELDS = [
    { id: 'initialStake' as const, labelKey: 'calculator.initialStake', hintKey: 'calculator.initialStakeHint', placeholder: '100.00', step: '0.01', icon: '$' },
    { id: 'odds' as const, labelKey: 'calculator.odds', hintKey: 'calculator.oddsHint', placeholder: '2.00', step: '0.01', icon: '×' },
    { id: 'targetProfit' as const, labelKey: 'calculator.targetProfit', hintKey: 'calculator.targetProfitHint', placeholder: '100.00', step: '0.01', icon: '+' },
    { id: 'maxAttempts' as const, labelKey: 'calculator.maxAttempts', hintKey: 'calculator.maxAttemptsHint', placeholder: '10', step: '1', icon: '#' },
  ]

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CalculatorInputs>({
    resolver: zodResolver(schema),
    defaultValues: { initialStake: 100, odds: 2.0, targetProfit: 100, maxAttempts: 10 },
  })

  function onSubmit(data: CalculatorInputs) {
    onCalculate(data)
  }

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
      {/* Header */}
      <div className="px-6 py-5 border-b border-white/5">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-7 h-7 rounded-lg bg-gradient-gold flex items-center justify-center">
            <Zap className="h-3.5 w-3.5 text-black" />
          </div>
          <h2 className="text-sm font-bold text-white">{t('calculator.title')}</h2>
        </div>
        <p className="text-xs text-white/30 font-mono pl-9">
          {t('calculator.formula')}
        </p>
      </div>

      {/* Form */}
      <div className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {FIELDS.map(field => (
            <div key={field.id}>
              <Label htmlFor={field.id} className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5 block">
                {t(field.labelKey)}
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-amber-400/60 w-4 text-center select-none">
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
                      : 'border-white/10 focus:border-amber-500/50 focus:shadow-[0_0_0_2px_rgba(245,158,11,0.08)] focus:bg-amber-500/5'
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
              whileHover={{ scale: 1.01, boxShadow: '0 0 30px rgba(245,158,11,0.4)' }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 h-11 btn-shimmer text-black font-black text-sm rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-gold"
            >
              {isCalculating ? (
                <span className="animate-pulse">{t('calculator.calculating')}</span>
              ) : (
                <>
                  <Zap className="h-3.5 w-3.5" />
                  {t('calculator.calculate')}
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
