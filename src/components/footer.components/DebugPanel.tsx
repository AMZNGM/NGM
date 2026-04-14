'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue } from 'motion/react'
import { useIsMobile } from '@/hooks/useIsMobile'

export default function DebugPanel() {
  const isMobile = useIsMobile()
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [clicks, setClicks] = useState(0)
  const [keyPressed, setKeyPressed] = useState('')

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => setKeyPressed(e.key)
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    const handleClick = () => setClicks((prev) => prev + 1)

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('click', handleClick)
    }
  }, [mouseX, mouseY])

  const debugData: Record<string, unknown> = {
    clicks: clicks,
    mouse_x: mouseX,
    mouse_y: mouseY,
    key_pressed: keyPressed,
  }

  if (isMobile) return null

  return (
    <section className="max-md:hidden font-sec font-bold text-[1.05dvw] md:text-[0.6dvw] hover:text-main text-nowrap scale-y-60 origin-right cursor-default pointer-events-auto">
      {'{'}
      {Object.entries(debugData).map(([key, value]) => (
        <div key={key} className="ml-4">
          {key}:{' '}
          {value && typeof value === 'object' && 'get' in value ? (
            <motion.span>{value as unknown as string}</motion.span>
          ) : typeof value === 'boolean' ? (
            value ? (
              'true'
            ) : (
              'false'
            )
          ) : (
            String(value)
          )}
          ;
        </div>
      ))}
      {'}'}
    </section>
  )
}
