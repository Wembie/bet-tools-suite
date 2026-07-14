import { motion } from 'framer-motion'
import { DollarSign, TrendingUp, Percent, Hash } from 'lucide-react'
import type { StaircaseResult, AppSettings } from '@/types'
import { formatCurrency, formatPercent } from '@/utils/formatters'

interface StaircaseDashboardProps {
  result: StaircaseResult
  settings: AppSettings
}

export function StaircaseDashboard({ result, settings }: StaircaseDashboardProps) {
  const fmt = (v: number) =>
    formatCurrency(v, settings.currency, settings.thousandsSeparator, settings.decimalPlaces)

  const metrics = [
    {
      label: 'Final Amount',
      value: fmt(result.finalAmount),
      sub: `Started with ${fmt(result.initialAmount)}`,
      icon: DollarSign,
      border: 'border-emerald-500/20',
      bg: 'bg-emerald-500/8',
      iconBg: 'bg-emerald-500/15 border-emerald-500/25',
      iconColor: 'text-emerald-400',
      valueColor: 'text-emerald-400',
    },
    {
      label: 'Total Profit',
      value: `+${fmt(result.totalProfit)}`,
      sub: 'Net gain if all bets win',
      icon: TrendingUp,
      border: 'border-amber-500/20',
      bg: 'bg-amber-500/8',
      iconBg: 'bg-amber-500/15 border-amber-500/25',
      iconColor: 'text-amber-400',
      valueColor: 'text-amber-400',
    },
    {
      label: 'Total Growth',
      value: formatPercent(result.totalGrowthPercent),
      sub: `Over ${result.attempts} bets`,
      icon: Percent,
      border: 'border-purple-500/20',
      bg: 'bg-purple-500/8',
      iconBg: 'bg-purple-500/15 border-purple-500/25',
      iconColor: 'text-purple-400',
      valueColor: 'text-purple-400',
    },
    {
      label: 'Bets Required',
      value: result.attempts.toString(),
      sub: `All must win · ×${result.odds} odds`,
      icon: Hash,
      border: 'border-white/10',
      bg: 'bg-white/5',
      iconBg: 'bg-white/8 border-white/10',
      iconColor: 'text-white/50',
      valueColor: 'text-white',
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {metrics.map((m, i) => (
        <motion.div
          key={m.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: i * 0.06 }}
          whileHover={{ y: -2 }}
          className={`glass rounded-2xl p-4 border ${m.border} ${m.bg} relative overflow-hidden shadow-card`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
          <div className={`w-8 h-8 rounded-xl border ${m.iconBg} flex items-center justify-center mb-3`}>
            <m.icon className={`h-4 w-4 ${m.iconColor}`} />
          </div>
          <p className="text-[9px] uppercase tracking-widest text-white/30 font-semibold mb-1">{m.label}</p>
          <p className={`text-lg font-black tabular-nums leading-tight ${m.valueColor}`}>{m.value}</p>
          <p className="text-[10px] text-white/25 mt-1 leading-tight">{m.sub}</p>
        </motion.div>
      ))}
    </div>
  )
}
