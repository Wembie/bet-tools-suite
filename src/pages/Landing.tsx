import { motion } from 'framer-motion'
import { Shield, Layers, Zap, Activity, TrendingUp } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface LandingProps {
  onSelectMode: (mode: 'recovery' | 'escalera') => void
}

// ── Live sports ticker ──────────────────────────────────────────────────────
const TICKER_ITEMS = [
  { sport: '⚽', event: 'REAL MADRID vs BARCELONA', score: '2 - 1', status: 'LIVE 67\'', live: true },
  { sport: '🏀', event: 'LAKERS vs CELTICS', score: '108 - 102', status: 'Q4 3:21', live: true },
  { sport: '🥊', event: 'CANELO vs CHARLO', score: 'SAT 21 JUN', status: 'UPCOMING', live: false },
  { sport: '🏈', event: 'CHIEFS vs EAGLES', score: '24 - 17', status: 'Q3 8:45', live: true },
  { sport: '🎾', event: 'DJOKOVIC vs ALCARAZ', score: '6-4  3-3', status: 'SET 2', live: true },
  { sport: '⚽', event: 'MAN CITY vs PSG', score: '1 - 0', status: 'LIVE 34\'', live: true },
  { sport: '🏒', event: 'RANGERS vs BRUINS', score: '3 - 2', status: 'OT', live: true },
  { sport: '🏀', event: 'WARRIORS vs BULLS', score: '89 - 95', status: 'Q3 4:12', live: true },
  { sport: '🥊', event: 'FURY vs USYK II', score: 'FRI 19 JUL', status: 'UPCOMING', live: false },
  { sport: '🏈', event: '49ERS vs COWBOYS', score: '14 - 21', status: 'Q2 2:30', live: true },
  { sport: '⚾', event: 'YANKEES vs RED SOX', score: '5 - 3', status: 'BOT 7th', live: true },
  { sport: '🎾', event: 'NADAL vs SINNER', score: '7-5  0-0', status: 'SET 2', live: true },
]

// ── Floating casino chips ───────────────────────────────────────────────────
const CHIPS = [
  { color: '#f59e0b', size: 72, pos: { top: '9%', left: '2%' }, dur: 6, delay: 0 },
  { color: '#a855f7', size: 52, pos: { top: '20%', right: '3.5%' }, dur: 8, delay: 1.3 },
  { color: '#f59e0b', size: 40, pos: { bottom: '30%', left: '1.5%' }, dur: 7, delay: 2.5 },
  { color: '#a855f7', size: 62, pos: { bottom: '12%', right: '2.5%' }, dur: 9, delay: 0.7 },
  { color: '#10b981', size: 44, pos: { top: '54%', left: '4%' }, dur: 6.5, delay: 1.9 },
  { color: '#f59e0b', size: 34, pos: { top: '78%', right: '5.5%' }, dur: 7.5, delay: 3.1 },
  { color: '#a855f7', size: 28, pos: { top: '38%', left: '1%' }, dur: 5.5, delay: 0.4 },
  { color: '#10b981', size: 46, pos: { bottom: '48%', right: '1.5%' }, dur: 8.5, delay: 2.0 },
]

// ── Floating sport emojis ───────────────────────────────────────────────────
const SPORT_FLOATERS = [
  { emoji: '⚽', pos: { top: '25%', right: '8%' }, size: 30, dur: 5.5, delay: 0.5 },
  { emoji: '🏀', pos: { bottom: '38%', left: '8.5%' }, size: 34, dur: 7, delay: 1.2 },
  { emoji: '🥊', pos: { top: '62%', right: '9%' }, size: 26, dur: 6, delay: 2.0 },
  { emoji: '🏈', pos: { top: '44%', left: '9%' }, size: 28, dur: 8, delay: 0.8 },
  { emoji: '🎾', pos: { bottom: '58%', right: '11.5%' }, size: 24, dur: 5, delay: 3.0 },
  { emoji: '🏆', pos: { top: '14%', right: '15%' }, size: 32, dur: 9, delay: 1.5 },
  { emoji: '⚾', pos: { bottom: '20%', left: '15%' }, size: 22, dur: 6.5, delay: 2.7 },
  { emoji: '🏒', pos: { top: '70%', left: '7%' }, size: 20, dur: 7.5, delay: 1.8 },
]

