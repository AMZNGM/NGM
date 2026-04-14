'use client'

import dynamic from 'next/dynamic'
import { MotionLine } from '@/components/ui/effects/Lines'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import DigitalClock from '@/components/nav-components/DigitalClock'
const Modal3d = dynamic(() => import('@/components/nav-components/Modal3d'), { ssr: false })
const ContactModal = dynamic(() => import('@/components/nav-components/ContactModal'), { ssr: false })

export default function Navbar() {
  return (
    <AnimIn
      as="nav"
      center
      blur
      delay={2}
      className="max-md:top-0 z-50 relative w-full max-md:backdrop-blur-2xl max-md:scale-y-85 max-md:origin-top p-2 md:pb-0 max-md:sticky!"
    >
      <div className="flex justify-between items-center">
        <DigitalClock />
        <Modal3d />
        <ContactModal />
      </div>

      <MotionLine delay={1.2} />
    </AnimIn>
  )
}
