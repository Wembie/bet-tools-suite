import { motion } from 'framer-motion'
import { X, Palette, DollarSign, Bell } from 'lucide-react'
import type { AppSettings, Currency, ThousandsSeparator, DecimalPlaces } from '@/types'

interface SettingsProps {
  settings: AppSettings
  onUpdate: (updates: Partial<AppSettings>) => void
  onClose: () => void
}

function SettingRow({ label, sub, children }: { label: string; sub?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-white/80">{label}</p>
        {sub && <p className="text-[11px] text-white/30 mt-0.5">{sub}</p>}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  )
}

function DarkSelect<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T
  onChange: (v: T) => void
  options: { value: T; label: string }[]
}) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value as T)}
      className="bg-white/5 border border-white/10 text-white/70 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-amber-500/40 focus:ring-1 focus:ring-amber-500/20 transition-all cursor-pointer hover:border-white/20 min-w-[160px]"
    >
      {options.map(o => (
        <option key={o.value} value={o.value} className="bg-[#0e0e1a] text-white/80">
          {o.label}
        </option>
      ))}
    </select>
  )
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 rounded-full transition-all duration-300 ${
        checked ? 'bg-gradient-to-r from-amber-500 to-amber-400 shadow-gold-sm' : 'bg-white/10'
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  )
}

function SectionHeader({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="flex items-center gap-2 pb-3 border-b border-white/5">
      <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
        <Icon className="h-3.5 w-3.5 text-amber-400" />
      </div>
      <span className="text-[10px] uppercase tracking-widest text-white/40 font-semibold">{label}</span>
    </div>
  )
}

export function Settings({ settings, onUpdate, onClose }: SettingsProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 10 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="w-full max-w-md glass rounded-2xl border border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.6)] overflow-hidden"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white">Settings</h2>
            <p className="text-[10px] uppercase tracking-widest text-amber-400/50 mt-0.5">Preferences</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl hover:bg-white/8 flex items-center justify-center text-white/30 hover:text-white/70 transition-all border border-transparent hover:border-white/10"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Appearance */}
          <div className="space-y-4">
            <SectionHeader icon={Palette} label="Appearance" />
            <SettingRow label="Dark Mode" sub="Toggle light/dark theme">
              <Toggle
                checked={settings.theme === 'dark'}
                onChange={v => onUpdate({ theme: v ? 'dark' : 'light' })}
              />
            </SettingRow>
          </div>

          {/* Currency */}
          <div className="space-y-4">
            <SectionHeader icon={DollarSign} label="Currency" />
            <SettingRow label="Currency" sub="Symbol and format">
              <DarkSelect<Currency>
                value={settings.currency}
                onChange={v => onUpdate({ currency: v })}
                options={[
                  { value: 'USD', label: 'USD — US Dollar ($)' },
                  { value: 'EUR', label: 'EUR — Euro (€)' },
                  { value: 'COP', label: 'COP — Colombian Peso' },
                  { value: 'MXN', label: 'MXN — Mexican Peso' },
                ]}
              />
            </SettingRow>
            <SettingRow label="Thousands Separator" sub="Number format">
              <DarkSelect<ThousandsSeparator>
                value={settings.thousandsSeparator}
                onChange={v => onUpdate({ thousandsSeparator: v })}
                options={[
                  { value: ',', label: 'Comma (1,000,000)' },
                  { value: '.', label: 'Period (1.000.000)' },
                  { value: ' ', label: 'Space (1 000 000)' },
                ]}
              />
            </SettingRow>
            <SettingRow label="Decimal Places" sub="Precision">
              <DarkSelect<string>
                value={String(settings.decimalPlaces)}
                onChange={v => onUpdate({ decimalPlaces: Number(v) as DecimalPlaces })}
                options={[
                  { value: '0', label: '0 — No decimals' },
                  { value: '1', label: '1 — One decimal' },
                  { value: '2', label: '2 — Two decimals' },
                  { value: '4', label: '4 — Four decimals' },
                ]}
              />
            </SettingRow>
          </div>

          {/* Alerts */}
          <div className="space-y-4">
            <SectionHeader icon={Bell} label="Alert Thresholds" />
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Max Stake', key: 'maxStakeAlert' as const, value: settings.maxStakeAlert },
                { label: 'Max Capital', key: 'maxCapitalAlert' as const, value: settings.maxCapitalAlert },
                { label: 'Max Attempts', key: 'maxAttemptsAlert' as const, value: settings.maxAttemptsAlert },
              ].map(({ label, key, value }) => (
                <div key={key} className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-white/30 font-semibold">{label}</label>
                  <input
                    type="number"
                    value={value}
                    onChange={e => onUpdate({ [key]: Number(e.target.value) })}
                    className="w-full bg-white/5 border border-white/8 text-white/70 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-amber-500/40 focus:ring-1 focus:ring-amber-500/20 transition-all hover:border-white/15 tabular-nums"
                  />
                </div>
              ))}
            </div>
            <p className="text-[10px] text-white/20 leading-relaxed">
              Alerts show in the results panel when thresholds are exceeded.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/5 flex justify-end">
          <button
            onClick={onClose}
            className="h-9 px-5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-black text-sm font-bold shadow-gold-sm hover:shadow-gold transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Done
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
