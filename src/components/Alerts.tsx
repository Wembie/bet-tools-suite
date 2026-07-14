import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, XCircle, Info } from 'lucide-react'
import type { AlertInfo } from '@/types'

interface AlertsProps {
  alerts: AlertInfo[]
}

const ICON_MAP = {
  warning: <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />,
  error: <XCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />,
  info: <Info className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />,
}

const STYLE_MAP = {
  warning: 'bg-amber-500/10 border-amber-500/30 text-amber-200',
  error: 'bg-destructive/10 border-destructive/30 text-red-300',
  info: 'bg-blue-500/10 border-blue-500/30 text-blue-300',
}

export function Alerts({ alerts }: AlertsProps) {
  if (alerts.length === 0) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        className="space-y-2"
      >
        {alerts.map((alert, i) => (
          <motion.div
            key={`${alert.type}-${i}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`flex items-start gap-2 p-3 rounded-lg border text-sm ${STYLE_MAP[alert.type]}`}
          >
            {ICON_MAP[alert.type]}
            <p className="flex-1 leading-relaxed">{alert.message}</p>
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  )
}
