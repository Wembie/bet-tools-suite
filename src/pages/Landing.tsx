import { motion, useScroll, useTransform } from 'framer-motion'
import {
  TrendingUp,
  ChevronDown,
  Zap,
  Shield,
  BarChart3,
  FileDown,
  History,
  Settings2,
  ArrowRight,
  Target,
  Calculator,
  Trophy,
} from 'lucide-react'
import { APP_NAME } from '@/constants'
import { AnimatedCounter } from '@/components/AnimatedCounter'

interface LandingProps {
  onEnter: () => void
}

const FADE_UP = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.4, 0.25, 1] },
  }),
}

const FEATURES = [
  {
    icon: Calculator,
    title: 'Recovery Formula',
    desc: 'Mathematical precision. Every stake computed to recover all prior losses plus your fixed profit target.',
    color: 'gold',
  },
  {
    icon: BarChart3,
    title: 'Live Charts',
    desc: 'Stake growth, capital curve, loss progression and risk evolution — all rendered in real time.',
    color: 'purple',
  },
  {
    icon: History,
    title: 'Full History',
    desc: 'Every calculation saved locally. Load, duplicate, or delete any past plan instantly.',
    color: 'green',
  },
  {
    icon: FileDown,
    title: 'Export Anywhere',
    desc: 'One-click export to CSV, Excel or PDF with full plan, charts and parameters.',
    color: 'gold',
  },
  {
    icon: Shield,
    title: 'Smart Alerts',
    desc: 'Warns you when odds are too low, stakes spike dangerously high, or capital requirements explode.',
    color: 'purple',
  },
  {
    icon: Settings2,
    title: 'Configurable',
    desc: 'Choose currency, decimal format, alert thresholds and dark/light mode. Saved automatically.',
    color: 'green',
  },
]

const STEPS = [
  {
    icon: Target,
    step: '01',
    title: 'Set Your Parameters',
    desc: 'Enter initial stake, decimal odds, profit target and max attempts.',
  },
  {
    icon: Zap,
    step: '02',
    title: 'Calculate Instantly',
    desc: 'The formula computes every row — stake, losses, capital, ROI — in milliseconds.',
  },
  {
    icon: Trophy,
    step: '03',
    title: 'Execute With Confidence',
    desc: 'Export your plan, monitor the charts, recover every cent plus your target profit.',
  },
]

