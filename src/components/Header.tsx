import { motion } from 'framer-motion'
import { TrendingUp, Github, Moon, Sun, Settings, Home, Languages } from 'lucide-react'
import { useTranslation } from 'react-i18next'
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
  const { t, i18n } = useTranslation()

  function toggleLanguage() {
    i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en')
  }

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
              <TooltipContent>{t('header.backHome')}</TooltipContent>
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
              {t('header.subtitle')}
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
            <TooltipContent>{t('header.github')}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={toggleLanguage}
                className="flex items-center justify-center gap-1 h-9 px-2 rounded-lg text-white/30 hover:text-white/70 hover:bg-white/5 transition-all text-[10px] font-bold uppercase tracking-wider"
              >
                <Languages className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{t('header.switchLanguage')}</span>
              </button>
            </TooltipTrigger>
            <TooltipContent>{t('header.switchLanguage')}</TooltipContent>
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
            <TooltipContent>{t('header.toggleTheme')}</TooltipContent>
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
            <TooltipContent>{t('header.settings')}</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </motion.header>
  )
}
