import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpDown, ArrowUp, ArrowDown, Copy, Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { CalculationResult, AppSettings, SortConfig, SortKey } from '@/types'
import { formatCurrency, formatPercent } from '@/utils/formatters'

interface RecoveryTableProps {
  result: CalculationResult
  settings: AppSettings
}

export function RecoveryTable({ result, settings }: RecoveryTableProps) {
  const { t } = useTranslation()
  const [sort, setSort] = useState<SortConfig>({ key: 'attempt', direction: 'asc' })
  const [copiedRow, setCopiedRow] = useState<number | null>(null)

  const fmt = useCallback(
    (v: number) =>
      formatCurrency(v, settings.currency, settings.thousandsSeparator, settings.decimalPlaces),
    [settings],
  )

  const sortedRows = [...result.rows].sort((a, b) => {
    const aVal = a[sort.key]
    const bVal = b[sort.key]
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sort.direction === 'asc' ? aVal - bVal : bVal - aVal
    }
    return sort.direction === 'asc'
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal))
  })

  function handleSort(key: SortKey) {
    setSort(prev =>
      prev.key === key
        ? { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
        : { key, direction: 'asc' },
    )
  }

  function SortIcon({ col }: { col: SortKey }) {
    if (sort.key !== col) return <ArrowUpDown className="h-3 w-3 opacity-20" />
    return sort.direction === 'asc'
      ? <ArrowUp className="h-3 w-3 text-amber-400" />
      : <ArrowDown className="h-3 w-3 text-amber-400" />
  }

  function copyRow(attempt: number) {
    const row = result.rows.find(r => r.attempt === attempt)
    if (!row) return
    const text = [
      `#${row.attempt}`,
      `Stake: ${fmt(row.stake)}`,
      `Loss: ${fmt(row.accumulatedLoss)}`,
      `Capital: ${fmt(row.totalCapital)}`,
      `Return: ${fmt(row.grossReturn)}`,
      `Profit: ${fmt(row.netProfit)}`,
      `ROI: ${formatPercent(row.roi)}`,
    ].join(' | ')
    navigator.clipboard.writeText(text).then(() => {
      setCopiedRow(attempt)
      setTimeout(() => setCopiedRow(null), 1500)
    })
  }

  const columns: { key: SortKey; labelKey: string; align?: string }[] = [
    { key: 'attempt', labelKey: 'table.attempt' },
    { key: 'stake', labelKey: 'table.stake', align: 'text-right' },
    { key: 'accumulatedLoss', labelKey: 'table.accLoss', align: 'text-right' },
    { key: 'totalCapital', labelKey: 'table.capital', align: 'text-right' },
    { key: 'grossReturn', labelKey: 'table.grossReturn', align: 'text-right' },
    { key: 'netProfit', labelKey: 'table.netProfit', align: 'text-right' },
    { key: 'roi', labelKey: 'table.roi', align: 'text-right' },
    { key: 'expectedResult', labelKey: 'table.result', align: 'text-right' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="glass rounded-2xl border border-white/8 overflow-hidden shadow-card"
    >
      <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
        <h3 className="text-sm font-bold text-white">{t('table.title')}</h3>
        <span className="text-xs text-white/30 font-mono">{result.rows.length} {t('table.attempts')}</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5">
              {columns.map(col => (
                <th
                  key={col.key}
                  className={`px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-white/25 ${col.align ?? ''}`}
                >
                  <button
                    className="inline-flex items-center gap-1 hover:text-white/60 transition-colors"
                    onClick={() => handleSort(col.key)}
                  >
                    {t(col.labelKey)}
                    <SortIcon col={col.key} />
                  </button>
                </th>
              ))}
              <th className="px-4 py-3 w-10" />
            </tr>
          </thead>
          <tbody>
            {sortedRows.map((row, i) => (
              <motion.tr
                key={row.attempt}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: i * 0.02 }}
                className="border-b border-white/3 hover:bg-white/3 transition-colors group"
              >
                <td className="px-4 py-3">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-black">
                    {row.attempt}
                  </span>
                </td>
                <td className="px-4 py-3 text-right tabular-nums font-semibold text-white">
                  {fmt(row.stake)}
                </td>
                <td className="px-4 py-3 text-right tabular-nums text-red-400/70">
                  {row.accumulatedLoss > 0 ? `-${fmt(row.accumulatedLoss)}` : '—'}
                </td>
                <td className="px-4 py-3 text-right tabular-nums text-white/60">
                  {fmt(row.totalCapital)}
                </td>
                <td className="px-4 py-3 text-right tabular-nums text-emerald-400">
                  {fmt(row.grossReturn)}
                </td>
                <td className="px-4 py-3 text-right tabular-nums font-bold text-emerald-400">
                  +{fmt(row.netProfit)}
                </td>
                <td className="px-4 py-3 text-right">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      row.roi > 20
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : row.roi > 10
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-white/5 text-white/30 border border-white/10'
                    }`}
                  >
                    {formatPercent(row.roi)}
                  </span>
                </td>
                <td className="px-4 py-3 text-right text-[11px] text-white/25">
                  {row.expectedResult}
                </td>
                <td className="px-4 py-3">
                  <button
                    className="opacity-0 group-hover:opacity-100 transition-opacity w-7 h-7 rounded-lg hover:bg-white/8 flex items-center justify-center text-white/30 hover:text-white/70"
                    onClick={() => copyRow(row.attempt)}
                  >
                    {copiedRow === row.attempt ? (
                      <Check className="h-3 w-3 text-emerald-400" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}
