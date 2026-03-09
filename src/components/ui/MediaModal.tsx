'use client'
import { useId, useState, ReactNode } from 'react'
import { AnimatePresence, motion, MotionConfig } from 'motion/react'

export const transition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
  mass: 0.5,
} as const

export function MediaModal({ children, className }: { children: ReactNode; className?: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const uniqueId = useId()

  return (
    <MotionConfig transition={transition}>
      {/* Thumbnail / trigger */}
      <motion.div layoutId={`dialog-${uniqueId}`} onClick={() => setIsOpen(true)} className={`relative bg-bg cursor-zoom-in ${className}`}>
        <motion.div layoutId={`dialog-content-${uniqueId}`} className="w-full h-full">
          {children}
        </motion.div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence initial={false} mode="popLayout">
        {isOpen && (
          <motion.div className="z-50 fixed inset-0 flex justify-center items-center pointer-events-none">
            <motion.div
              layoutId={`dialog-${uniqueId}`}
              className="relative w-[80dvw] h-[90dvh] overflow-hidden bg-bg cursor-zoom-out pointer-events-auto"
            >
              <motion.div
                layoutId={`dialog-content-${uniqueId}`}
                onClick={() => setIsOpen(false)}
                className="relative flex justify-center items-center w-full h-full"
              >
                {children}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  )
}
