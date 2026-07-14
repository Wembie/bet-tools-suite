import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import type { AppSettings, Currency, ThousandsSeparator, DecimalPlaces } from '@/types'

interface SettingsProps {
  settings: AppSettings
  onUpdate: (updates: Partial<AppSettings>) => void
  onClose: () => void
}

export function Settings({ settings, onUpdate, onClose }: SettingsProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-lg"
      >
        <Card className="border-border">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Settings</CardTitle>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Theme */}
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Dark Mode</Label>
                <p className="text-xs text-muted-foreground">Toggle light/dark theme</p>
              </div>
              <Switch
                checked={settings.theme === 'dark'}
                onCheckedChange={v => onUpdate({ theme: v ? 'dark' : 'light' })}
              />
            </div>

            <Separator />

            {/* Currency */}
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">Currency</Label>
              <Select
                value={settings.currency}
                onValueChange={v => onUpdate({ currency: v as Currency })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD — US Dollar ($)</SelectItem>
                  <SelectItem value="EUR">EUR — Euro (€)</SelectItem>
                  <SelectItem value="COP">COP — Colombian Peso ($)</SelectItem>
                  <SelectItem value="MXN">MXN — Mexican Peso ($)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Thousands Separator */}
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">Thousands Separator</Label>
              <Select
                value={settings.thousandsSeparator}
                onValueChange={v => onUpdate({ thousandsSeparator: v as ThousandsSeparator })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value=",">Comma (1,000,000)</SelectItem>
                  <SelectItem value=".">Period (1.000.000)</SelectItem>
                  <SelectItem value=" ">Space (1 000 000)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Decimal Places */}
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">Decimal Places</Label>
              <Select
                value={String(settings.decimalPlaces)}
                onValueChange={v => onUpdate({ decimalPlaces: Number(v) as DecimalPlaces })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">0 — No decimals</SelectItem>
                  <SelectItem value="1">1 — One decimal</SelectItem>
                  <SelectItem value="2">2 — Two decimals</SelectItem>
                  <SelectItem value="4">4 — Four decimals</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            {/* Alert Thresholds */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Alert Thresholds</Label>
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Max Stake</Label>
                  <Input
                    type="number"
                    value={settings.maxStakeAlert}
                    onChange={e => onUpdate({ maxStakeAlert: Number(e.target.value) })}
                    className="h-8 text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Max Capital</Label>
                  <Input
                    type="number"
                    value={settings.maxCapitalAlert}
                    onChange={e => onUpdate({ maxCapitalAlert: Number(e.target.value) })}
                    className="h-8 text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Max Attempts</Label>
                  <Input
                    type="number"
                    value={settings.maxAttemptsAlert}
                    onChange={e => onUpdate({ maxAttemptsAlert: Number(e.target.value) })}
                    className="h-8 text-sm"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
