import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Copy, RotateCcw, Clock, ChevronRight, Zap } from 'lucide-react'
import { useTranslation } from 'react-i18next'
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

export function History({ history, settings, onLoad, onDelete, onDuplicate, onClear }: HistoryProps) {
  const { t } = useTranslation()
  const fmt = (v: number) =>
    formatCurrency(v, settings.currency, settings.thousandsSeparator, settings.decimalPlaces)

  if (history.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl border border-white/8 flex flex-col items-center justify-center py-20 text-center"
      >
        <div className="w-14 h-14 rounded-2xl glass border border-white/8 flex items-center justify-center mb-4">
          <Clock className="h-6 w-6 text-white/15" />
        </div>
        <p className="text-sm font-semibold text-white/40">{t('history.empty')}</p>
        <p className="text-xs text-white/20 mt-1">{t('history.emptyHint')}</p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl border border-white/8 overflow-hidden shadow-card"
    >
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-white">{t('history.title')}</h3>
          <p className="text-[10px] uppercase tracking-widest text-amber-400/50 mt-0.5">
            {t(`history.session_${history.length === 1 ? 'one' : 'other'}`, { count: history.length })}
          </p>
        </div>
        <button
          onClick={onClear}
          className="text-[10px] uppercase tracking-widest text-red-400/40 hover:text-red-400/70 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-500/8 border border-transparent hover:border-red-500/15"
        >
          {t('history.clearAll')}
        </button>
      </div>

      {/* Entries */}
      <div>
        <AnimatePresence initial={false}>
          {history.map((entry, i) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-4 px-6 py-4 border-b border-white/4 hover:bg-white/3 transition-colors group">
                {/* Index badge */}
                <div className="shrink-0 w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 text-[10px] font-black">
                  {history.length - i}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300">
                      x{entry.odds}
                    </span>
                    <span className="text-[10px] text-white/25">{formatDate(entry.date)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs flex-wrap">
                    <span className="font-bold text-white">{fmt(entry.initialStake)}</span>
                    <ChevronRight className="h-3 w-3 text-white/20 shrink-0" />
                    <span className="text-white/40">
                      {t('history.capital')} <span className="text-white/70 font-semibold">{fmt(entry.requiredCapital)}</span>
                    </span>
                    <span className="text-white/25">·</span>
                    <span className="text-white/30">{entry.attempts} {t('history.attempts')}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                  <button
                    onClick={() => onLoad(entry)}
                    title={t('history.loadResults')}
                    className="w-7 h-7 rounded-lg hover:bg-amber-500/10 flex items-center justify-center text-white/25 hover:text-amber-400 transition-all border border-transparent hover:border-amber-500/20"
                  >
                    <Zap className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => onDuplicate(entry.id)}
                    title={t('history.duplicate')}
                    className="w-7 h-7 rounded-lg hover:bg-white/8 flex items-center justify-center text-white/25 hover:text-white/60 transition-all"
                  >
                    <Copy className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => onLoad(entry)}
                    title={t('history.recalculate')}
                    className="w-7 h-7 rounded-lg hover:bg-white/8 flex items-center justify-center text-white/25 hover:text-white/60 transition-all"
                  >
                    <RotateCcw className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => onDelete(entry.id)}
                    title={t('history.delete')}
                    className="w-7 h-7 rounded-lg hover:bg-red-500/10 flex items-center justify-center text-white/25 hover:text-red-400 transition-all"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
