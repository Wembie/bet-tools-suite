import type { CalculationResult, AppSettings } from '@/types'
import { formatCurrency, formatPercent } from './formatters'
import { APP_NAME } from '@/constants'

export function exportCSV(result: CalculationResult, _settings: AppSettings): void {
  const headers = [
    'Attempt',
    'Stake',
    'Accumulated Loss',
    'Total Capital',
    'Gross Return',
    'Net Profit',
    'ROI',
    'Expected Result',
  ]

  const rows = result.rows.map(row => [
    row.attempt,
    row.stake.toFixed(2),
    row.accumulatedLoss.toFixed(2),
    row.totalCapital.toFixed(2),
    row.grossReturn.toFixed(2),
    row.netProfit.toFixed(2),
    formatPercent(row.roi),
    row.expectedResult,
  ])

  const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  downloadBlob(blob, `bet-tools-${Date.now()}.csv`)
}

export async function exportExcel(result: CalculationResult, _settings: AppSettings): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { default: writeXlsxFile } = await import('write-excel-file/browser' as any)

  const HEADER_STYLE = { fontWeight: 'bold', backgroundColor: '#0F172A', color: '#FFFFFF' }

  const headers = [
    { value: '#', ...HEADER_STYLE },
    { value: 'Stake', ...HEADER_STYLE },
    { value: 'Acc. Loss', ...HEADER_STYLE },
    { value: 'Total Capital', ...HEADER_STYLE },
    { value: 'Gross Return', ...HEADER_STYLE },
    { value: 'Net Profit', ...HEADER_STYLE },
    { value: 'ROI %', ...HEADER_STYLE },
    { value: 'Result', ...HEADER_STYLE },
  ]

  const dataRows = result.rows.map(row => [
    { type: Number, value: row.attempt },
    { type: Number, value: Number(row.stake.toFixed(2)), format: '#,##0.00' },
    { type: Number, value: Number(row.accumulatedLoss.toFixed(2)), format: '#,##0.00' },
    { type: Number, value: Number(row.totalCapital.toFixed(2)), format: '#,##0.00' },
    { type: Number, value: Number(row.grossReturn.toFixed(2)), format: '#,##0.00' },
    { type: Number, value: Number(row.netProfit.toFixed(2)), format: '#,##0.00' },
    { type: Number, value: Number(row.roi.toFixed(2)), format: '0.00' },
    { type: String, value: row.expectedResult },
  ])

  await writeXlsxFile([headers, ...dataRows], {
    fileName: `bet-tools-${Date.now()}.xlsx`,
    columns: [
      { width: 6 }, { width: 14 }, { width: 14 }, { width: 14 },
      { width: 14 }, { width: 14 }, { width: 10 }, { width: 18 },
    ],
  })
}

export async function exportPDF(
  result: CalculationResult,
  settings: AppSettings,
  chartImages?: string[],
): Promise<void> {
  const { default: jsPDF } = await import('jspdf')
  const { default: autoTable } = await import('jspdf-autotable')

  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' })
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const now = new Date().toLocaleString()

  // Header
  doc.setFillColor(15, 23, 42)
  doc.rect(0, 0, pageWidth, 20, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.text(APP_NAME, 10, 13)
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.text(`v${__APP_VERSION__} — Generated: ${now}`, pageWidth - 10, 13, { align: 'right' })

  // Summary cards
  doc.setTextColor(15, 23, 42)
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.text('SUMMARY', 10, 30)

  const summaryData = [
    ['Required Capital', formatCurrency(result.requiredCapital, settings.currency)],
    ['Target Profit', formatCurrency(result.targetProfit, settings.currency)],
    ['Odds', result.odds.toString()],
    ['Attempts', result.attempts.toString()],
    ['Largest Stake', formatCurrency(result.largestStake, settings.currency)],
    ['Expected ROI', formatPercent(result.expectedROI)],
  ]

  autoTable(doc, {
    startY: 33,
    head: [['Metric', 'Value']],
    body: summaryData,
    theme: 'grid',
    headStyles: { fillColor: [99, 102, 241], textColor: 255 },
    styles: { fontSize: 9 },
    columnStyles: { 0: { fontStyle: 'bold' } },
    margin: { left: 10, right: pageWidth / 2 + 5 },
  })

  // Table
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.text('RECOVERY PLAN', 10, 75)

  autoTable(doc, {
    startY: 78,
    head: [
      [
        '#',
        'Stake',
        'Acc. Loss',
        'Total Capital',
        'Gross Return',
        'Net Profit',
        'ROI',
        'Result',
      ],
    ],
    body: result.rows.map(row => [
      row.attempt,
      formatCurrency(row.stake, settings.currency),
      formatCurrency(row.accumulatedLoss, settings.currency),
      formatCurrency(row.totalCapital, settings.currency),
      formatCurrency(row.grossReturn, settings.currency),
      formatCurrency(row.netProfit, settings.currency),
      formatPercent(row.roi),
      row.expectedResult,
    ]),
    theme: 'striped',
    headStyles: { fillColor: [15, 23, 42], textColor: 255 },
    styles: { fontSize: 8 },
    alternateRowStyles: { fillColor: [248, 250, 252] },
  })

  // Charts
  if (chartImages && chartImages.length > 0) {
    doc.addPage()
    doc.setFillColor(15, 23, 42)
    doc.rect(0, 0, pageWidth, 20, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.text('CHARTS', 10, 13)

    const cols = 2
    const chartW = (pageWidth - 30) / cols
    const chartH = 70
    chartImages.forEach((img, i) => {
      const col = i % cols
      const row = Math.floor(i / cols)
      const x = 10 + col * (chartW + 10)
      const y = 25 + row * (chartH + 10)
      try {
        doc.addImage(img, 'PNG', x, y, chartW, chartH)
      } catch {
        // ignore if image fails
      }
    })
  }

  // Footer on each page
  const totalPages = doc.getNumberOfPages()
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i)
    doc.setFillColor(15, 23, 42)
    doc.rect(0, pageHeight - 10, pageWidth, 10, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(7)
    doc.text(
      `${APP_NAME} — For educational purposes only. Bet responsibly.`,
      10,
      pageHeight - 4,
    )
    doc.text(`Page ${i} of ${totalPages}`, pageWidth - 10, pageHeight - 4, { align: 'right' })
  }

  doc.save(`bet-tools-${Date.now()}.pdf`)
}

function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
