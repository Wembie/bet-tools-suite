import { motion } from 'framer-motion'
import { DollarSign, Target, TrendingUp, Hash, Zap, BarChart2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
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
  accent?: string
  index: number
}

function MetricCard({ label, value, icon, accent = 'text-primary', index }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card className="border-border/50 hover:border-border transition-colors">
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {label}
              </p>
              <p className={`text-2xl font-bold tracking-tight ${accent}`}>{value}</p>
            </div>
            <div className="p-2 rounded-lg bg-muted">{icon}</div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function Dashboard({ result, settings }: DashboardProps) {
  const metrics = [
    {
      label: 'Required Capital',
      value: formatCurrency(
        result.requiredCapital,
        settings.currency,
        settings.thousandsSeparator,
        settings.decimalPlaces,
      ),
      icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
      accent: 'text-foreground',
    },
    {
      label: 'Target Profit',
      value: formatCurrency(
        result.targetProfit,
        settings.currency,
        settings.thousandsSeparator,
        settings.decimalPlaces,
      ),
      icon: <Target className="h-4 w-4 text-emerald-500" />,
      accent: 'text-emerald-500',
    },
    {
      label: 'Decimal Odds',
      value: result.odds.toFixed(2),
      icon: <TrendingUp className="h-4 w-4 text-muted-foreground" />,
      accent: 'text-foreground',
    },
    {
      label: 'Attempts',
      value: result.attempts.toString(),
      icon: <Hash className="h-4 w-4 text-muted-foreground" />,
      accent: 'text-foreground',
    },
    {
      label: 'Largest Stake',
      value: formatCurrency(
        result.largestStake,
        settings.currency,
        settings.thousandsSeparator,
        settings.decimalPlaces,
      ),
      icon: <Zap className="h-4 w-4 text-amber-500" />,
      accent: 'text-amber-500',
    },
    {
      label: 'Expected ROI',
      value: formatPercent(result.expectedROI),
      icon: <BarChart2 className="h-4 w-4 text-indigo-500" />,
      accent: result.expectedROI > 0 ? 'text-emerald-500' : 'text-destructive',
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {metrics.map((metric, i) => (
        <MetricCard key={metric.label} {...metric} index={i} />
      ))}
    </div>
  )
}
