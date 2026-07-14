import { motion } from 'framer-motion'
import { TrendingUp, Github, Moon, Sun, Settings, Home } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import type { AppSettings } from '@/types'
import { APP_NAME, GITHUB_URL } from '@/constants'

interface HeaderProps {
  settings: AppSettings
  onThemeToggle: () => void
  onSettingsOpen: () => void
  onHome?: () => void
}

export function Header({ settings, onThemeToggle, onSettingsOpen, onHome }: HeaderProps) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-40 glass border-b border-white/5"
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          {onHome && (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={onHome}
                  className="text-white/30 hover:text-white/70 transition-colors mr-1"
                >
                  <Home className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent>Back to home</TooltipContent>
            </Tooltip>
          )}
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-gold glow-gold-sm shrink-0">
            <TrendingUp className="h-4 w-4 text-black" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold tracking-tight text-white">{APP_NAME}</h1>
              <span className="hidden sm:inline-flex items-center rounded-full border border-amber-500/20 bg-amber-500/5 px-2 py-0.5 text-[10px] font-mono text-amber-400/60">
                v{__APP_VERSION__}
              </span>
            </div>
            <p className="text-[11px] text-white/30 hidden sm:block">
              Recovery betting calculator
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-lg text-white/30 hover:text-white/70 hover:bg-white/5 transition-all"
              >
                <Github className="h-4 w-4" />
              </a>
            </TooltipTrigger>
            <TooltipContent>GitHub</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={onThemeToggle}
                className="flex items-center justify-center w-9 h-9 rounded-lg text-white/30 hover:text-white/70 hover:bg-white/5 transition-all"
              >
                {settings.theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
            </TooltipTrigger>
            <TooltipContent>Toggle theme</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={onSettingsOpen}
                className="flex items-center justify-center w-9 h-9 rounded-lg text-white/30 hover:text-white/70 hover:bg-white/5 transition-all"
              >
                <Settings className="h-4 w-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent>Settings</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </motion.header>
  )
}
