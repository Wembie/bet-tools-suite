import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Copy, RotateCcw, Clock, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { HistoryEntry, AppSettings } from '@/types'
import { formatCurrency, formatDate } from '@/utils/formatters'

interface HistoryProps {
  history: HistoryEntry[]
  settings: AppSettings
  onLoad: (entry: HistoryEntry) => void
  onDelete: (id: string) => void
  onDuplicate: (id: string) => void
  onClear: () => void
}

export function History({
  history,
  settings,
  onLoad,
  onDelete,
  onDuplicate,
  onClear,
}: HistoryProps) {
  if (history.length === 0) {
    return (
      <Card className="border-border/50">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <Clock className="h-10 w-10 text-muted-foreground/30 mb-3" />
          <p className="text-sm font-medium text-muted-foreground">No calculations yet</p>
          <p className="text-xs text-muted-foreground/60 mt-1">
            Run a calculation to see your history here
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">History</CardTitle>
            <CardDescription>{history.length} saved calculations</CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-destructive hover:text-destructive"
            onClick={onClear}
          >
            Clear all
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border/30">
          <AnimatePresence initial={false}>
            {history.map((entry, i) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-3 p-4 hover:bg-muted/20 transition-colors group">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium tabular-nums text-muted-foreground">
                        #{history.length - i}
                      </span>
                      <Badge variant="outline" className="text-xs h-5">
                        x{entry.odds}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{formatDate(entry.date)}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="font-medium">
                        {formatCurrency(
                          entry.initialStake,
                          settings.currency,
                          settings.thousandsSeparator,
                          settings.decimalPlaces,
                        )}
                      </span>
                      <ChevronRight className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        Capital:{' '}
                        <span className="text-foreground font-medium">
                          {formatCurrency(
                            entry.requiredCapital,
                            settings.currency,
                            settings.thousandsSeparator,
                            settings.decimalPlaces,
                          )}
                        </span>
                      </span>
                      <span className="text-muted-foreground">
                        {entry.attempts} attempts
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => onLoad(entry)}
                      title="Reload"
                    >
                      <RotateCcw className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => onDuplicate(entry.id)}
                      title="Duplicate"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-destructive hover:text-destructive"
                      onClick={() => onDelete(entry.id)}
                      title="Delete"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  )
}
