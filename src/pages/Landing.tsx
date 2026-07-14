import { motion } from 'framer-motion'
import { Shield, Layers, Zap } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface LandingProps {
  onSelectMode: (mode: 'recovery' | 'escalera') => void
}

function CasinoChip({ color, size }: { color: string; size: number }) {
  const cx = size / 2
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <circle cx={cx} cy={cx} r={cx * 0.94} fill="#08080f" stroke={color} strokeWidth={size * 0.04} opacity={0.9} />
      {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
        <rect
          key={angle}
          x={cx - size * 0.075} y={size * 0.025}
          width={size * 0.15} height={size * 0.13}
          rx={size * 0.025}
          fill={color} opacity={0.85}
          transform={`rotate(${angle} ${cx} ${cx})`}
        />
      ))}
      <circle cx={cx} cy={cx} r={cx * 0.62} fill="none" stroke={color} strokeWidth={1.5} opacity={0.35} strokeDasharray="4 3" />
      <circle cx={cx} cy={cx} r={cx * 0.42} fill={color} opacity={0.1} />
      <circle cx={cx} cy={cx} r={cx * 0.42} fill="none" stroke={color} strokeWidth={size * 0.025} opacity={0.6} />
    </svg>
  )
}

const CHIPS = [
  { color: '#f59e0b', size: 72, pos: { top: '6%', left: '3%' }, dur: 6, delay: 0 },
  { color: '#a855f7', size: 52, pos: { top: '16%', right: '4%' }, dur: 8, delay: 1.3 },
  { color: '#f59e0b', size: 40, pos: { bottom: '26%', left: '2%' }, dur: 7, delay: 2.5 },
  { color: '#a855f7', size: 64, pos: { bottom: '10%', right: '3%' }, dur: 9, delay: 0.7 },
  { color: '#10b981', size: 44, pos: { top: '50%', left: '5%' }, dur: 6.5, delay: 1.9 },
  { color: '#f59e0b', size: 36, pos: { top: '74%', right: '6%' }, dur: 7.5, delay: 3.1 },
  { color: '#a855f7', size: 30, pos: { top: '35%', left: '1%' }, dur: 5.5, delay: 0.4 },
  { color: '#10b981', size: 48, pos: { bottom: '45%', right: '2%' }, dur: 8.5, delay: 2.0 },
]

const SUITS = [
  { char: '♠', pos: { top: '12%', left: '12%' }, size: 52, opacity: 0.055 },
  { char: '♥', pos: { top: '30%', right: '9%' }, size: 80, opacity: 0.04, color: '#ef4444' },
  { char: '♦', pos: { bottom: '20%', left: '10%' }, size: 64, opacity: 0.05, color: '#f59e0b' },
  { char: '♣', pos: { top: '65%', right: '12%' }, size: 56, opacity: 0.055 },
  { char: '♠', pos: { bottom: '40%', right: '22%' }, size: 38, opacity: 0.04 },
  { char: '7', pos: { top: '42%', left: '16%' }, size: 88, opacity: 0.025, color: '#f59e0b' },
  { char: '♥', pos: { bottom: '62%', left: '20%' }, size: 34, opacity: 0.05, color: '#ef4444' },
  { char: '♣', pos: { top: '82%', left: '30%' }, size: 42, opacity: 0.035 },
]

