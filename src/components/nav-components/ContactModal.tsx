'use client'

import { createPortal } from 'react-dom'
import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useSoundEffects } from '@/hooks/useSoundEffects'
import { easings } from '@/utils/anim'
import { Plus } from 'lucide-react'
import AnimText from '@/components/ui/unstyled/AnimText'
import CloseBtn from '@/components/ui/buttons/CloseBtn'
import { CONTACT } from '@/data/db'

export default function ContactModal() {
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
      {/* trigger */}
      <div className="max-md:scale-70 md:scale-y-120 max-md:-my-3">
        <motion.button
          onClick={() => {
            setOpen(true)
            click()
          }}
          onMouseEnter={() => hoverSound()}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', damping: 8, stiffness: 300 }}
          className="group z-10 relative overflow-hidden text-shadow-2xs hover:text-shadow-main outline-none font-wide hover:text-main uppercase scale-x-170 max-md:scale-y-85 origin-right duration-300 py-3.5 max-md:py-3 cursor-pointer"
        >
          <span className={`duration-300 ${open ? 'pe-0 ps-2' : 'pe-2.5 group-hover:pe-0 group-hover:ps-2'}`}>Con</span>

          <svg
            viewBox="0 0 100 100"
            className={`absolute top-0 left-1 size-12 group-hover:blur-2xl fill-text group-hover:fill-main scale-y-70 duration-300 ${open ? 'blur-2xl' : 'blur-0'}`}
          >
            <path d="M85.36,15.38h19.22V0h-21.66l-30.63,30.64L21.66,0H0v15.38h19.22c9.77,0,17.69,7.92,17.69,17.69v38.44c0,9.77-7.92,17.69-17.69,17.69H0v15.38h21.66l30.63-30.63,30.63,30.63h21.66v-15.38h-19.22c-9.77,0-17.69-7.92-17.69-17.69v-38.44c0-9.77,7.92-17.69,17.69-17.69Z" />
          </svg>

          <span className={`${open ? 'inline-block' : 'hidden group-hover:inline-block'}`}>t</span>
          <span className={`duration-300 ${open ? 'ps-0 pe-2' : 'ps-3 group-hover:ps-0 group-hover:pe-2'}`}>act</span>
        </motion.button>
      </div>

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

              <div className="relative flex flex-col w-full max-w-md overflow-hidden overscroll-contain bg-text/22 rounded-lg m-2 p-9">
                <motion.div
                  initial={{ opacity: 0, y: 28, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: 28, filter: 'blur(10px)' }}
                  transition={{ delay: 0.06, duration: 0.6342, ease: easings.cubiz, filter: { delay: 0.674, duration: 0.342 } }}
                  className="flex justify-between items-center mb-6"
                >
                  <AnimText
                    as="h2"
                    delay={0.5}
                    className="blur-[1.2px] font-sec font-semibold text-lg md:text-xl uppercase tracking-widest"
                  >
                    Reach_out
                  </AnimText>

                  <CloseBtn onClick={close} />
                </motion.div>

                <ul className="flex flex-col gap-1.5">
                  {CONTACT.map((item, i) => {
                    return (
                      <motion.li
                        key={item.href}
                        onMouseEnter={() => hoverSound()}
                        initial={{ opacity: 0, scale: 0.9, y: 50, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{
                          opacity: 0,
                          scale: 0.9,
                          y: 100,
                          filter: 'blur(10px)',
                          transition: { delay: 0.24 + i * 0.055, duration: 0.42, ease: easings.cubiz },
                        }}
                        transition={{ delay: 0.34 + i * 0.055, duration: 0.42, ease: easings.cubiz, filter: { delay: 0.674 } }}
                      >
                        <a
                          href={item.href}
                          onClick={() => click()}
                          target={item.href.startsWith('http') ? '_blank' : undefined}
                          rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="group flex justify-between hover:bg-bg/8 blur-[0.8px] hover:blur-none rounded-2xl hover:text-main uppercase px-2 py-1"
                        >
                          <AnimText delay={0.1 * i} className="max-md:text-sm scale-x-140 scale-y-90 origin-left">
                            {item.text}
                          </AnimText>

                          <Plus size={16} strokeWidth={1.5} className="group-hover:rotate-70 duration-300" />
                        </a>
                      </motion.li>
                    )
                  })}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}
