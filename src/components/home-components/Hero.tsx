'use client'

import Image from 'next/image'
import { useEffect } from 'react'
import { useUIStore } from '@/store/useUIStore'
import { useLenis } from '@/hooks/useLenis'
import { MotionLineV } from '@/components/ui/effects/Lines'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import MoodsToggle from '@/components/home-components/MoodsToggle'
import AboutSection from '@/components/home-components/AboutSection'
import SkillsSection from '@/components/home-components/SkillsSection'
import HeroCenter from '@/components/home-components/HeroCenter'
import ProjectsList from '@/components/home-components/ProjectsList'
import { WEB_PROJECTS } from '@/data/db'

let isFirstLoad = true

export default function Hero() {
  const { selectedProject, setSelectedProject, setFirstLoadComplete } = useUIStore()
  const { elementRef: scrollRef } = useLenis<HTMLDivElement>()
  const { elementRef: scrollRef3 } = useLenis<HTMLDivElement>()

  useEffect(() => {
    if (isFirstLoad) {
      const timer = setTimeout(() => {
        if (!selectedProject) setSelectedProject(WEB_PROJECTS[0])
        setFirstLoadComplete()
      }, 1500)
      isFirstLoad = false
      return () => clearTimeout(timer)
    }
  }, [selectedProject, setSelectedProject, setFirstLoadComplete])

  return (
    <section className="relative flex-1 size-full px-4 max-md:px-2">
      <div className="max-md:gap-8 grid grid-cols-1 md:grid-cols-8 size-full">
        {/* left - bottom on mobile */}
        <div className="flex max-md:flex-col max-md:order-last md:col-span-2">
          <div ref={scrollRef} className="flex flex-col gap-[4dvw] md:gap-[2dvw] md:max-h-[82dvh] size-full overflow-hidden max-md:px-2">
            <MoodsToggle />
            <AboutSection />
            <SkillsSection />
          </div>
          <MotionLineV className="max-md:hidden" />
        </div>

        {/* center */}
        <div className="max-md:order-first col-span-4 max-md:col-span-full">
          <HeroCenter />
        </div>

        {/* right - top on mobile */}
        <div className="flex md:col-span-2">
          <MotionLineV className="max-md:hidden" />
          <div
            ref={scrollRef3}
            className="flex flex-col gap-[2dvw] max-md:gap-[4dvw] md:max-h-[82dvh] size-full overflow-hidden max-md:px-2"
          >
            <ProjectsList />
          </div>
        </div>

        <AnimIn center blur delay={2} className="md:hidden col-span-full p-2">
          <Image src="/images/ngm-red.webp" alt="NGM" width={800} height={600} className="w-full h-auto active:invert rounded-lg" />
        </AnimIn>
      </div>
    </section>
  )
}
