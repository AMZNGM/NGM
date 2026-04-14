'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useSoundEffects } from '@/hooks/useSoundEffects'
import WorkCard from '@/components/ui/cards/WorkCards'
import WorkSkeleton from '@/components/ui/loaders/WorkSkeleton'
import { getAudioProjects } from '@/data/db'
import { WorkItem } from '@/types/work'

export default function AudioWork() {
  const isMobile = useIsMobile()
  const { click } = useSoundEffects()
  const [items, setItems] = useState<WorkItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWork = async () => {
      try {
        const audioItems = await getAudioProjects()

        const combined = [...audioItems].sort((a, b) => {
          const dateA = a.date ? new Date(a.date).getTime() : 0
          const dateB = b.date ? new Date(b.date).getTime() : 0
          return dateB - dateA
        })

        setItems(combined)
      } catch (error) {
        console.error('Error fetching audio work:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchWork()
  }, [])

  return (
    <section className="relative flex flex-col gap-[2dvw] size-full px-2.5 py-[2dvw]">
      <h3 className="group font-wide text-[9.3dvw] md:text-[4.99dvw] text-center uppercase text-nowrap leading-none tracking-tight scale-y-225 max-md:my-[4dvw] md:mb-[0.5dvw] py-[0.5dvw]">
        <div className="-z-10 pointer-events-none">
          <div className="top-[1.5dvw] max-md:top-[6dvw] absolute w-0 group-hover:w-full h-[0.3dvw] max-md:h-[0.8dvw] bg-main origin-center duration-1700 mix-blend-hue" />
          <div className="bottom-[1.5dvw] max-md:bottom-[6dvw] absolute w-0 group-hover:w-full h-[0.3dvw] max-md:h-[0.8dvw] bg-main origin-center duration-1700 mix-blend-hue" />
        </div>

        {'My Latest Audio Production work'.split('').map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.02, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            whileHover={{
              scale: 1.2,
              color: 'var(--color-main)',
              textShadow: '0 0 20px rgba(255, 99, 51, 0.5)',
              transition: { duration: 0.15 },
            }}
            style={{ whiteSpace: char === ' ' ? 'pre' : undefined }}
            className="inline-block cursor-default"
          >
            {char}
          </motion.span>
        ))}
      </h3>

      {loading ? (
        <WorkSkeleton count={8} />
      ) : (
        <div className="gap-[0.8dvw] max-md:gap-[3dvw] grid grid-cols-2 md:grid-cols-12 grid-flow-dense auto-rows-min">
          {(() => {
            const PATTERN: Array<'featured' | 'standard' | 'list'> = isMobile
              ? [
                  'featured',
                  'standard',
                  'standard',
                  'standard',
                  'list',
                  'list',
                  'list',
                  'standard',
                  'standard',
                  'featured',
                  'list',
                  'featured',
                  'featured',
                  'featured',
                  'standard',
                  'standard',
                  'featured',
                  'featured',
                  'featured',
                ]
              : [
                  'featured',
                  'standard',
                  'standard',
                  'standard',
                  'standard',
                  'list',
                  'list',
                  'list',
                  'standard',
                  'standard',
                  'standard',
                  'standard',
                ]

            const variants = items.map((_, i) => PATTERN[i % PATTERN.length])

            const colClass: Record<string, string> = {
              featured: 'col-span-2 md:col-span-9 md:row-span-3',
              standard: 'col-span-1 md:col-span-3 md:row-span-2',
              list: 'col-span-full',
            }

            return (
              <AnimatePresence mode="popLayout">
                {items.map((item, index) => {
                  const variant = variants[index]
                  return (
                    <motion.div layout key={item.id + index} onClick={() => click()} className={`${colClass[variant]} h-full`}>
                      <WorkCard item={item} index={index} variant={variant} />
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            )
          })()}
        </div>
      )}
    </section>
  )
}
