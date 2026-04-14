'use client'

import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { useEffect, useCallback } from 'react'
import { useSoundEffects } from '@/hooks/useSoundEffects'
import CloseBtn from '@/components/ui/buttons/CloseBtn'
import { ImageItem } from '@/components/app-components/image-modal/types'

export default function PreviewModal({
  gallery,
  currentIndex,
  onClose,
  onNavigate,
}: {
  gallery: ImageItem[]
  currentIndex: number | null
  onClose: () => void
  onNavigate: (index: number) => void
}) {
  const { click } = useSoundEffects()
  const hasPrev = currentIndex !== null && currentIndex > 0
  const hasNext = currentIndex !== null && currentIndex < gallery.length - 1

  const goPrev = useCallback(() => {
    if (hasPrev && currentIndex !== null) {
      onNavigate(currentIndex - 1)
    }
  }, [hasPrev, currentIndex, onNavigate])

  const goNext = useCallback(() => {
    if (hasNext && currentIndex !== null) {
      onNavigate(currentIndex + 1)
    }
  }, [hasNext, currentIndex, onNavigate])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goPrev, goNext, onClose])

  const image = currentIndex !== null ? gallery[currentIndex] : null

  return (
    <AnimatePresence>
      {image && (
        <motion.div
          // onClick={onClose}
          onWheel={(e) => e.stopPropagation()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300, mass: 0.5 }}
          className="z-9999 fixed inset-0 flex justify-center items-center bg-bg/50 backdrop-blur-lg p-8 cursor-default"
        >
          {/* Prev Button */}
          {hasPrev && (
            <motion.button
              initial={{ x: -200 }}
              animate={{ x: 0 }}
              exit={{ x: -200 }}
              transition={{ delay: 0.1 }}
              onClick={(e) => {
                e.stopPropagation()
                goPrev()
                click()
              }}
              className="bottom-4 left-4 z-50 absolute blur-[0.2px] hover:blur-none font-wide text-[3dvw] md:text-[0.7dvw] hover:text-main uppercase scale-x-400 origin-left cursor-pointer pointer-events-auto"
            >
              Prev
            </motion.button>
          )}

          {/* Next Button */}
          {hasNext && (
            <motion.button
              initial={{ x: 200 }}
              animate={{ x: 0 }}
              exit={{ x: 200 }}
              transition={{ delay: 0.1 }}
              onClick={(e) => {
                e.stopPropagation()
                goNext()
                click()
              }}
              className="right-4 bottom-4 z-50 absolute blur-[0.2px] hover:blur-none font-wide text-[3dvw] md:text-[0.7dvw] hover:text-main uppercase scale-x-400 origin-right cursor-pointer pointer-events-auto"
            >
              Next
            </motion.button>
          )}

          <div className="top-4 right-6 lg:right-8 z-50 absolute pointer-events-auto">
            <CloseBtn onClick={onClose} />
          </div>

          {/* Counter */}
          <motion.div
            initial={{ opacity: 0, y: 200 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bottom-3 left-1/2 z-50 absolute blur-[0.7px] font-wide text-[6dvw] md:text-[3dvw] leading-none scale-x-200 scale-y-80 -translate-x-1/2"
          >
            {currentIndex !== null ? currentIndex + 1 : 0} / {gallery.length}
          </motion.div>

          <div className="relative w-full max-w-7xl h-full max-h-[90dvh]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ type: 'spring', damping: 20, stiffness: 300, mass: 0.5 }}
                className="relative w-full h-full"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  quality={100}
                  priority
                  unoptimized={image.src.toString().toLowerCase().endsWith('.gif')}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