export function Landing({ onSelectMode }: LandingProps) {
  const { t } = useTranslation()

  const recoveryFeatures = [
    t('landing.recoveryF1'),
    t('landing.recoveryF2'),
    t('landing.recoveryF3'),
    t('landing.recoveryF4'),
  ]

  const escaleraFeatures = [
    t('landing.escF1'),
    t('landing.escF2'),
    t('landing.escF3'),
    t('landing.escF4'),
  ]

  return (
    <div className="min-h-screen bg-[#06060f] flex flex-col overflow-hidden relative">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[700px] h-[700px] bg-amber-500/4 rounded-full blur-[160px]" />
        <div className="absolute bottom-0 right-1/3 w-[600px] h-[600px] bg-purple-700/5 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-amber-400/2 rounded-full blur-[120px]" />
      </div>

      {/* Floating casino chips */}
      {CHIPS.map((chip, i) => (
        <motion.div
          key={i}
          className="fixed pointer-events-none z-0"
          style={chip.pos}
          animate={{ y: [0, -16, 0], rotate: [0, 360] }}
          transition={{
            y: { duration: chip.dur, repeat: Infinity, ease: 'easeInOut', delay: chip.delay },
            rotate: { duration: chip.dur * 2.8, repeat: Infinity, ease: 'linear', delay: chip.delay },
          }}
        >
          <CasinoChip color={chip.color} size={chip.size} />
        </motion.div>
      ))}

      {/* Card suits */}
      {SUITS.map((s, i) => (
        <motion.div
          key={i}
          className="fixed pointer-events-none z-0 font-black select-none"
          style={{
            ...s.pos,
            fontSize: s.size,
            color: s.color ?? '#ffffff',
            fontFamily: 'Georgia, serif',
          }}
          animate={{ opacity: [s.opacity, s.opacity * 0.35, s.opacity] }}
          transition={{ duration: 3.5 + i * 0.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
        >
          {s.char}
        </motion.div>
      ))}

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between px-6 py-5 border-b border-white/4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-gold flex items-center justify-center shadow-gold-sm">
            <Zap className="h-4 w-4 text-black" />
          </div>
          <span className="text-sm font-black text-white tracking-wide">BET TOOLS</span>
          <span className="text-[9px] px-1.5 py-0.5 rounded-full border border-amber-500/25 text-amber-400/60 font-mono">
            v{__APP_VERSION__}
          </span>
        </div>
        <p className="text-[10px] text-white/15 uppercase tracking-widest hidden sm:block">
          Calculator Suite
        </p>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-12 md:py-20">

        {/* Live badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/8 border border-amber-500/18 text-amber-300/65 text-[10px] font-bold uppercase tracking-widest mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          {t('landing.tagline')}
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-center mb-4"
        >
          <h1 className="text-5xl md:text-7xl lg:text-[90px] font-black leading-none tracking-tighter">
            <span className="text-white">{t('landing.headline1')}</span>
            <br />
            <span className="text-gradient-gold animate-gradient-x">{t('landing.headline2')}</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/30 text-sm md:text-base text-center max-w-sm leading-relaxed mb-14"
        >
          {t('landing.subtitle')}
        </motion.p>

        {/* ── MODE CARDS ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-3xl">

          {/* Recovery Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.3 }}
            whileHover={{ y: -8, scale: 1.015 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectMode('recovery')}
            className="group cursor-pointer relative rounded-2xl overflow-hidden border border-amber-500/20 hover:border-amber-400/55 bg-gradient-to-br from-amber-500/10 via-amber-600/4 to-transparent transition-all duration-500"
            style={{ boxShadow: '0 0 0 0 rgba(245,158,11,0)' }}
            onHoverStart={e => {
              const el = e.target as HTMLElement
              el.closest?.('.group')?.setAttribute('style', 'box-shadow: 0 0 70px rgba(245,158,11,0.18)')
            }}
            onHoverEnd={e => {
              const el = e.target as HTMLElement
              el.closest?.('.group')?.setAttribute('style', '')
            }}
          >
            <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.025] to-transparent pointer-events-none" />

            <div className="relative p-7 md:p-8">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/22 text-amber-400/75 text-[9px] font-black uppercase tracking-widest mb-5">
                {t('landing.recoveryBadge')}
              </span>

              <div className="w-12 h-12 rounded-xl bg-amber-500/12 border border-amber-500/22 flex items-center justify-center mb-4 group-hover:shadow-[0_0_25px_rgba(245,158,11,0.3)] transition-all duration-300">
                <Shield className="h-6 w-6 text-amber-400" />
              </div>

              <h2 className="text-2xl md:text-3xl font-black text-white leading-tight mb-3">
                {t('landing.recoveryTag1')}<br />
                <span className="text-gradient-gold">{t('landing.recoveryTag2')}</span>
              </h2>

              <p className="text-white/35 text-xs md:text-sm leading-relaxed mb-5">
                {t('landing.recoveryDesc')}
              </p>

              <ul className="space-y-1.5 mb-7">
                {recoveryFeatures.map(f => (
                  <li key={f} className="flex items-center gap-2 text-[11px] text-white/45">
                    <span className="w-1 h-1 rounded-full bg-amber-400/55 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="h-11 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-black font-black text-sm flex items-center justify-center gap-2 shadow-gold group-hover:shadow-[0_4px_28px_rgba(245,158,11,0.5)] transition-all duration-300">
                <Zap className="h-4 w-4" />
                {t('landing.recoveryEnter')}
              </div>
            </div>
          </motion.div>

          {/* Escalera Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.4 }}
            whileHover={{ y: -8, scale: 1.015 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectMode('escalera')}
            className="group cursor-pointer relative rounded-2xl overflow-hidden border border-purple-500/20 hover:border-purple-400/55 bg-gradient-to-br from-purple-500/10 via-violet-600/4 to-transparent transition-all duration-500"
          >
            <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.025] to-transparent pointer-events-none" />

            <div className="relative p-7 md:p-8">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/22 text-purple-400/75 text-[9px] font-black uppercase tracking-widest mb-5">
                {t('landing.escBadge')}
              </span>

              <div className="w-12 h-12 rounded-xl bg-purple-500/12 border border-purple-500/22 flex items-center justify-center mb-4 group-hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] transition-all duration-300">
                <Layers className="h-6 w-6 text-purple-400" />
              </div>

              <h2 className="text-2xl md:text-3xl font-black text-white leading-tight mb-3">
                {t('landing.escTag1')}<br />
                <span className="bg-gradient-to-r from-purple-400 to-violet-300 bg-clip-text text-transparent">{t('landing.escTag2')}</span>
              </h2>

              <p className="text-white/35 text-xs md:text-sm leading-relaxed mb-5">
                {t('landing.escDesc')}
              </p>

              <ul className="space-y-1.5 mb-7">
                {escaleraFeatures.map(f => (
                  <li key={f} className="flex items-center gap-2 text-[11px] text-white/45">
                    <span className="w-1 h-1 rounded-full bg-purple-400/55 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="h-11 rounded-xl bg-gradient-to-r from-purple-600 to-violet-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(168,85,247,0.3)] group-hover:shadow-[0_4px_28px_rgba(168,85,247,0.5)] transition-all duration-300">
                <Layers className="h-4 w-4" />
                {t('landing.escEnter')}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-10 text-[10px] text-white/12 text-center uppercase tracking-widest"
        >
          {t('landing.disclaimer')}
        </motion.p>
      </div>
    </div>
  )
}
