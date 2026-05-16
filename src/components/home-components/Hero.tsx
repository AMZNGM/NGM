'use client'

import Image from 'next/image'
import { AnimatePresence, motion } from 'motion/react'
import { useUIStore } from '@/store/useUIStore'
import { useLenis } from '@/hooks/useLenis'
import { MotionLineV } from '@/components/ui/effects/Lines'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import MoodsToggle from '@/components/home-components/MoodsToggle'
import AboutSection from '@/components/home-components/AboutSection'
import SkillsSection from '@/components/home-components/SkillsSection'
import HeroCenter from '@/components/home-components/HeroCenter'
import IntroScene from '@/components/home-components/IntroScene'
import ProjectsList from '@/components/home-components/ProjectsList'
import { Suspense } from 'react'

export default function Hero() {
  const { showIntro } = useUIStore()
  const { elementRef: scrollRef } = useLenis<HTMLDivElement>()
  const { elementRef: scrollRef3 } = useLenis<HTMLDivElement>()

  return (
    <section className="relative flex-1 size-full px-4 max-md:px-2">
      <div className="max-md:gap-8 grid grid-cols-1 md:grid-cols-8 size-full">
        {/* left - bottom on mobile */}
        <div className="flex max-md:flex-col max-md:order-last md:col-span-2">
          <div ref={scrollRef} className="flex flex-col gap-[4dvw] md:gap-[1dvw] md:max-h-[83dvh] size-full overflow-hidden max-md:px-2">
            <MoodsToggle />
            <AboutSection />
            <SkillsSection />
          </div>

          <MotionLineV className="max-md:hidden" />
          <AnimIn
            delay={2}
            className="max-md:hidden -bottom-2 left-1/2 z-501 w-[98dvw] h-12 bg-linear-to-b from-transparent to-bg -translate-x-1/2 absolute!"
          ></AnimIn>
        </div>

        {/* center */}
        <div className="max-md:order-first col-span-4 max-md:col-span-full">
          <AnimatePresence mode="wait">
            {showIntro ? (
              <motion.div
                key="intro"
                className="size-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{
                  opacity: 0,
                  scale: 1.9,
                  filter: 'blur(20px)',
                  y: -50,
                  rotateZ: 36000,
                  transition: { duration: 0.7, ease: [0.32, 0, 0.67, 0] },
                }}
              >
                <AnimIn center blur delay={2} className="max-md:h-100 md:max-h-[83dvh] size-full">
                  <Suspense fallback={null}>
                    <IntroScene />
                  </Suspense>
                </AnimIn>
              </motion.div>
            ) : (
              <motion.div
                key="center"
                className="md:max-h-[83dvh] size-full"
                initial={{ opacity: 0, y: 30, filter: 'blur(16px)', scale: 1.04 }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              >
                <HeroCenter />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* right - top on mobile */}
        <div className="flex md:col-span-2">
          <MotionLineV className="max-md:hidden" />
          <div
            ref={scrollRef3}
            className="flex flex-col gap-[2dvw] max-md:gap-[4dvw] md:max-h-[83dvh] size-full overflow-hidden max-md:px-2"
          >
            <ProjectsList />
          </div>
        </div>

        <AnimIn center blur delay={2} className="md:hidden col-span-full p-2">
          <Image src="/images/ngm-red.webp" alt="NGM" width={800} height={600} className="w-full h-auto active:invert rounded-lg" />
        </AnimIn>
      </div>

      <div className="z-9999 relative pointer-events-none select-none">
        <div className="top-0 right-0 fixed w-9 h-full bg-linear-to-r from-transparent via-transparent to-bg" />
        <div className="top-0 left-0 fixed w-9 h-full bg-linear-to-l from-transparent via-transparent to-bg" />
        <div className="top-0 right-0 left-0 fixed w-full h-9 bg-linear-to-t from-transparent via-transparent to-bg" />
        <div className="right-0 bottom-0 left-0 fixed w-full h-9 bg-linear-to-b from-transparent via-transparent to-bg" />
      </div>
    </section>
  )
}
