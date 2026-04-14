'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { easings } from '@/utils/anim'
import { useLenis } from '@/hooks/useLenis'
import { useUIStore, type TabType } from '@/store/useUIStore'
import { useSoundEffects } from '@/hooks/useSoundEffects'
import { MotionLine } from '@/components/ui/effects/Lines'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import GooeySvgFilter from '@/components/ui/effects/GooeySvgFilter'
import ProjectDetails from '@/components/home-components/ProjectDetails'
import LatestWork from '@/components/home-components/LatestWork'
import AudioWork from '@/components/home-components/AudioWork'

export default function HeroCenter() {
  const { click } = useSoundEffects()
  const { selectedProject, activeTab, setActiveTab, setIsAudio } = useUIStore()
  const [animationDelay, setAnimationDelay] = useState(0)
  const [pendingTab, setPendingTab] = useState<TabType | null>(null)
  const { elementRef: scrollRef, lenisRef } = useLenis<HTMLDivElement>()

  // scroll to top when project changes
  useEffect(() => {
    if (lenisRef.current) {
      const scrollTop = lenisRef.current.scroll
      const hasScrollPosition = scrollTop > 10
      requestAnimationFrame(() => {
        setAnimationDelay(hasScrollPosition ? 0.3 : 0)
      })
      lenisRef.current.scrollTo(0, {
        duration: hasScrollPosition ? 0.72323 : 0,
        easing: easings.cubiz,
      })
    }
  }, [selectedProject, lenisRef])

  // handle pending tab after scroll completes
  useEffect(() => {
    if (!pendingTab || !lenisRef.current) return

    const scrollTop = lenisRef.current.scroll
    if (scrollTop === 0) {
      // already at top, change tab immediately via microtask
      queueMicrotask(() => {
        setActiveTab(pendingTab)
        setPendingTab(null)
      })
      return
    }

    // need to scroll first
    lenisRef.current.scrollTo(0, {
      duration: 0.4,
      easing: easings.cubiz,
    })

    // wait for scroll to complete then change tab
    const timeout = setTimeout(() => {
      setActiveTab(pendingTab)
      setPendingTab(null)
    }, 400)

    return () => clearTimeout(timeout)
  }, [pendingTab, lenisRef, setActiveTab])

  // switch to gallery tab when a project is selected
  useEffect(() => {
    if (selectedProject) {
      const frame = requestAnimationFrame(() => {
        setActiveTab('gallery')
      })
      return () => cancelAnimationFrame(frame)
    }
  }, [selectedProject, setActiveTab])

  const tabs = [
    {
      id: 'gallery' as const,
      label: 'Gallery',
      exitX: 100,
      content: (
        <AnimatePresence mode="wait">
          {selectedProject ? (
            <motion.div
              key={selectedProject.title}
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.4, delay: animationDelay, ease: easings.cubiz }}
            >
              <ProjectDetails project={selectedProject} />
            </motion.div>
          ) : (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(10px)' }}
              transition={{ duration: 0.3, ease: easings.cubiz }}
            >
              <ProjectDetails project={null} />
            </motion.div>
          )}
        </AnimatePresence>
      ),
    },
    { id: 'latest' as const, label: 'Latest Work', exitX: 100, content: <LatestWork /> },
    { id: 'audio' as const, label: 'Audio work', exitX: -100, content: <AudioWork /> },
  ]

  return (
    <section className="relative flex flex-col size-full max-md:bg-text/12 rounded-lg p-1 pt-2">
      <GooeySvgFilter id="hero-gooey" strength={2} />

      {/* Tabs */}
      <AnimIn center blur delay={2.5} className="relative scale-y-75 origin-top">
        {/* gooey */}
        <div style={{ filter: 'url(#hero-gooey)' }} className="flex items-center w-full">
          {tabs.map((tab) => (
            <div key={tab.id} className="relative flex-1 h-12">
              {activeTab === tab.id && (
                <motion.div
                  layoutId="tab-pill"
                  transition={{ type: 'spring', bounce: 0.1, duration: 0.6 }}
                  className="absolute inset-0 bg-text rounded-full"
                />
              )}
            </div>
          ))}
        </div>

        {/* btns */}
        <div className="absolute inset-0 flex justify-center items-center py-4">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => {
                if (tab.id !== activeTab) {
                  setPendingTab(tab.id)
                  setIsAudio(tab.id === 'audio')
                  click()
                }
              }}
              whileTap={{ scale: 0.9 }}
              className="flex flex-1 justify-center items-center h-11 text-shadow-text hover:text-shadow-xs cursor-pointer pointer-events-auto mix-blend-difference"
            >
              <span className="font-wide text-[3dvw] md:text-[0.85dvw] uppercase scale-x-220 scale-y-150">{tab.label}</span>
            </motion.button>
          ))}
        </div>
      </AnimIn>

      <MotionLine delay={1.2} className="-mt-2 md:-mt-3!" />

      {/* Scrollable Content Area */}
      <div
        ref={scrollRef}
        className="relative flex flex-col gap-8 max-h-[75.9dvh] max-md:max-h-[52dvh] size-full md:overflow-hidden overflow-x-hidden overflow-y-auto"
      >
        <AnimatePresence mode="wait">
          {tabs.map(
            (tab) =>
              activeTab === tab.id && (
                <motion.div
                  key={`${tab.id}-tab`}
                  initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: tab.exitX, filter: 'blur(10px)' }}
                  transition={{ duration: 0.4, ease: easings.cubiz }}
                  className="size-full"
                >
                  {tab.content}
                </motion.div>
              )
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
