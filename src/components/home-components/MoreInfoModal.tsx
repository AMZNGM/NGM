'use client'

import { createPortal } from 'react-dom'
import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useSoundEffects } from '@/hooks/useSoundEffects'
import { easings } from '@/utils/anim'
import { Info } from 'lucide-react'
import AnimText from '@/components/ui/unstyled/AnimText'
import CloseBtn from '@/components/ui/buttons/CloseBtn'

export default function MoreInfoModal({ moreInfo, projectTitle }: { moreInfo: string; projectTitle: string }) {
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])
  const { hoverSound, click } = useSoundEffects()

  const modalVariants = {
    initial: { opacity: 0, filter: 'blur(10px)', scale: 1.1, transition: { delay: 0.14, duration: 0.42, ease: easings.cubiz } },
    animate: { opacity: 1, filter: 'blur(0px)', scale: 1, transition: { delay: 0.14, duration: 0.42, ease: easings.cubiz } },
    exit: { opacity: 0, filter: 'blur(10px)', scale: 1.1, transition: { delay: 0.3, duration: 0.42, ease: easings.cubiz } },
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, close])

  if (typeof document === 'undefined') return null

  return (
    <>
      {/* trigger button */}
      <motion.button
        onClick={() => {
          click()
          setOpen(true)
        }}
        whileTap={{ scale: 0.95 }}
        onMouseEnter={() => hoverSound()}
        transition={{ type: 'spring', damping: 8, stiffness: 300 }}
        className="group bg-text/10 hover:bg-main/20 opacity-80 hover:opacity-100 rounded-lg outline-none text-text hover:text-main px-[0.8dvw] max-md:px-[2dvw] py-[0.5dvw] max-md:py-[1.5dvw] cursor-pointer"
      >
        <div className="flex items-center gap-[0.5dvw] max-md:gap-[1dvw] font-wide text-[0.9dvw] max-md:text-[3.5dvw] uppercase scale-x-160 origin-left">
          <Info className="size-[0.9dvw] max-md:size-[3dvw] group-hover:rotate-12" />
          <span>More Info</span>
        </div>
      </motion.button>

      {/* modal */}
      {createPortal(
        <AnimatePresence mode="wait">
          {open && (
            <motion.div
              variants={modalVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="z-50 fixed inset-0 flex justify-center items-center h-dvh bg-bg/50 backdrop-blur-sm"
            >
              <div
                onClick={close}
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                }}
                className="fixed inset-0 opacity-5 invert-100"
              />

              <div className="relative flex flex-col w-full max-w-[40dvw] max-md:max-w-[90dvw] max-h-[80dvh] overflow-hidden overscroll-contain bg-text/22 backdrop-blur-3xl rounded-[0.5dvw] max-md:rounded-[1dvw] m-[1dvw] max-md:m-[3dvw] p-[2dvw] max-md:p-[4dvw]">
                <motion.div
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 28 }}
                  transition={{ delay: 0.06, duration: 0.5, ease: easings.cubiz }}
                  className="flex justify-between items-start gap-[1dvw] max-md:gap-[2dvw] mb-[1.5dvw] max-md:mb-[4dvw] shrink-0"
                >
                  <div className="flex items-center gap-[0.5dvw] max-md:gap-[2dvw] blur-[0.1dvw] font-sec font-semibold text-[1dvw] max-md:text-[3.5dvw] uppercase tracking-widest">
                    <AnimText delay={0.4} className="max-md:hidden">
                      <svg viewBox="0 0 120.02 60.51" className="size-[1.5dvw] max-md:size-[7dvw] fill-text">
                        <g>
                          <g>
                            <path d="M37.42,59.78C21.88,54.19,8.8,44.08,0,30.68,9.89,16.69,19.7,7.83,40.16.68c-20.74,11.74-22.35,45.43-2.74,59.1Z" />
                            <path d="M120.02,30.68c-8.57,13.46-23.87,25-39.57,29.83,20.97-13.56,19.23-49.05-2.88-60.51,15.12,2.85,36.71,19.75,42.45,30.68Z" />
                          </g>
                          <g>
                            <path d="M37.42,59.78C21.88,54.2,8.79,44.08,0,30.68,9.89,16.69,19.71,7.83,40.16.68c-20.74,11.74-22.35,45.43-2.74,59.1Z" />
                            <polygon points="65.91 38.82 67.95 55.13 60.01 40.73 52.07 55.13 54.11 38.81 39.22 45.8 50.45 33.79 34.31 30.68 50.45 27.57 39.22 15.57 54.11 22.55 52.07 6.23 60.01 20.63 67.95 6.23 65.91 22.55 80.8 15.57 69.57 27.57 85.71 30.68 69.57 33.79 80.8 45.8 65.91 38.82" />
                            <path d="M120.02,30.68c-8.57,13.46-23.87,25-39.57,29.83,20.97-13.56,19.23-49.05-2.88-60.51,15.11,2.85,36.71,19.75,42.45,30.68Z" />
                          </g>
                          <polygon points="80.8 45.8 65.91 38.82 67.95 55.13 60.01 40.73 52.07 55.13 54.11 38.81 39.22 45.8 50.45 33.79 34.31 30.68 50.45 27.57 39.22 15.57 54.11 22.55 52.07 6.23 60.01 20.63 67.95 6.23 65.91 22.55 80.8 15.57 69.57 27.57 85.71 30.68 69.57 33.79 80.8 45.8" />
                        </g>
                      </svg>
                    </AnimText>

                    <AnimText delay={0.5}>
                      <span>More Info about {projectTitle}</span>
                    </AnimText>
                  </div>

                  <CloseBtn onClick={close} className="origin-top" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20, filter: 'blur(2px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: 20, filter: 'blur(2px)' }}
                  transition={{ delay: 0.2, duration: 0.5, ease: easings.cubiz, filter: { delay: 1, duration: 0.5 } }}
                  className="flex-1 overflow-y-auto"
                >
                  <AnimText
                    delay={0.5}
                    stagger={0.009}
                    className="font-sec font-bold text-[1.1dvw] text-text/90 max-md:text-[3.5dvw] leading-relaxed"
                  >
                    {moreInfo}
                  </AnimText>
                </motion.div>

                <button></button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}
