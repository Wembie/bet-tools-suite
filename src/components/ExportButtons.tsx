import { useState } from 'react'
import { FileText, FileSpreadsheet, File, Loader2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { CalculationResult, AppSettings } from '@/types'
import { exportCSV, exportExcel, exportPDF } from '@/utils/exporters'

interface ExportButtonsProps {
  result: CalculationResult
  settings: AppSettings
}

type ExportFormat = 'csv' | 'excel' | 'pdf'

export function ExportButtons({ result, settings }: ExportButtonsProps) {
  const { t } = useTranslation()
  const [loading, setLoading] = useState<ExportFormat | null>(null)

  const BUTTONS: { format: ExportFormat; labelKey: string; icon: React.ElementType }[] = [
    { format: 'csv', labelKey: 'export.csv', icon: FileText },
    { format: 'excel', labelKey: 'export.excel', icon: FileSpreadsheet },
    { format: 'pdf', labelKey: 'export.pdf', icon: File },
  ]

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
      <span className="text-[10px] uppercase tracking-widest text-white/25 mr-1">{t('export.label')}</span>
      {BUTTONS.map(({ format, labelKey, icon: Icon }) => (
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
          {t(labelKey)}
        </button>
      ))}
    </div>
  )
}
