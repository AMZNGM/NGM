'use client'

import { createPortal } from 'react-dom'
import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useSoundEffects } from '@/hooks/useSoundEffects'
import { easings } from '@/utils/anim'
import { BIO } from '@/data/db'
import AnimText from '@/components/ui/unstyled/AnimText'
import Earth from '@/components/nav-components/earth-components/Earth'
import CloseBtn from '@/components/ui/buttons/CloseBtn'

export default function DigitalClock() {
  const { click } = useSoundEffects()
  const [time, setTime] = useState<Date | null>(null)
  const [open, setOpen] = useState<boolean>(false)
  const close = useCallback(() => setOpen(false), [])

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

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, close])

  if (!time) return null

  const formatTime = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')
    return `${hours}:${minutes}:${seconds}`
  }

  return (
    <>
      <div
        onClick={() => {
          setOpen(true)
          click()
        }}
        className="relative max-w-12 max-md:max-w-[7.1dvw] outline-none font-wide hover:text-main scale-x-200 scale-y-80 origin-left ms-2 cursor-pointer"
      >
        <AnimText className="text-[1.73dvw] md:text-sm">__{formatTime(time)}*</AnimText>
        <AnimText className="text-[1.75dvw] md:text-xs">__{BIO.location}__</AnimText>
      </div>

      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, filter: 'blur(10px)', scale: 1.1 }}
              animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
              exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.1 }}
              transition={{ delay: 0.14, duration: 0.42, ease: easings.cubiz }}
              className="z-50 fixed inset-0"
            >
              <CloseBtn onClick={close} className="top-4 left-4 origin-left absolute!" />
              <Earth />
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}
