import { motion } from 'framer-motion'
import { DollarSign, Target, TrendingUp, Hash, Zap, BarChart2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { CalculationResult, AppSettings } from '@/types'
import { formatCurrency, formatPercent } from '@/utils/formatters'

interface DashboardProps {
  result: CalculationResult
  settings: AppSettings
}

interface MetricCardProps {
  label: string
  value: string
  icon: React.ReactNode
  accentClass: string
  bgClass: string
  borderClass: string
  index: number
}

function MetricCard({ label, value, icon, accentClass, bgClass, borderClass, index }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.25, 0.4, 0.25, 1] }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className={`relative overflow-hidden rounded-2xl border ${borderClass} ${bgClass} p-5 shadow-card card-lift`}
    >
      <div className="absolute inset-0 bg-card-shine pointer-events-none" />
      <div className="relative flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-2">
            {label}
          </p>
          <p className={`text-2xl font-black tabular-nums tracking-tight ${accentClass} truncate`}>
            {value}
          </p>
        </div>
        <div className={`shrink-0 p-2.5 rounded-xl ${bgClass} border ${borderClass}`}>
          {icon}
        </div>
      </div>
    </motion.div>
  )
}

export function Dashboard({ result, settings }: DashboardProps) {
  const { t } = useTranslation()
  const fmt = (v: number) =>
    formatCurrency(v, settings.currency, settings.thousandsSeparator, settings.decimalPlaces)

  const metrics = [
    {
      label: t('dashboard.requiredCapital'),
      value: fmt(result.requiredCapital),
      icon: <DollarSign className="h-4 w-4 text-amber-400" />,
      accentClass: 'text-white',
      bgClass: 'bg-amber-500/5',
      borderClass: 'border-amber-500/20',
    },
    {
      label: t('dashboard.targetProfit'),
      value: fmt(result.targetProfit),
      icon: <Target className="h-4 w-4 text-emerald-400" />,
      accentClass: 'text-emerald-400',
      bgClass: 'bg-emerald-500/5',
      borderClass: 'border-emerald-500/20',
    },
    {
      label: t('dashboard.odds'),
      value: result.odds.toFixed(2),
      icon: <TrendingUp className="h-4 w-4 text-violet-400" />,
      accentClass: 'text-white',
      bgClass: 'bg-violet-500/5',
      borderClass: 'border-violet-500/20',
    },
    {
      label: t('dashboard.attempts'),
      value: result.attempts.toString(),
      icon: <Hash className="h-4 w-4 text-blue-400" />,
      accentClass: 'text-white',
      bgClass: 'bg-blue-500/5',
      borderClass: 'border-blue-500/20',
    },
    {
      label: t('dashboard.largestStake'),
      value: fmt(result.largestStake),
      icon: <Zap className="h-4 w-4 text-amber-400" />,
      accentClass: 'text-amber-400',
      bgClass: 'bg-amber-500/5',
      borderClass: 'border-amber-500/20',
    },
    {
      label: t('dashboard.expectedROI'),
      value: formatPercent(result.expectedROI),
      icon: <BarChart2 className="h-4 w-4 text-emerald-400" />,
      accentClass: result.expectedROI > 0 ? 'text-emerald-400' : 'text-red-400',
      bgClass: 'bg-emerald-500/5',
      borderClass: 'border-emerald-500/20',
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {metrics.map((m, i) => (
        <MetricCard key={m.label} {...m} index={i} />
      ))}
    </div>
  )
}
