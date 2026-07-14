import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpDown, ArrowUp, ArrowDown, Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { CalculationResult, AppSettings, SortConfig, SortKey } from '@/types'
import { formatCurrency, formatPercent } from '@/utils/formatters'

interface RecoveryTableProps {
  result: CalculationResult
  settings: AppSettings
}

export function RecoveryTable({ result, settings }: RecoveryTableProps) {
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
    if (sort.key !== col) return <ArrowUpDown className="h-3 w-3 opacity-40" />
    return sort.direction === 'asc' ? (
      <ArrowUp className="h-3 w-3" />
    ) : (
      <ArrowDown className="h-3 w-3" />
    )
  }

  function copyRow(attempt: number) {
    const row = result.rows.find(r => r.attempt === attempt)
    if (!row) return
    const text = [
      `Attempt: ${row.attempt}`,
      `Stake: ${fmt(row.stake)}`,
      `Acc. Loss: ${fmt(row.accumulatedLoss)}`,
      `Total Capital: ${fmt(row.totalCapital)}`,
      `Gross Return: ${fmt(row.grossReturn)}`,
      `Net Profit: ${fmt(row.netProfit)}`,
      `ROI: ${formatPercent(row.roi)}`,
      `Result: ${row.expectedResult}`,
    ].join(' | ')
    navigator.clipboard.writeText(text).then(() => {
      setCopiedRow(attempt)
      setTimeout(() => setCopiedRow(null), 1500)
    })
  }

  const columns: { key: SortKey; label: string; align?: string }[] = [
    { key: 'attempt', label: '#' },
    { key: 'stake', label: 'Stake', align: 'text-right' },
    { key: 'accumulatedLoss', label: 'Acc. Loss', align: 'text-right' },
    { key: 'totalCapital', label: 'Capital', align: 'text-right' },
    { key: 'grossReturn', label: 'Gross Return', align: 'text-right' },
    { key: 'netProfit', label: 'Net Profit', align: 'text-right' },
    { key: 'roi', label: 'ROI', align: 'text-right' },
    { key: 'expectedResult', label: 'Result', align: 'text-right' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Recovery Plan</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50 bg-muted/30">
                  {columns.map(col => (
                    <th
                      key={col.key}
                      className={`px-4 py-3 font-medium text-muted-foreground ${col.align ?? ''}`}
                    >
                      <button
                        className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
                        onClick={() => handleSort(col.key)}
                      >
                        {col.label}
                        <SortIcon col={col.key} />
                      </button>
                    </th>
                  ))}
                  <th className="px-4 py-3 w-10" />
                </tr>
              </thead>
              <tbody>
                {sortedRows.map((row, i) => (
                  <tr
                    key={row.attempt}
                    className={`border-b border-border/30 hover:bg-muted/20 transition-colors ${
                      i % 2 === 0 ? '' : 'bg-muted/10'
                    }`}
                  >
                    <td className="px-4 py-3 font-medium tabular-nums">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold">
                        {row.attempt}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums font-medium">
                      {fmt(row.stake)}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums text-destructive">
                      {row.accumulatedLoss > 0 ? `-${fmt(row.accumulatedLoss)}` : '—'}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums">{fmt(row.totalCapital)}</td>
                    <td className="px-4 py-3 text-right tabular-nums text-emerald-500">
                      {fmt(row.grossReturn)}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums text-emerald-500 font-medium">
                      +{fmt(row.netProfit)}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums">
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          row.roi > 20
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : row.roi > 10
                              ? 'bg-amber-500/10 text-amber-400'
                              : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {formatPercent(row.roi)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-xs text-muted-foreground">
                      {row.expectedResult}
                    </td>
                    <td className="px-4 py-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => copyRow(row.attempt)}
                      >
                        {copiedRow === row.attempt ? (
                          <Check className="h-3 w-3 text-emerald-500" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
