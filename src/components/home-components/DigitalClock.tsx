'use client'

import AnimText from '@/components/ui/unstyled/AnimText'
import { useEffect, useState } from 'react'

export default function DigitalClock() {
  const [time, setTime] = useState<Date | null>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    const initialTimeout = setTimeout(() => {
      setTime(new Date())
    }, 0)

    return () => {
      clearInterval(timer)
      clearTimeout(initialTimeout)
    }
  }, [])

  if (!time) return null

  const formatTime = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')
    return `${hours}:${minutes}:${seconds}`
  }

  return <AnimText className="opacity-50 font-mono text-xs mt-1 pointer-events-none select-none">{formatTime(time)}</AnimText>
}
