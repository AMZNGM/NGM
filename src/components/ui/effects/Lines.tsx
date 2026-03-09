'use client'

import { motion } from 'motion/react'
import { easings } from '@/utils/anim'

export function MotionLine({
  className = '',
  delay = 0.3,
  from = 'right',
  once = true,
  style,
  ...props
}: {
  className?: string
  delay?: number
  from?: 'left' | 'right' | 'center'
  once?: boolean
  useWidth?: boolean
} & Omit<React.ComponentProps<typeof motion.div>, 'className' | 'initial' | 'whileInView' | 'transition' | 'viewport'>) {
  const originX = from === 'left' ? 0 : from === 'right' ? 1 : 0.5

  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      transition={{ duration: 0.9, delay, ease: easings.cubiz }}
      viewport={{ once }}
      style={{ originX, ...style }}
      className={`relative h-0.5 bg-main my-2 mix-blend-difference ${className}`}
      {...props}
    />
  )
}
