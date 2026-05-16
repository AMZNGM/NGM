'use client'

import { useSoundEffects } from '@/hooks/useSoundEffects'
import { useSoundStore } from '@/store/useSoundStore'
import { Volume2, VolumeX } from 'lucide-react'

export default function SoundToggle() {
  const { isMuted, toggleMute } = useSoundStore()
  const { hoverSound, click } = useSoundEffects()

  return (
    <div
      onClick={() => {
        toggleMute()
        click()
      }}
      onMouseEnter={() => hoverSound()}
      className={`border border-dashed px-3 py-[1.2dvw] max-md:px-2 max-md:py-2 scale-x-75 max-md:origin-right scale-y-75 hover:bg-main/10 cursor-pointer ${isMuted ? 'border-main bg-main/20' : 'border-text/50 bg-transparent'}`}
    >
      {isMuted ? <VolumeX /> : <Volume2 />}
    </div>
  )
}
