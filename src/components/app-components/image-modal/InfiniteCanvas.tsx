'use client'

import Image from 'next/image'
import { useRef, useEffect, useState } from 'react'
import { motion, useMotionValue, useTransform, useDragControls, useSpring } from 'motion/react'
import { useSoundEffects } from '@/hooks/useSoundEffects'
import { ImageItem } from '@/components/app-components/image-modal/types'
import CloseBtn from '@/components/ui/buttons/CloseBtn'
import PreviewModal from '@/components/app-components/image-modal/PreviewModal'

export function InfiniteCanvas({ gallery, closeModal }: { gallery: ImageItem[]; closeModal: () => void }) {
  const { click } = useSoundEffects()
  const containerRef = useRef<HTMLDivElement>(null)
  const [previewIndex, setPreviewIndex] = useState<number | null>(null)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const dragControls = useDragControls()
  const isDragging = useRef(false)

  const total = gallery.length
  const cols = Math.ceil(Math.sqrt(total)) || 1
  const rows = Math.ceil(total / cols) || 1
  const targetTotal = cols * rows
  const filledGallery = Array.from({ length: targetTotal }).map((_, i) => gallery[i % gallery.length])

  const [win, setWin] = useState({ w: 1200, h: 800 })

  useEffect(() => {
    if (typeof window === 'undefined') return
    const update = () => setWin({ w: window.innerWidth, h: window.innerHeight })
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  let vwRatio = 0.4
  if (win.w < 768) vwRatio = 0.8
  else if (win.w < 1024) vwRatio = 0.6

  let imgW = win.w * vwRatio
  if (imgW > 672) imgW = 672
  const imgH = imgW * (9 / 16)

  const gap = win.w * 0.05
  const cellW = imgW + gap
  const cellH = imgH + gap
  const BLOCK_W = Math.max(cols * cellW, 100)
  const BLOCK_H = Math.max(rows * cellH, 100)

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!containerRef.current || previewIndex !== null) return
      e.preventDefault()
      rawX.set(rawX.get() - e.deltaX * 1.5)
      rawY.set(rawY.get() - e.deltaY * 1.5)
    }
    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [rawX, rawY, previewIndex])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (previewIndex !== null) setPreviewIndex(null)
        else closeModal()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [previewIndex, closeModal])

  const wrap = (min: number, max: number, v: number) => {
    const range = max - min
    return ((((v - min) % range) + range) % range) + min
  }

  const springConfig = { stiffness: 400, damping: 40, mass: 0.5 }
  const smoothX = useSpring(rawX, springConfig)
  const smoothY = useSpring(rawY, springConfig)

  const wrappedX = useTransform(smoothX, (v: number) => wrap(-BLOCK_W / 2, BLOCK_W / 2, v))
  const wrappedY = useTransform(smoothY, (v: number) => wrap(-BLOCK_H / 2, BLOCK_H / 2, v))

  const getPosition = (idx: number) => {
    const col = idx % cols
    const row = Math.floor(idx / cols)
    return {
      left: col * cellW + cellW / 2,
      top: row * cellH + cellH / 2,
    }
  }

  const ranges = [-2, -1, 0, 1, 2]

  return (
    <motion.div
      ref={containerRef}
      onPointerDown={(e) => {
        if (previewIndex === null) dragControls.start(e)
      }}
      initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
      animate={{ opacity: 1, backdropFilter: 'blur(16px)' }}
      exit={{ opacity: 0, backdropFilter: 'blur(0px)', transition: { delay: 0.2 } }}
      transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
      className="z-9998 fixed inset-0 overflow-hidden bg-bg/50 touch-none cursor-grab active:cursor-grabbing select-none"
    >
      <motion.div
        drag
        dragControls={dragControls}
        dragListener={false}
        dragMomentum={true}
        onDragStart={() => (isDragging.current = true)}
        onDragEnd={() => setTimeout(() => (isDragging.current = false), 100)}
        style={{ x: rawX, y: rawY, width: 0, height: 0 }}
        className="top-1/2 left-1/2 absolute opacity-0 pointer-events-none"
      />

      <CloseBtn onClick={closeModal} className="top-4 right-6 lg:right-8 z-50 pointer-events-auto absolute!" />

      <motion.div style={{ x: wrappedX, y: wrappedY }} className="top-1/2 left-1/2 z-10 absolute pointer-events-none">
        {ranges.map((r) =>
          ranges.map((c) => (
            <div
              key={`${r}-${c}`}
              style={{
                position: 'absolute',
                width: BLOCK_W,
                height: BLOCK_H,
                left: c * BLOCK_W,
                top: r * BLOCK_H,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {filledGallery.map((item, idx) => {
                const pos = getPosition(idx)
                const rotate = 0
                const isGif = typeof item.src === 'string' ? item.src.toLowerCase().endsWith('.gif') : false

                return (
                  <motion.div
                    key={`${r}-${c}-${idx}`}
                    onPointerDown={(e) => dragControls.start(e)}
                    onClick={() => {
                      if (!isDragging.current) setPreviewIndex(idx % gallery.length)
                      click()
                    }}
                    initial={{ scale: 0.9, opacity: 0, rotate }}
                    animate={{ scale: 1, opacity: 1, rotate }}
                    transition={{ delay: (idx % filledGallery.length) * 0.05, duration: 0.5 }}
                    style={{
                      left: pos.left,
                      top: pos.top,
                      x: '-50%',
                      y: '-50%',
                      width: isGif ? 'auto' : undefined,
                      maxWidth: isGif ? imgW : undefined,
                    }}
                    className={`absolute overflow-hidden shadow-2xl rounded-lg pointer-events-auto ${isGif ? '' : 'max-w-2xl'}`}
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      draggable={false}
                      onDragStart={(e) => e.preventDefault()}
                      priority={r === 0 && c === 0}
                      quality={80}
                      width={2000}
                      height={2000}
                      sizes="(max-width: 768px) 80vw, (max-width: 1024px) 60vw, 600px"
                      className={`h-auto ${isGif ? 'w-auto max-w-full max-h-[80vh] object-contain' : 'w-full'}`}
                      unoptimized={isGif}
                    />
                  </motion.div>
                )
              })}
            </div>
          ))
        )}
      </motion.div>

      <PreviewModal gallery={gallery} currentIndex={previewIndex} onClose={() => setPreviewIndex(null)} onNavigate={setPreviewIndex} />
    </motion.div>
  )
}