export function Landing({ onEnter }: LandingProps) {
  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, -60])

  return (
    <div className="min-h-screen bg-[#06060f] text-white overflow-x-hidden">
      {/* ── Background mesh ── */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-hero-mesh" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-700/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/8 rounded-full blur-[100px]" />
      </div>

      {/* ── Nav ── */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="glass border-b border-white/5">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-gold glow-gold-sm">
                <TrendingUp className="h-4 w-4 text-black" />
              </div>
              <span className="font-bold text-sm tracking-tight">{APP_NAME}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-white/40 hidden sm:block">v{__APP_VERSION__}</span>
              <motion.button
                onClick={onEnter}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="btn-shimmer text-black font-bold text-xs px-4 py-2 rounded-lg"
              >
                Launch App
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <motion.section
        style={{ opacity: heroOpacity, y: heroY }}
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-16"
      >
        {/* Badge */}
        <motion.div variants={FADE_UP} initial="hidden" animate="visible" custom={0}>
          <div className="inline-flex items-center gap-2 glass-purple rounded-full px-4 py-1.5 text-xs text-purple-300 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            Mathematical Recovery System
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={FADE_UP}
          initial="hidden"
          animate="visible"
          custom={1}
          className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-none mb-6"
        >
          <span className="text-white">RECOVER.</span>
          <br />
          <span className="text-gradient-gold">CALCULATE.</span>
          <br />
          <span className="text-white">WIN.</span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          variants={FADE_UP}
          initial="hidden"
          animate="visible"
          custom={2}
          className="text-white/50 text-lg md:text-xl max-w-xl mb-10 leading-relaxed"
        >
          Every loss computed. Every stake optimized. One formula guarantees your profit target —
          no matter how many attempts it takes.
        </motion.p>

        {/* Formula card */}
        <motion.div
          variants={FADE_UP}
          initial="hidden"
          animate="visible"
          custom={3}
          className="glass-gold rounded-2xl px-8 py-5 mb-10 animate-pulse-gold"
        >
          <p className="text-xs text-amber-400/60 uppercase tracking-widest mb-2">The Formula</p>
          <p className="font-mono text-lg md:text-xl text-amber-300 font-bold">
            Next Stake = <span className="text-white">(</span>
            Losses <span className="text-amber-500">+</span> Profit
            <span className="text-white">)</span>
            <span className="text-amber-500"> / </span>
            <span className="text-white">(</span>Odds <span className="text-amber-500">−</span>{' '}
            1<span className="text-white">)</span>
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={FADE_UP}
          initial="hidden"
          animate="visible"
          custom={4}
          className="flex flex-col sm:flex-row gap-3 items-center"
        >
          <motion.button
            onClick={onEnter}
            whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(245,158,11,0.5)' }}
            whileTap={{ scale: 0.97 }}
            className="btn-shimmer text-black font-black text-base px-8 py-4 rounded-xl flex items-center gap-2 shadow-gold"
          >
            Launch Calculator
            <ArrowRight className="h-4 w-4" />
          </motion.button>
          <button
            onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-white/40 text-sm hover:text-white/70 transition-colors flex items-center gap-1.5"
          >
            How it works <ChevronDown className="h-3 w-3 animate-bounce" />
          </button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={FADE_UP}
          initial="hidden"
          animate="visible"
          custom={5}
          className="grid grid-cols-3 gap-8 mt-20"
        >
          {[
            { value: 100, suffix: '%', label: 'Client-side', prefix: '' },
            { value: 0, suffix: ' vulns', label: 'Security', prefix: '' },
            { value: 40, suffix: ' tests', label: 'Coverage', prefix: '' },
          ].map(s => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-black text-gradient-gold tabular-nums">
                <AnimatedCounter target={s.value} prefix={s.prefix} suffix={s.suffix} />
              </p>
              <p className="text-xs text-white/30 mt-1 uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/20"
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.section>

      {/* ── Divider ── */}
      <div className="divider-gold mx-8" />

      {/* ── How it works ── */}
      <section id="how-it-works" className="section-pad px-4">
        <div className="container max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-xs text-amber-400/60 uppercase tracking-widest mb-3">Process</p>
            <h2 className="text-4xl md:text-5xl font-black text-white">
              Three steps to{' '}
              <span className="text-gradient-gold">recovery</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="glass rounded-2xl p-6 card-lift relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 text-6xl font-black text-white/3 leading-none select-none group-hover:text-white/6 transition-colors">
                  {step.step}
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center mb-5 glow-gold-sm">
                  <step.icon className="h-6 w-6 text-black" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="divider-gold mx-8" />

      {/* ── Features ── */}
      <section className="section-pad px-4">
        <div className="container max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-xs text-purple-400/60 uppercase tracking-widest mb-3">Features</p>
            <h2 className="text-4xl md:text-5xl font-black text-white">
              Built for{' '}
              <span className="text-gradient-purple">serious bettors</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f, i) => {
              const colorMap: Record<string, string> = {
                gold: 'from-amber-500/10 to-amber-600/5 border-amber-500/20 text-amber-400',
                purple: 'from-violet-500/10 to-violet-600/5 border-violet-500/20 text-violet-400',
                green: 'from-emerald-500/10 to-emerald-600/5 border-emerald-500/20 text-emerald-400',
              }
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                  className={`rounded-2xl p-5 border bg-gradient-to-br ${colorMap[f.color]} transition-all duration-300`}
                >
                  <f.icon className={`h-6 w-6 mb-3 ${colorMap[f.color].split(' ').pop()}`} />
                  <h3 className="font-bold text-white text-sm mb-1.5">{f.title}</h3>
                  <p className="text-white/40 text-xs leading-relaxed">{f.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="section-pad px-4">
        <div className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-gold rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-violet-500/5" />
            <div className="relative">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Ready to{' '}
                <span className="text-gradient-gold">calculate?</span>
              </h2>
              <p className="text-white/40 text-base mb-8 max-w-md mx-auto">
                Zero backend. Zero signup. Your data stays on your device. Always.
              </p>
              <motion.button
                onClick={onEnter}
                whileHover={{ scale: 1.04, boxShadow: '0 0 50px rgba(245,158,11,0.6)' }}
                whileTap={{ scale: 0.97 }}
                className="btn-shimmer text-black font-black text-lg px-10 py-4 rounded-xl inline-flex items-center gap-2 shadow-gold"
              >
                Open Calculator
                <ArrowRight className="h-5 w-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 py-8 px-4">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-amber-500" />
            <span className="text-white/30 text-xs font-medium">{APP_NAME}</span>
            <span className="text-white/15 text-xs">v{__APP_VERSION__}</span>
          </div>
          <p className="text-white/20 text-xs text-center">
            For educational purposes only. Gamble responsibly. Past outcomes do not guarantee future results.
          </p>
        </div>
      </footer>
    </div>
  )
}
