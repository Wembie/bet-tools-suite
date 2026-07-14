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
import type { CalculationResult, AppSettings } from '@/types'
import { formatCurrency } from '@/utils/formatters'

interface ChartsProps {
  result: CalculationResult
  settings: AppSettings
}

export interface ChartsHandle {
  getChartImages: () => Promise<string[]>
}

const COLORS = {
  stake: '#f59e0b',
  capital: '#a855f7',
  loss: '#ef4444',
  risk: '#f59e0b',
  grid: 'rgba(255,255,255,0.04)',
  axis: 'rgba(255,255,255,0.2)',
}

const tooltipStyle = {
  background: 'rgba(10,10,20,0.95)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '10px',
  fontSize: 12,
  color: '#fff',
  boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
}

const tickStyle = { fontSize: 10, fill: 'rgba(255,255,255,0.25)' }

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
      subtitle: 'per attempt',
      accent: COLORS.stake,
      component: (
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data} margin={{ top: 5, right: 8, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="stakeBar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={COLORS.stake} stopOpacity={1} />
                <stop offset="100%" stopColor={COLORS.stake} stopOpacity={0.4} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} vertical={false} />
            <XAxis dataKey="attempt" tick={tickStyle} axisLine={false} tickLine={false} />
            <YAxis tick={tickStyle} axisLine={false} tickLine={false} tickFormatter={v => `${v}`} width={40} />
            <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(255,255,255,0.03)' }} formatter={(v: number) => [fmt(v), 'Stake']} />
            <Bar dataKey="stake" fill="url(#stakeBar)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      ),
    },
    {
      title: 'Cumulative Capital',
      subtitle: 'total invested',
      accent: COLORS.capital,
      component: (
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={data} margin={{ top: 5, right: 8, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="capitalGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={COLORS.capital} stopOpacity={0.35} />
                <stop offset="95%" stopColor={COLORS.capital} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} vertical={false} />
            <XAxis dataKey="attempt" tick={tickStyle} axisLine={false} tickLine={false} />
            <YAxis tick={tickStyle} axisLine={false} tickLine={false} width={40} />
            <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: 'rgba(168,85,247,0.2)', strokeWidth: 1 }} formatter={(v: number) => [fmt(v), 'Capital']} />
            <Area type="monotone" dataKey="capital" stroke={COLORS.capital} fill="url(#capitalGrad)" strokeWidth={2} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      ),
    },
    {
      title: 'Accumulated Losses',
      subtitle: 'loss exposure',
      accent: COLORS.loss,
      component: (
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={data} margin={{ top: 5, right: 8, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="lossGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={COLORS.loss} stopOpacity={0.3} />
                <stop offset="95%" stopColor={COLORS.loss} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} vertical={false} />
            <XAxis dataKey="attempt" tick={tickStyle} axisLine={false} tickLine={false} />
            <YAxis tick={tickStyle} axisLine={false} tickLine={false} width={40} />
            <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: 'rgba(239,68,68,0.2)', strokeWidth: 1 }} formatter={(v: number) => [fmt(v), 'Loss']} />
            <Area type="monotone" dataKey="loss" stroke={COLORS.loss} fill="url(#lossGrad)" strokeWidth={2} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      ),
    },
    {
      title: 'Risk Evolution',
      subtitle: '% capital used',
      accent: COLORS.risk,
      component: (
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data} margin={{ top: 5, right: 8, left: 0, bottom: 5 }}>
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} vertical={false} />
            <XAxis dataKey="attempt" tick={tickStyle} axisLine={false} tickLine={false} />
            <YAxis tick={tickStyle} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} width={40} />
            <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: 'rgba(245,158,11,0.2)', strokeWidth: 1 }} formatter={(v: number) => [`${v.toFixed(1)}%`, 'Capital Used']} />
            <Line
              type="monotone"
              dataKey="risk"
              stroke={COLORS.risk}
              strokeWidth={2}
              dot={{ r: 3, fill: COLORS.risk, strokeWidth: 0 }}
              activeDot={{ r: 5, fill: COLORS.risk, strokeWidth: 0 }}
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
          className="glass rounded-2xl border border-white/8 overflow-hidden shadow-card group hover:border-white/12 transition-colors"
        >
          <div className="px-5 pt-5 pb-3 flex items-start justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">{chart.title}</h3>
              <p className="text-[10px] uppercase tracking-widest mt-0.5" style={{ color: chart.accent + 'aa' }}>
                {chart.subtitle}
              </p>
            </div>
            <div className="w-2 h-2 rounded-full mt-1.5 animate-pulse-gold" style={{ background: chart.accent }} />
          </div>
          <div className="px-2 pb-4">
            {chart.component}
          </div>
        </motion.div>
      ))}
    </div>
  )
})

Charts.displayName = 'Charts'
