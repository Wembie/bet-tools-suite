import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Layers, RotateCcw } from 'lucide-react'
import { Label } from '@/components/ui/label'
import type { StaircaseInputs } from '@/types'

const schema = z.object({
  initialAmount: z.number({ invalid_type_error: 'Required' }).positive('Must be > 0'),
  odds: z.number({ invalid_type_error: 'Required' }).gt(1, 'Must be > 1.00'),
  attempts: z.number({ invalid_type_error: 'Required' }).int().min(1).max(365, 'Max 365'),
})

interface StaircaseCalculatorProps {
  onCalculate: (inputs: StaircaseInputs) => void
  onReset: () => void
  isCalculating: boolean
}

const FIELDS = [
  { id: 'initialAmount', label: 'Initial Amount', placeholder: '20000', hint: 'Starting bankroll', step: '0.01', icon: '$' },
  { id: 'odds', label: 'Decimal Odds', placeholder: '1.30', hint: 'Multiplier per bet (must be > 1.00)', step: '0.01', icon: '×' },
  { id: 'attempts', label: 'Bets', placeholder: '18', hint: 'Number of bets in the challenge (max 365)', step: '1', icon: '#' },
] as const

export function StaircaseCalculator({ onCalculate, onReset, isCalculating }: StaircaseCalculatorProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StaircaseInputs>({
    resolver: zodResolver(schema),
    defaultValues: { initialAmount: 20000, odds: 1.3, attempts: 18 },
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
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center">
            <Layers className="h-3.5 w-3.5 text-white" />
          </div>
          <h2 className="text-sm font-bold text-white">Reto Escalera</h2>
        </div>
        <p className="text-xs text-white/30 font-mono pl-9">
          Total(n) = Inicial × Cuota^n
        </p>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit(onCalculate)} className="space-y-4">
          {FIELDS.map(field => (
            <div key={field.id}>
              <Label htmlFor={field.id} className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5 block">
                {field.label}
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-purple-400/70 w-4 text-center select-none">
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
                      : 'border-white/10 focus:border-purple-500/50 focus:shadow-[0_0_0_2px_rgba(168,85,247,0.08)] focus:bg-purple-500/5'
                    }`}
                  {...register(field.id, { valueAsNumber: true })}
                />
              </div>
              <p className={`text-[11px] mt-1 ${errors[field.id] ? 'text-red-400' : 'text-white/25'}`}>
                {errors[field.id]?.message ?? field.hint}
              </p>
            </div>
          ))}

          <div className="flex gap-2 pt-2">
            <motion.button
              type="submit"
              disabled={isCalculating}
              whileHover={{ scale: 1.01, boxShadow: '0 0 30px rgba(168,85,247,0.4)' }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 h-11 bg-gradient-to-r from-purple-600 to-violet-500 text-white font-black text-sm rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(168,85,247,0.3)]"
            >
              {isCalculating ? (
                <span className="animate-pulse">Calculando...</span>
              ) : (
                <>
                  <Layers className="h-3.5 w-3.5" />
                  Calcular
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
