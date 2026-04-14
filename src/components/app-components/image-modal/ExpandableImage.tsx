'use client'

import Image, { ImageProps } from 'next/image'
import { createPortal } from 'react-dom'
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useImageModal, ImageItem } from '@/components/app-components/image-modal'
import { useSoundEffects } from '@/hooks/useSoundEffects'

export default function ExpandableImage({
  wrapperClassName,
  className,
  alt,
  gallery,
  initialIndex,
  ...props
}: ImageProps & {
  wrapperClassName?: string
  gallery?: ImageItem[]
  initialIndex?: number
}) {
  const { openModal } = useImageModal()
  const { woosh } = useSoundEffects()
  const [isFlashing, setIsFlashing] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  const handleOpen = () => {
    woosh()
    setHasInteracted(true)
    setIsFlashing(true)

    setTimeout(() => {
      setIsFlashing(false)
    }, 800)

    if (gallery && gallery.length > 0) {
      openModal(gallery, initialIndex || 0)
    } else {
      // @ts-expect-error - NextJS image types encompass more than our simplified Context type
      openModal([{ src: props.src, alt }], 0)
    }
  }

  return (
    <>
      {hasInteracted &&
        typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence mode="wait">
            {isFlashing && (
              <motion.div
                key="flash-screen"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="z-99999 fixed inset-0 bg-white pointer-events-none"
              />
            )}
          </AnimatePresence>,
          document.body
        )}

      <div onClick={handleOpen} className={`relative group cursor-zoom-in overflow-hidden ${wrapperClassName || ''}`}>
        <Image alt={alt} {...props} className={`${className || ''}`} />
      </div>
    </>
  )
}
