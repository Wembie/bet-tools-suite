import { motion } from 'framer-motion'
import { X, Palette, DollarSign, Bell } from 'lucide-react'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()

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
            <h2 className="text-base font-bold text-white">{t('settings.title')}</h2>
            <p className="text-[10px] uppercase tracking-widest text-amber-400/50 mt-0.5">{t('settings.preferences')}</p>
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
            <SectionHeader icon={Palette} label={t('settings.appearance')} />
            <SettingRow label={t('settings.darkMode')} sub={t('settings.darkModeHint')}>
              <Toggle
                checked={settings.theme === 'dark'}
                onChange={v => onUpdate({ theme: v ? 'dark' : 'light' })}
              />
            </SettingRow>
          </div>

          {/* Currency */}
          <div className="space-y-4">
            <SectionHeader icon={DollarSign} label={t('settings.currency')} />
            <SettingRow label={t('settings.currency')} sub={t('settings.currencyHint')}>
              <DarkSelect<Currency>
                value={settings.currency}
                onChange={v => onUpdate({ currency: v })}
                options={[
                  { value: 'USD', label: t('settings.usd') },
                  { value: 'EUR', label: t('settings.eur') },
                  { value: 'COP', label: t('settings.cop') },
                  { value: 'MXN', label: t('settings.mxn') },
                ]}
              />
            </SettingRow>
            <SettingRow label={t('settings.thousandsSeparator')} sub={t('settings.thousandsSeparatorHint')}>
              <DarkSelect<ThousandsSeparator>
                value={settings.thousandsSeparator}
                onChange={v => onUpdate({ thousandsSeparator: v })}
                options={[
                  { value: ',', label: t('settings.comma') },
                  { value: '.', label: t('settings.period') },
                  { value: ' ', label: t('settings.space') },
                ]}
              />
            </SettingRow>
            <SettingRow label={t('settings.decimalPlaces')} sub={t('settings.decimalPlacesHint')}>
              <DarkSelect<string>
                value={String(settings.decimalPlaces)}
                onChange={v => onUpdate({ decimalPlaces: Number(v) as DecimalPlaces })}
                options={[
                  { value: '0', label: t('settings.dec0') },
                  { value: '1', label: t('settings.dec1') },
                  { value: '2', label: t('settings.dec2') },
                  { value: '4', label: t('settings.dec4') },
                ]}
              />
            </SettingRow>
          </div>

          {/* Alerts */}
          <div className="space-y-4">
            <SectionHeader icon={Bell} label={t('settings.alertThresholds')} />
            <div className="grid grid-cols-3 gap-3">
              {[
                { labelKey: 'settings.maxStake', key: 'maxStakeAlert' as const, value: settings.maxStakeAlert },
                { labelKey: 'settings.maxCapital', key: 'maxCapitalAlert' as const, value: settings.maxCapitalAlert },
                { labelKey: 'settings.maxAttempts', key: 'maxAttemptsAlert' as const, value: settings.maxAttemptsAlert },
              ].map(({ labelKey, key, value }) => (
                <div key={key} className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-white/30 font-semibold">{t(labelKey)}</label>
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
              {t('settings.thresholdsNote')}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/5 flex justify-end">
          <button
            onClick={onClose}
            className="h-9 px-5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-black text-sm font-bold shadow-gold-sm hover:shadow-gold transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            {t('settings.done')}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
