import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, XCircle, Info } from 'lucide-react'
import type { AlertInfo } from '@/types'

interface AlertsProps {
  alerts: AlertInfo[]
}

const CONFIG = {
  warning: {
    icon: <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />,
    cls: 'bg-amber-500/8 border-amber-500/25 text-amber-200/80',
  },
  error: {
    icon: <XCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />,
    cls: 'bg-red-500/8 border-red-500/25 text-red-200/80',
  },
  info: {
    icon: <Info className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />,
    cls: 'bg-blue-500/8 border-blue-500/25 text-blue-200/80',
  },
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
            className={`flex items-start gap-2.5 p-3 rounded-xl border text-xs leading-relaxed ${CONFIG[alert.type].cls}`}
          >
            {CONFIG[alert.type].icon}
            <p>{alert.message}</p>
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  )
}
