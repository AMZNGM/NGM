'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react'
import { useIsMobile } from '@/hooks/useIsMobile'

export default function CustomCursor() {
  const isMobile = useIsMobile()
  const [isVisible, setIsVisible] = useState(true)
  const shouldReduceMotion = useReducedMotion()

  const cursorX = useMotionValue(-150)
  const cursorY = useMotionValue(-150)
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 }
  const smoothX = useSpring(cursorX, springConfig)
  const smoothY = useSpring(cursorY, springConfig)

  useEffect(() => {
    if (shouldReduceMotion) return

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 24)
      cursorY.set(e.clientY - 24)
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    window.addEventListener('mousemove', moveCursor)
    document.documentElement.addEventListener('mouseenter', handleMouseEnter)
    document.documentElement.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter)
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [cursorX, cursorY, shouldReduceMotion])

  if (shouldReduceMotion || isMobile) return null

  return (
    <>
      <svg className="top-0 left-0 absolute w-0 h-0 pointer-events-none">
        <defs>
          <filter id="pixelate-filter" x="-20%" y="-20%" width="140%" height="140%">
            <feFlood x="2" y="2" height="2" width="2" />
            <feComposite width="8" height="8" />
            <feTile result="a" />
            <feComposite in="SourceGraphic" in2="a" operator="in" />
            <feMorphology operator="dilate" radius="4" />
          </filter>
        </defs>
      </svg>

      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          opacity: isVisible ? 1 : 0,
          backdropFilter: 'url(#pixelate-filter)',
          WebkitBackdropFilter: 'url(#pixelate-filter)',
        }}
        className="top-0 left-0 z-9999 fixed w-12 h-12 bg-text/5 border border-text/10 rounded-full pointer-events-none will-change-transform"
      />
    </>
  )
}
