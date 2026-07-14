import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import type { StaircaseResult, AppSettings } from '@/types'
import { formatCurrency, formatPercent } from '@/utils/formatters'

interface StaircaseTableProps {
  result: StaircaseResult
  settings: AppSettings
}

export function StaircaseTable({ result, settings }: StaircaseTableProps) {
  const { t } = useTranslation()
  const fmt = (v: number) =>
    formatCurrency(v, settings.currency, settings.thousandsSeparator, settings.decimalPlaces)

  const headers = [
    t('staircase.betAmount'),
    t('staircase.return'),
    t('staircase.betProfit'),
    t('staircase.cumulativeProfit'),
    t('staircase.growth'),
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="glass rounded-2xl border border-white/8 overflow-hidden shadow-card"
    >
      <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
        <h3 className="text-sm font-bold text-white">{t('staircase.tableTitle')}</h3>
        <span className="text-xs text-white/30 font-mono">{result.attempts} {t('staircase.tableBets')}</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5">
              <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-white/25">
                #
              </th>
              {headers.map((h, i) => (
                <th
                  key={h}
                  className={`px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-white/25 ${i >= 0 ? 'text-right' : ''}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {result.rows.map((row, i) => (
              <motion.tr
                key={row.attempt}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: i * 0.02 }}
                className="border-b border-white/3 hover:bg-white/3 transition-colors"
              >
                <td className="px-4 py-3">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-black">
                    {row.attempt}
                  </span>
                </td>
                <td className="px-4 py-3 text-right tabular-nums font-semibold text-white">
                  {fmt(row.betAmount)}
                </td>
                <td className="px-4 py-3 text-right tabular-nums text-emerald-400">
                  {fmt(row.grossReturn)}
                </td>
                <td className="px-4 py-3 text-right tabular-nums font-bold text-emerald-400">
                  +{fmt(row.profit)}
                </td>
                <td className="px-4 py-3 text-right tabular-nums text-amber-400">
                  +{fmt(row.cumulativeProfit)}
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    {formatPercent(row.growthPercent)}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}
