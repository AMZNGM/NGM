'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { AnimatePresence } from 'motion/react'
import { useSoundEffects } from '@/hooks/useSoundEffects'
import { InfiniteCanvas } from '@/components/app-components/image-modal/InfiniteCanvas'
import { ImageItem, ImageModalContextType } from '@/components/app-components/image-modal/types'

const ImageModalContext = createContext<ImageModalContextType | undefined>(undefined)

export function ImageModalProvider({ children }: { children: ReactNode }) {
  const { woosh2 } = useSoundEffects()
  const [isOpen, setIsOpen] = useState(false)
  const [gallery, setGallery] = useState<ImageItem[]>([])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [initialIdx, setInitialIdx] = useState(0)

  const openModal = (images: ImageItem[], initialIndex: number) => {
    setGallery(images)
    setInitialIdx(initialIndex)
    setIsOpen(true)
  }

  const closeModal = () => {
    woosh2()
    setIsOpen(false)
  }

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <ImageModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <AnimatePresence>{isOpen && gallery.length > 0 && <InfiniteCanvas gallery={gallery} closeModal={closeModal} />}</AnimatePresence>
    </ImageModalContext.Provider>
  )
}

export function useImageModal() {
  const context = useContext(ImageModalContext)
  if (context === undefined) {
    throw new Error('useImageModal must be used within an ImageModalProvider')
  }
  return context
}
