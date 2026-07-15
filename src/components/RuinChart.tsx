import { motion } from 'framer-motion'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine,
} from 'recharts'
import { useTranslation } from 'react-i18next'
import type { RuinResult } from '@/types'

interface RuinChartProps {
  result: RuinResult
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: number }) {
  if (!active || !payload?.length) return null
  return (
    <div className="glass rounded-xl border border-white/10 px-3 py-2.5 text-xs shadow-card">
      <p className="text-white/40 mb-1">Bet #{label}</p>
      <p className="font-black text-red-300">{payload[0].value.toFixed(1)}% survival</p>
    </div>
  )
}

export function RuinChart({ result }: RuinChartProps) {
  const { t } = useTranslation()
  const data = result.survivalCurve

  const ruinColor =
    result.ruinProbability >= 80 ? '#ef4444' :
    result.ruinProbability >= 40 ? '#f97316' :
    '#10b981'

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="glass rounded-2xl border border-white/8 overflow-hidden shadow-card"
    >
      <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-white">{t('ruin.survivalTitle')}</h3>
          <p className="text-[10px] text-white/25 mt-0.5">{t('ruin.survivalSub')}</p>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-white/30">
          <span className="w-2 h-2 rounded-full" style={{ background: ruinColor }} />
          Win rate {result.winRate}% · Odds {result.odds}
        </div>
      </div>

      <div className="p-4">
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="survivalGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={ruinColor} stopOpacity={0.25} />
                <stop offset="95%" stopColor={ruinColor} stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis
              dataKey="bets"
              tick={{ fill: 'rgba(255,255,255,0.25)', fontSize: 10 }}
              axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
              tickLine={false}
              label={{ value: t('ruin.betsAxis'), position: 'insideBottom', offset: -2, fill: 'rgba(255,255,255,0.2)', fontSize: 10 }}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fill: 'rgba(255,255,255,0.25)', fontSize: 10 }}
              axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
              tickLine={false}
              tickFormatter={v => `${v}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={50} stroke="rgba(255,255,255,0.1)" strokeDasharray="4 4" />
            <Area
              type="monotone"
              dataKey="survivalProbability"
              stroke={ruinColor}
              strokeWidth={2}
              fill="url(#survivalGrad)"
              dot={false}
              activeDot={{ r: 4, fill: ruinColor, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}
