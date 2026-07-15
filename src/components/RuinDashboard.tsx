import { motion } from 'framer-motion'
import { AlertTriangle, TrendingDown, Target, Zap, DollarSign } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { RuinResult, AppSettings } from '@/types'
import { formatCurrency, formatPercent } from '@/utils/formatters'

interface RuinDashboardProps {
  result: RuinResult
  settings: AppSettings
}

export function RuinDashboard({ result, settings }: RuinDashboardProps) {
  const { t } = useTranslation()
  const fmt = (v: number) =>
    formatCurrency(v, settings.currency, settings.thousandsSeparator, settings.decimalPlaces)

  const ruinPct = result.ruinProbability
  const ruinColor =
    ruinPct >= 80 ? { border: 'border-red-500/35', bg: 'bg-red-500/8', icon: 'bg-red-500/15 border-red-500/30', text: 'text-red-400', val: 'text-red-400' } :
    ruinPct >= 40 ? { border: 'border-orange-500/35', bg: 'bg-orange-500/8', icon: 'bg-orange-500/15 border-orange-500/30', text: 'text-orange-400', val: 'text-orange-400' } :
                   { border: 'border-emerald-500/25', bg: 'bg-emerald-500/6', icon: 'bg-emerald-500/15 border-emerald-500/25', text: 'text-emerald-400', val: 'text-emerald-400' }

  const evColor = result.evPerBetPct >= 0 ? 'text-emerald-400' : 'text-red-400'

  const metrics = [
    {
      label: t('ruin.ruinProbability'),
      value: `${ruinPct.toFixed(1)}%`,
      sub: ruinPct >= 99.9 ? t('ruin.certain') : `${(100 - ruinPct).toFixed(1)}% ${t('ruin.survivalAxis')}`,
      icon: AlertTriangle,
      border: ruinColor.border,
      bg: ruinColor.bg,
      iconBg: ruinColor.icon,
      iconColor: ruinColor.val,
      valueColor: ruinColor.val,
    },
    {
      label: t('ruin.maxLosses'),
      value: result.maxConsecutiveLosses.toString(),
      sub: t('ruin.maxLossesSub'),
      icon: TrendingDown,
      border: 'border-amber-500/20',
      bg: 'bg-amber-500/6',
      iconBg: 'bg-amber-500/15 border-amber-500/25',
      iconColor: 'text-amber-400',
      valueColor: 'text-amber-400',
    },
    {
      label: t('ruin.breakEven'),
      value: formatPercent(result.breakEvenWinRate),
      sub: t('ruin.breakEvenSub'),
      icon: Target,
      border: result.winRate >= result.breakEvenWinRate ? 'border-emerald-500/20' : 'border-red-500/20',
      bg: result.winRate >= result.breakEvenWinRate ? 'bg-emerald-500/6' : 'bg-red-500/6',
      iconBg: result.winRate >= result.breakEvenWinRate ? 'bg-emerald-500/15 border-emerald-500/25' : 'bg-red-500/15 border-red-500/25',
      iconColor: result.winRate >= result.breakEvenWinRate ? 'text-emerald-400' : 'text-red-400',
      valueColor: result.winRate >= result.breakEvenWinRate ? 'text-emerald-400' : 'text-red-400',
    },
    {
      label: t('ruin.evPerBet'),
      value: `${result.evPerBetPct >= 0 ? '+' : ''}${result.evPerBetPct.toFixed(2)}%`,
      sub: t('ruin.evPerBetSub'),
      icon: Zap,
      border: result.evPerBetPct >= 0 ? 'border-emerald-500/20' : 'border-red-500/20',
      bg: result.evPerBetPct >= 0 ? 'bg-emerald-500/6' : 'bg-red-500/6',
      iconBg: result.evPerBetPct >= 0 ? 'bg-emerald-500/15 border-emerald-500/25' : 'bg-red-500/15 border-red-500/25',
      iconColor: evColor,
      valueColor: evColor,
    },
    {
      label: t('ruin.kellyStake'),
      value: result.kellyFraction > 0 ? fmt(result.kellyStake) : '—',
      sub: result.kellyFraction > 0
        ? `${result.kellyFraction.toFixed(1)}% ${t('ruin.bankroll')}`
        : t('ruin.negativeEdge'),
      icon: DollarSign,
      border: 'border-purple-500/20',
      bg: 'bg-purple-500/6',
      iconBg: 'bg-purple-500/15 border-purple-500/25',
      iconColor: 'text-purple-400',
      valueColor: 'text-purple-400',
    },
  ]

  return (
    <div className="space-y-4">
      {/* Edge warning banner */}
      {result.evPerBetPct < 0 && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/8 border border-red-500/20 text-red-400 text-xs font-semibold"
        >
          <AlertTriangle className="h-4 w-4 shrink-0" />
          {t('ruin.negativeEdge')}
        </motion.div>
      )}
      {result.evPerBetPct > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-500/6 border border-emerald-500/18 text-emerald-400 text-xs font-semibold"
        >
          <Zap className="h-4 w-4 shrink-0" />
          {t('ruin.positiveEdge')}
        </motion.div>
      )}

      {/* Metrics grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
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
    </div>
  )
}
