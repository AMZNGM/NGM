'use client'

import { motion } from 'motion/react'
import { easings } from '@/utils/anim'
import { useIsMobile } from '@/hooks/useIsMobile'

export function MotionLine({
  className = '',
  delay = 0.3,
  from = 'center',
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
  const isMobile = useIsMobile()
  const effectiveDelay = isMobile ? 0 : delay
  const originX = from === 'left' ? 0 : from === 'right' ? 1 : 0.5

  return (
    <motion.div className={`relative flex items-center gap-1 opacity-50 ${className}`} {...props}>
      {/* Left Star */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: effectiveDelay + 0.9, ease: easings.cubiz }}
        viewport={{ once }}
      >
        <svg className="size-5 fill-text" width="12" height="12" viewBox="0 0 112.5 112.5">
          <path d="M111.1,54.55l-37.9-8.14,22.12-26.86c1.32-1.6-.81-3.73-2.41-2.41l-26.86,22.12L57.9,1.35c-.39-1.8-2.96-1.8-3.35,0l-8.14,37.9-26.86-22.12c-1.6-1.32-3.73.81-2.41,2.41l22.12,26.86L1.35,54.55c-1.8.39-1.8,2.96,0,3.35l37.9,8.14-22.12,26.86c-1.32,1.6.81,3.73,2.41,2.41l26.86-22.12,8.14,37.9c.39,1.8,2.96,1.8,3.35,0l8.14-37.9,26.86,22.12c1.6,1.32,3.73-.81,2.41-2.41l-22.12-26.86,37.9-8.14c1.8-.39,1.8-2.96,0-3.35Z" />
        </svg>
      </motion.div>

      {/* Line */}
      <motion.div
        initial={{ scaleX: 0, filter: 'blur(8px)' }}
        whileInView={{ scaleX: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.9, delay: effectiveDelay, ease: easings.cubiz }}
        viewport={{ once }}
        style={{ originX, ...style }}
        className="relative flex-1 h-0.5 overflow-hidden bg-text"
      />

      {/* Right Star */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: effectiveDelay + 0.9, ease: easings.cubiz }}
        viewport={{ once }}
      >
        <svg className="size-5 fill-text" width="12" height="12" viewBox="0 0 112.5 112.5">
          <path d="M111.1,54.55l-37.9-8.14,22.12-26.86c1.32-1.6-.81-3.73-2.41-2.41l-26.86,22.12L57.9,1.35c-.39-1.8-2.96-1.8-3.35,0l-8.14,37.9-26.86-22.12c-1.6-1.32-3.73.81-2.41,2.41l22.12,26.86L1.35,54.55c-1.8.39-1.8,2.96,0,3.35l37.9,8.14-22.12,26.86c-1.32,1.6.81,3.73,2.41,2.41l26.86-22.12,8.14,37.9c.39,1.8,2.96,1.8,3.35,0l8.14-37.9,26.86,22.12c1.6,1.32,3.73-.81,2.41-2.41l-22.12-26.86,37.9-8.14c1.8-.39,1.8-2.96,0-3.35Z" />
        </svg>
      </motion.div>
    </motion.div>
  )
}

export function MotionLineV({
  className = '',
  delay = 0.3,
  from = 'center',
  once = true,
  style,
  ...props
}: {
  className?: string
  delay?: number
  from?: 'top' | 'bottom' | 'center'
  once?: boolean
  useWidth?: boolean
} & Omit<React.ComponentProps<typeof motion.div>, 'className' | 'initial' | 'whileInView' | 'transition' | 'viewport'>) {
  const isMobile = useIsMobile()
  const effectiveDelay = isMobile ? 0 : delay
  const originY = from === 'top' ? 0 : from === 'bottom' ? 1 : 0.5

  return (
    <motion.div className={`relative flex flex-col self-stretch items-center gap-1 opacity-50 ${className}`} {...props}>
      {/* Top Star */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: effectiveDelay + 0.9, ease: easings.cubiz }}
        viewport={{ once }}
      >
        <svg className="size-5 fill-text" width="12" height="12" viewBox="0 0 112.5 112.5">
          <path d="M111.1,54.55l-37.9-8.14,22.12-26.86c1.32-1.6-.81-3.73-2.41-2.41l-26.86,22.12L57.9,1.35c-.39-1.8-2.96-1.8-3.35,0l-8.14,37.9-26.86-22.12c-1.6-1.32-3.73.81-2.41,2.41l22.12,26.86L1.35,54.55c-1.8.39-1.8,2.96,0,3.35l37.9,8.14-22.12,26.86c-1.32,1.6.81,3.73,2.41,2.41l26.86-22.12,8.14,37.9c.39,1.8,2.96,1.8,3.35,0l8.14-37.9,26.86,22.12c1.6,1.32,3.73-.81,2.41-2.41l-22.12-26.86,37.9-8.14c1.8-.39,1.8-2.96,0-3.35Z" />
        </svg>
      </motion.div>

      {/* Line */}
      <motion.div
        initial={{ scaleY: 0, filter: 'blur(8px)' }}
        whileInView={{ scaleY: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.9, delay: effectiveDelay, ease: easings.cubiz }}
        viewport={{ once }}
        style={{ originY, ...style }}
        className="relative flex-1 w-0.5 overflow-hidden bg-text"
      />

      {/* Bottom Star */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: effectiveDelay + 0.9, ease: easings.cubiz }}
        viewport={{ once }}
      >
        <svg className="size-5 fill-text" width="12" height="12" viewBox="0 0 112.5 112.5">
          <path d="M111.1,54.55l-37.9-8.14,22.12-26.86c1.32-1.6-.81-3.73-2.41-2.41l-26.86,22.12L57.9,1.35c-.39-1.8-2.96-1.8-3.35,0l-8.14,37.9-26.86-22.12c-1.6-1.32-3.73.81-2.41,2.41l22.12,26.86L1.35,54.55c-1.8.39-1.8,2.96,0,3.35l37.9,8.14-22.12,26.86c-1.32,1.6.81,3.73,2.41,2.41l26.86-22.12,8.14,37.9c.39,1.8,2.96,1.8,3.35,0l8.14-37.9,26.86,22.12c1.6,1.32,3.73-.81,2.41-2.41l-22.12-26.86,37.9-8.14c1.8-.39,1.8-2.96,0-3.35Z" />
        </svg>
      </motion.div>
    </motion.div>
  )
}
