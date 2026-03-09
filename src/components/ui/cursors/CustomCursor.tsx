'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useMouseMotion } from '@/hooks/useMouseMotion'
import { useIsMobile } from '@/hooks/useIsMobile'

export default function CustomCursor() {
  const windowRef = useRef<HTMLElement>(null)
  const { sx, sy } = useMouseMotion(windowRef, { springConfig: { stiffness: 250, damping: 50 } })

  const isMobile = useIsMobile()
  if (isMobile) return

  return (
    <motion.div style={{ x: sx, y: sy }} className="z-9999 fixed inset-0 w-5 h-5 bg-text rounded-full -translate-1/2 pointer-events-none" />
  )
}
