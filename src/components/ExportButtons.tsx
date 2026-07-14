import { useState } from 'react'
import { FileText, FileSpreadsheet, File, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { CalculationResult, AppSettings } from '@/types'
import { exportCSV, exportExcel, exportPDF } from '@/utils/exporters'

interface ExportButtonsProps {
  result: CalculationResult
  settings: AppSettings
}

type ExportFormat = 'csv' | 'excel' | 'pdf'

export function ExportButtons({ result, settings }: ExportButtonsProps) {
  const [loading, setLoading] = useState<ExportFormat | null>(null)

  async function handleExport(format: ExportFormat) {
    setLoading(format)
    try {
      if (format === 'csv') exportCSV(result, settings)
      else if (format === 'excel') exportExcel(result, settings)
      else await exportPDF(result, settings)
    } finally {
      setLoading(null)
    }
  }

  const buttons = [
    { format: 'csv' as ExportFormat, label: 'CSV', icon: FileText },
    { format: 'excel' as ExportFormat, label: 'Excel', icon: FileSpreadsheet },
    { format: 'pdf' as ExportFormat, label: 'PDF', icon: File },
  ]

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground mr-1">Export:</span>
      {buttons.map(({ format, label, icon: Icon }) => (
        <Button
          key={format}
          variant="outline"
          size="sm"
          className="h-8 gap-1.5 text-xs"
          onClick={() => handleExport(format)}
          disabled={loading !== null}
        >
          {loading === format ? (
            <Loader2 className="h-3 w-3 animate-spin" />
          ) : (
            <Icon className="h-3 w-3" />
          )}
          {label}
        </Button>
      ))}
    </div>
  )
}
