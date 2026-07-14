import { useRef, forwardRef, useImperativeHandle } from 'react'
import { motion } from 'framer-motion'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { CalculationResult, AppSettings } from '@/types'
import { formatCurrency } from '@/utils/formatters'

interface ChartsProps {
  result: CalculationResult
  settings: AppSettings
}

export interface ChartsHandle {
  getChartImages: () => Promise<string[]>
}

const CHART_COLORS = {
  stake: '#6366f1',
  capital: '#8b5cf6',
  loss: '#ef4444',
  risk: '#f59e0b',
  profit: '#10b981',
}

export const Charts = forwardRef<ChartsHandle, ChartsProps>(({ result, settings }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useImperativeHandle(ref, () => ({
    async getChartImages(): Promise<string[]> {
      return []
    },
  }))

  const data = result.rows.map(row => ({
    attempt: `#${row.attempt}`,
    stake: Number(row.stake.toFixed(2)),
    capital: Number(row.totalCapital.toFixed(2)),
    loss: Number(row.accumulatedLoss.toFixed(2)),
    risk: Number((row.totalCapital / result.requiredCapital * 100).toFixed(2)),
  }))

  const fmt = (v: number) => formatCurrency(v, settings.currency, settings.thousandsSeparator, settings.decimalPlaces)

  const charts = [
    {
      title: 'Stake Growth',
      component: (
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis dataKey="attempt" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
            <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" tickFormatter={v => `${v}`} />
            <Tooltip
              contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: 12 }}
              formatter={(v: number) => [fmt(v), 'Stake']}
            />
            <Bar dataKey="stake" fill={CHART_COLORS.stake} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      ),
    },
    {
      title: 'Cumulative Capital',
      component: (
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
            <defs>
              <linearGradient id="capitalGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={CHART_COLORS.capital} stopOpacity={0.3} />
                <stop offset="95%" stopColor={CHART_COLORS.capital} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis dataKey="attempt" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
            <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
            <Tooltip
              contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: 12 }}
              formatter={(v: number) => [fmt(v), 'Capital']}
            />
            <Area
              type="monotone"
              dataKey="capital"
              stroke={CHART_COLORS.capital}
              fill="url(#capitalGrad)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      ),
    },
    {
      title: 'Accumulated Losses',
      component: (
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
            <defs>
              <linearGradient id="lossGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={CHART_COLORS.loss} stopOpacity={0.3} />
                <stop offset="95%" stopColor={CHART_COLORS.loss} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis dataKey="attempt" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
            <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
            <Tooltip
              contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: 12 }}
              formatter={(v: number) => [fmt(v), 'Loss']}
            />
            <Area
              type="monotone"
              dataKey="loss"
              stroke={CHART_COLORS.loss}
              fill="url(#lossGrad)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      ),
    },
    {
      title: 'Risk Evolution (%)',
      component: (
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis dataKey="attempt" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
            <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" tickFormatter={v => `${v}%`} />
            <Tooltip
              contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: 12 }}
              formatter={(v: number) => [`${v.toFixed(1)}%`, 'Capital Used']}
            />
            <Line
              type="monotone"
              dataKey="risk"
              stroke={CHART_COLORS.risk}
              strokeWidth={2}
              dot={{ r: 4, fill: CHART_COLORS.risk }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      ),
    },
  ]

  return (
    <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {charts.map((chart, i) => (
        <motion.div
          key={chart.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.08 }}
        >
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {chart.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">{chart.component}</CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
})

Charts.displayName = 'Charts'