// ── Card suits backdrop ────────────────────────────────────────────────────
const SUITS = [
  { char: '♠', pos: { top: '14%', left: '13%' }, size: 52, opacity: 0.04 },
  { char: '♥', pos: { top: '32%', right: '10%' }, size: 72, opacity: 0.032, color: '#ef4444' },
  { char: '♦', pos: { bottom: '22%', left: '11%' }, size: 60, opacity: 0.038, color: '#f59e0b' },
  { char: '♣', pos: { top: '68%', right: '13%' }, size: 50, opacity: 0.04 },
  { char: '7', pos: { top: '46%', left: '17%' }, size: 80, opacity: 0.018, color: '#f59e0b' },
]

// ── Live odds widget ────────────────────────────────────────────────────────
const ODDS_BOARD = [
  { label: 'HOME', team: 'REAL MADRID', odds: '1.85', hot: true },
  { label: 'DRAW', team: 'DRAW', odds: '3.40', hot: false },
  { label: 'AWAY', team: 'BARCELONA', odds: '4.20', hot: false },
]

// ── Sport category pills ────────────────────────────────────────────────────
const SPORTS = [
  '⚽ Football', '🏀 Basketball', '🥊 UFC · Boxing',
  '🏈 NFL', '🎾 Tennis', '🏒 Hockey', '⚾ Baseball', '🏆 Esports',
]

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

