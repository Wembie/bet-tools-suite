import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Calculator as CalcIcon, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import type { CalculatorInputs } from '@/types'

const schema = z.object({
  initialStake: z.number({ invalid_type_error: 'Required' }).positive('Must be > 0'),
  odds: z.number({ invalid_type_error: 'Required' }).gt(1, 'Must be > 1.00'),
  targetProfit: z.number({ invalid_type_error: 'Required' }).positive('Must be > 0'),
  maxAttempts: z
    .number({ invalid_type_error: 'Required' })
    .int()
    .min(1)
    .max(50, 'Max 50 attempts'),
})

interface CalculatorProps {
  onCalculate: (inputs: CalculatorInputs) => void
  onReset: () => void
  isCalculating: boolean
}

export function Calculator({ onCalculate, onReset, isCalculating }: CalculatorProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CalculatorInputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      initialStake: 100,
      odds: 2.0,
      targetProfit: 100,
      maxAttempts: 10,
    },
  })

  function onSubmit(data: CalculatorInputs) {
    onCalculate(data)
  }

  function handleReset() {
    reset()
    onReset()
  }

  const fields = [
    {
      id: 'initialStake',
      label: 'Initial Stake',
      placeholder: '100.00',
      hint: 'First bet amount',
      step: '0.01',
    },
    {
      id: 'odds',
      label: 'Decimal Odds',
      placeholder: '2.00',
      hint: 'e.g. 1.85, 2.50, 3.00',
      step: '0.01',
    },
    {
      id: 'targetProfit',
      label: 'Target Profit',
      placeholder: '100.00',
      hint: 'Fixed profit per recovery',
      step: '0.01',
    },
    {
      id: 'maxAttempts',
      label: 'Max Attempts',
      placeholder: '10',
      hint: 'Between 1 and 50',
      step: '1',
    },
  ] as const

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-border/50">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <CalcIcon className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Calculator</CardTitle>
          </div>
          <CardDescription>
            Formula: Next Stake = (Losses + Target) / (Odds − 1)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {fields.map(field => (
              <div key={field.id} className="space-y-1.5">
                <Label htmlFor={field.id} className="text-sm font-medium">
                  {field.label}
                </Label>
                <Input
                  id={field.id}
                  type="number"
                  placeholder={field.placeholder}
                  step={field.step}
                  className={errors[field.id] ? 'border-destructive' : ''}
                  {...register(field.id, { valueAsNumber: true })}
                />
                {errors[field.id] ? (
                  <p className="text-xs text-destructive">{errors[field.id]?.message}</p>
                ) : (
                  <p className="text-xs text-muted-foreground">{field.hint}</p>
                )}
              </div>
            ))}

            <div className="flex gap-2 pt-2">
              <Button type="submit" className="flex-1" disabled={isCalculating}>
                {isCalculating ? 'Calculating...' : 'Calculate'}
              </Button>
              <Button type="button" variant="outline" size="icon" onClick={handleReset}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
