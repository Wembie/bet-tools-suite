import { useEffect, useRef, useState } from 'react'

interface AnimatedCounterProps {
  target: number
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
}

export function AnimatedCounter({
  target,
  duration = 2000,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
}: AnimatedCounterProps) {
  const [value, setValue] = useState(0)
  const rafRef = useRef<number>(0)
  const startRef = useRef<number>(0)
  const startedRef = useRef(false)
  const elRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !startedRef.current) {
          startedRef.current = true
          startRef.current = performance.now()

          const tick = (now: number) => {
            const elapsed = now - startRef.current
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 4)
            setValue(eased * target)
            if (progress < 1) rafRef.current = requestAnimationFrame(tick)
          }

          rafRef.current = requestAnimationFrame(tick)
        }
      },
      { threshold: 0.3 },
    )

    if (elRef.current) observer.observe(elRef.current)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(rafRef.current)
    }
  }, [target, duration])

  return (
    <span ref={elRef} className={className}>
      {prefix}
      {value.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      {suffix}
    </span>
  )
}
