'use client'

import AnimIn from '@/components/ui/unstyled/AnimIn'
import { MotionLine } from '@/components/ui/effects/Lines'
import DashGame from '@/components/footer.components/DashGame'
import DownloadResume from '@/components/footer.components/DownloadResume'
import SoundToggle from '@/components/footer.components/SoundToggle'
import DebugPanel from '@/components/footer.components/DebugPanel'
import { BIO } from '@/data/db'
import { useIsMobile } from '@/hooks/useIsMobile'

export default function Footer() {
  const isMobile = useIsMobile()
  const delay = isMobile ? 0.3 : 2.2

  return (
    <footer className="z-50 relative w-full overflow-hidden p-2 md:pt-0">
      <MotionLine delay={delay - 1} className="max-md:hidden" />

      <AnimIn delay={delay} center blur className="flex max-md:flex-col-reverse justify-between items-center max-md:pt-6">
        <div className="w-full md:max-w-[26dvw] px-2">
          <div className="space-x-[0.1dvw] font-wide uppercase scale-x-214 scale-y-200 max-md:scale-y-125 origin-left">
            <span className="text-[2dvw] max-md:text-[7.7dvw] tracking-tighter">{BIO.name}</span>
            <span className="text-[0.7dvw] text-text/50 max-md:text-[2dvw] tracking-tighter">@ {new Date().getFullYear()} NGM</span>
          </div>
        </div>

        <MotionLine delay={delay - 1} className="md:hidden w-full" />

        <DashGame />

        <div className="flex justify-between items-center gap-[1dvw] max-md:w-full h-[3.5dvw] max-md:mb-6 px-2">
          <DownloadResume />
          <SoundToggle />
          <DebugPanel />
        </div>
      </AnimIn>
    </footer>
  )
}
