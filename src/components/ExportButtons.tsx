import { useState } from 'react'
import { FileText, FileSpreadsheet, File, Loader2 } from 'lucide-react'
import type { CalculationResult, AppSettings } from '@/types'
import { exportCSV, exportExcel, exportPDF } from '@/utils/exporters'

interface ExportButtonsProps {
  result: CalculationResult
  settings: AppSettings
}

type ExportFormat = 'csv' | 'excel' | 'pdf'

const BUTTONS = [
  { format: 'csv' as ExportFormat, label: 'CSV', icon: FileText },
  { format: 'excel' as ExportFormat, label: 'Excel', icon: FileSpreadsheet },
  { format: 'pdf' as ExportFormat, label: 'PDF', icon: File },
]

export function ExportButtons({ result, settings }: ExportButtonsProps) {
  const [loading, setLoading] = useState<ExportFormat | null>(null)

  async function handleExport(format: ExportFormat) {
    setLoading(format)
    try {
      if (format === 'csv') exportCSV(result, settings)
      else if (format === 'excel') await exportExcel(result, settings)
      else await exportPDF(result, settings)
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] uppercase tracking-widest text-white/25 mr-1">Export</span>
      {BUTTONS.map(({ format, label, icon: Icon }) => (
        <button
          key={format}
          onClick={() => handleExport(format)}
          disabled={loading !== null}
          className="h-8 px-3 rounded-lg border border-white/10 bg-white/5 text-white/40 hover:text-white/80 hover:border-white/20 hover:bg-white/8 transition-all text-xs font-medium flex items-center gap-1.5 disabled:opacity-40"
        >
          {loading === format ? (
            <Loader2 className="h-3 w-3 animate-spin" />
          ) : (
            <Icon className="h-3 w-3" />
          )}
          {label}
        </button>
      ))}
    </div>
  )
}