export function Landing({ onSelectMode }: LandingProps) {
  const { t } = useTranslation()

  const tickerContent = [...TICKER_ITEMS, ...TICKER_ITEMS]

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
    <div className="min-h-screen bg-[#04040c] flex flex-col overflow-hidden relative">

      {/* Grid overlay */}
      <div className="fixed inset-0 grid-overlay pointer-events-none z-0" />

      {/* Ambient glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-amber-500/5 rounded-full blur-[200px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-700/6 rounded-full blur-[180px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-emerald-500/3 rounded-full blur-[150px]" />
        <div className="absolute top-1/3 right-0 w-[300px] h-[400px] bg-blue-600/3 rounded-full blur-[120px]" />
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

      {/* Floating sport emojis */}
      {SPORT_FLOATERS.map((s, i) => (
        <motion.div
          key={`sport-${i}`}
          className="fixed pointer-events-none z-0 select-none"
          style={{ ...s.pos, fontSize: s.size }}
          animate={{ y: [0, -12, 0], rotate: [0, 8, -6, 0] }}
          transition={{
            y: { duration: s.dur, repeat: Infinity, ease: 'easeInOut', delay: s.delay },
            rotate: { duration: s.dur * 1.4, repeat: Infinity, ease: 'easeInOut', delay: s.delay },
          }}
        >
          {s.emoji}
        </motion.div>
      ))}

      {/* Card suits */}
      {SUITS.map((s, i) => (
        <motion.div
          key={`suit-${i}`}
          className="fixed pointer-events-none z-0 font-black select-none"
          style={{
            ...s.pos,
            fontSize: s.size,
            color: s.color ?? '#ffffff',
            fontFamily: 'Georgia, serif',
          }}
          animate={{ opacity: [s.opacity, s.opacity * 0.3, s.opacity] }}
          transition={{ duration: 3.5 + i * 0.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
        >
          {s.char}
        </motion.div>
      ))}

      {/* ════════════ LIVE TICKER ════════════ */}
      <div className="relative z-20 border-b border-white/[0.04] bg-black/50 backdrop-blur-sm overflow-hidden">
        <div className="flex items-stretch">
          {/* LIVE label */}
          <div className="shrink-0 flex items-center gap-2 px-4 py-2.5 bg-red-500/12 border-r border-white/[0.05]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
            </span>
            <span className="text-red-400 text-[9px] font-black uppercase tracking-[0.15em]">LIVE</span>
          </div>

          {/* Scrolling content */}
          <div className="flex-1 overflow-hidden flex items-center">
            <motion.div
              className="flex items-center gap-0 whitespace-nowrap"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
            >
              {tickerContent.map((item, i) => (
                <span key={i} className="inline-flex items-center gap-2.5 px-5 py-2.5 shrink-0">
                  <span className="text-sm">{item.sport}</span>
                  <span className="text-white/35 text-[10px] font-medium tracking-wide">{item.event}</span>
                  <span className="text-white/75 text-[10px] font-black tabular-nums">{item.score}</span>
                  <span className={`px-1.5 py-0.5 rounded text-[8px] font-black tracking-wide ${
                    item.live
                      ? 'bg-red-500/15 text-red-400'
                      : 'bg-amber-500/12 text-amber-400/65'
                  }`}>
                    {item.status}
                  </span>
                  <span className="text-white/[0.07] ml-2">|</span>
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ════════════ HEADER ════════════ */}
      <div className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-white/[0.04]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-gold flex items-center justify-center shadow-gold-sm">
            <Zap className="h-4 w-4 text-black" />
          </div>
          <span className="text-sm font-black text-white tracking-wide">BET TOOLS</span>
          <span className="text-[9px] px-1.5 py-0.5 rounded-full border border-amber-500/25 text-amber-400/55 font-mono">
            v{__APP_VERSION__}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/8 border border-emerald-500/15">
            <Activity className="h-3 w-3 text-emerald-400/70" />
            <span className="text-[9px] font-bold text-emerald-400/70 uppercase tracking-widest">Markets Open</span>
          </div>
          <span className="text-[9px] text-white/15 uppercase tracking-widest hidden sm:block">
            Calculator Suite
          </span>
        </div>
      </div>

      {/* ════════════ MAIN CONTENT ════════════ */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-10 md:py-14">

        {/* Sport categories strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 flex-wrap justify-center mb-7"
        >
          {SPORTS.map((sport, i) => (
            <span key={i} className="sport-pill">{sport}</span>
          ))}
        </motion.div>

        {/* Live tagline badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/8 border border-amber-500/18 text-amber-300/65 text-[10px] font-bold uppercase tracking-widest mb-6"
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
          <h1 className="text-5xl md:text-7xl lg:text-[88px] font-black leading-none tracking-tighter">
            <span className="text-white">{t('landing.headline1')}</span>
            <br />
            <span className="text-gradient-gold neon-gold animate-gradient-x">{t('landing.headline2')}</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/28 text-sm md:text-base text-center max-w-sm leading-relaxed mb-8"
        >
          {t('landing.subtitle')}
        </motion.p>

        {/* ── Live odds board widget ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28 }}
          className="mb-12"
        >
          <div className="glass rounded-2xl border border-white/[0.06] overflow-hidden">
            {/* Match header */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.04] bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-70" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
                </span>
                <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">
                  ⚽ Real Madrid vs Barcelona · La Liga
                </span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-amber-400/40" />
                <span className="text-[9px] text-amber-400/40 font-bold">67'</span>
              </div>
            </div>

            {/* Odds cells */}
            <div className="flex items-center gap-3 px-4 py-3">
              {ODDS_BOARD.map((o, i) => (
                <div key={i} className={`odds-cell ${o.hot ? 'odds-cell-active' : ''}`}>
                  <div className="text-[8px] text-white/25 font-semibold uppercase tracking-wider mb-1">{o.label}</div>
                  <div className={`text-sm font-black tabular-nums ${o.hot ? 'text-amber-400' : 'text-white/55'}`}>
                    {o.odds}
                  </div>
                </div>
              ))}
              <div className="text-center ml-1">
                <div className="text-[8px] text-white/12 uppercase tracking-widest leading-tight">SAMPLE<br />DATA</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ════ MODE CARDS ════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-3xl">

          {/* ── Recovery Card ── */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.32 }}
            whileHover={{ y: -10, scale: 1.016 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectMode('recovery')}
            className="group cursor-pointer"
          >
            {/* Gradient border wrapper */}
            <div className="relative rounded-2xl p-[1px] transition-all duration-500"
              style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.22), rgba(245,158,11,0.06), transparent)' }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.background =
                  'linear-gradient(135deg, rgba(245,158,11,0.75), rgba(168,85,247,0.3), rgba(245,158,11,0.4))'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.background =
                  'linear-gradient(135deg, rgba(245,158,11,0.22), rgba(245,158,11,0.06), transparent)'
              }}
            >
              <div className="relative rounded-[15px] bg-gradient-to-br from-amber-500/10 via-[#0c0c1e] to-[#080815] overflow-hidden h-full">
                {/* Top edge light */}
                <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-amber-400/55 to-transparent" />
                {/* Card shine */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
                {/* Hover glow overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-amber-500/0 group-hover:from-amber-500/6 group-hover:to-transparent transition-all duration-500 pointer-events-none" />

                <div className="relative p-7 md:p-8">
                  {/* Badges row */}
                  <div className="flex items-center gap-2 mb-5">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/22 text-amber-400/75 text-[9px] font-black uppercase tracking-widest">
                      {t('landing.recoveryBadge')}
                    </span>
                    <span className="px-2 py-1 rounded-full bg-white/5 border border-white/8 text-white/25 text-[8px] font-bold uppercase tracking-wider">
                      MOST POPULAR
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="relative w-14 h-14 mb-4">
                    <div className="absolute inset-0 rounded-2xl bg-amber-500/8 border border-amber-500/18 group-hover:shadow-[0_0_30px_rgba(245,158,11,0.35)] transition-all duration-400" />
                    <div className="absolute inset-0 rounded-2xl animate-pulse-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative h-full flex items-center justify-center">
                      <Shield className="h-7 w-7 text-amber-400 group-hover:neon-gold transition-all duration-300" />
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl md:text-3xl font-black text-white leading-tight mb-3">
                    {t('landing.recoveryTag1')}<br />
                    <span className="text-gradient-gold">{t('landing.recoveryTag2')}</span>
                  </h2>

                  {/* Description */}
                  <p className="text-white/33 text-xs md:text-sm leading-relaxed mb-5">
                    {t('landing.recoveryDesc')}
                  </p>

                  {/* Feature list */}
                  <ul className="space-y-2 mb-6">
                    {recoveryFeatures.map(f => (
                      <li key={f} className="flex items-center gap-2.5 text-[11px] text-white/45">
                        <span className="w-1 h-1 rounded-full bg-amber-400/60 shrink-0 group-hover:bg-amber-400 transition-colors duration-300" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* Stats mini-bar */}
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/[0.04]">
                    <div className="text-center">
                      <div className="text-amber-400 text-base font-black tabular-nums">50</div>
                      <div className="text-white/20 text-[8px] uppercase tracking-wider">attempts</div>
                    </div>
                    <div className="h-6 w-px bg-white/[0.06]" />
                    <div className="text-center">
                      <div className="text-white/60 text-base font-black">3</div>
                      <div className="text-white/20 text-[8px] uppercase tracking-wider">exports</div>
                    </div>
                    <div className="h-6 w-px bg-white/[0.06]" />
                    <div className="text-center">
                      <div className="text-white/60 text-base font-black">6</div>
                      <div className="text-white/20 text-[8px] uppercase tracking-wider">metrics</div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="relative h-11 rounded-xl overflow-hidden group-hover:shadow-[0_4px_32px_rgba(245,158,11,0.5)] transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-gold-h animate-shimmer bg-[size:200%_100%]" />
                    <div className="relative h-full flex items-center justify-center gap-2 text-black font-black text-sm">
                      <Zap className="h-4 w-4" />
                      {t('landing.recoveryEnter')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Escalera Card ── */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.42 }}
            whileHover={{ y: -10, scale: 1.016 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectMode('escalera')}
            className="group cursor-pointer"
          >
            {/* Gradient border wrapper */}
            <div className="relative rounded-2xl p-[1px] transition-all duration-500"
              style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.22), rgba(168,85,247,0.06), transparent)' }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.background =
                  'linear-gradient(135deg, rgba(168,85,247,0.75), rgba(16,185,129,0.25), rgba(168,85,247,0.4))'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.background =
                  'linear-gradient(135deg, rgba(168,85,247,0.22), rgba(168,85,247,0.06), transparent)'
              }}
            >
              <div className="relative rounded-[15px] bg-gradient-to-br from-purple-500/10 via-[#0c0c1e] to-[#080815] overflow-hidden h-full">
                {/* Top edge light */}
                <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-purple-400/55 to-transparent" />
                {/* Card shine */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
                {/* Hover glow overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/0 group-hover:from-purple-500/6 group-hover:to-transparent transition-all duration-500 pointer-events-none" />

                <div className="relative p-7 md:p-8">
                  {/* Badge */}
                  <div className="flex items-center gap-2 mb-5">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/22 text-purple-400/75 text-[9px] font-black uppercase tracking-widest">
                      {t('landing.escBadge')}
                    </span>
                    <span className="px-2 py-1 rounded-full bg-white/5 border border-white/8 text-white/25 text-[8px] font-bold uppercase tracking-wider">
                      COMPOUND
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="relative w-14 h-14 mb-4">
                    <div className="absolute inset-0 rounded-2xl bg-purple-500/8 border border-purple-500/18 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.35)] transition-all duration-400" />
                    <div className="relative h-full flex items-center justify-center">
                      <Layers className="h-7 w-7 text-purple-400" />
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl md:text-3xl font-black text-white leading-tight mb-3">
                    {t('landing.escTag1')}<br />
                    <span className="bg-gradient-to-r from-purple-400 to-violet-300 bg-clip-text text-transparent">
                      {t('landing.escTag2')}
                    </span>
                  </h2>

                  {/* Description */}
                  <p className="text-white/33 text-xs md:text-sm leading-relaxed mb-5">
                    {t('landing.escDesc')}
                  </p>

                  {/* Feature list */}
                  <ul className="space-y-2 mb-6">
                    {escaleraFeatures.map(f => (
                      <li key={f} className="flex items-center gap-2.5 text-[11px] text-white/45">
                        <span className="w-1 h-1 rounded-full bg-purple-400/60 shrink-0 group-hover:bg-purple-400 transition-colors duration-300" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* Stats mini-bar */}
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/[0.04]">
                    <div className="text-center">
                      <div className="text-purple-400 text-base font-black tabular-nums">365</div>
                      <div className="text-white/20 text-[8px] uppercase tracking-wider">bets</div>
                    </div>
                    <div className="h-6 w-px bg-white/[0.06]" />
                    <div className="text-center">
                      <div className="text-white/60 text-base font-black">∞</div>
                      <div className="text-white/20 text-[8px] uppercase tracking-wider">growth</div>
                    </div>
                    <div className="h-6 w-px bg-white/[0.06]" />
                    <div className="text-center">
                      <div className="text-white/60 text-base font-black tabular-nums">x^n</div>
                      <div className="text-white/20 text-[8px] uppercase tracking-wider">formula</div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="h-11 rounded-xl bg-gradient-to-r from-purple-600 to-violet-500 flex items-center justify-center gap-2 text-white font-black text-sm shadow-[0_4px_20px_rgba(168,85,247,0.3)] group-hover:shadow-[0_4px_32px_rgba(168,85,247,0.55)] transition-all duration-300">
                    <Layers className="h-4 w-4" />
                    {t('landing.escEnter')}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="mt-10 text-[10px] text-white/10 text-center uppercase tracking-widest"
        >
          {t('landing.disclaimer')}
        </motion.p>
      </div>
    </div>
  )
}
