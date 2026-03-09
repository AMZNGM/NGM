'use client'

import { useEffect } from 'react'
import { useMotionValue, useSpring } from 'framer-motion'

export function useMouseMotion(
  ref: React.RefObject<HTMLElement | null>,
  { springConfig }: { springConfig?: { stiffness: number; damping: number } } = {}
) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const sx = useSpring(x, springConfig || { stiffness: 250, damping: 40 })
  const sy = useSpring(y, springConfig || { stiffness: 250, damping: 40 })

  useEffect(() => {
    const element = ref.current || window

    const handleMouseMove = (e: Event) => {
      const mouseEvent = e as MouseEvent
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        x.set(mouseEvent.clientX - rect.left)
        y.set(mouseEvent.clientY - rect.top)
      } else {
        x.set(mouseEvent.clientX)
        y.set(mouseEvent.clientY)
      }
    }

    element.addEventListener('mousemove', handleMouseMove)
    return () => element.removeEventListener('mousemove', handleMouseMove)
  }, [ref, x, y])

  return { x, y, sx, sy }
}
