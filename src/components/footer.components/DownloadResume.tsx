'use client'

import { useSoundEffects } from '@/hooks/useSoundEffects'
import { BIO } from '@/data/db'

export default function DownloadResume() {
  const { hoverSound, click } = useSoundEffects()

  return (
    <a href={BIO.resume} target="_blank" rel="noopener noreferrer">
      <div
        onClick={() => click()}
        onMouseEnter={() => hoverSound()}
        className="hover:bg-main/10 text-shadow-2xs hover:text-shadow-main border border-text/50 border-dashed rounded-full font-wide text-[4.5dvw] md:text-[1.05dvw] text-nowrap tracking-wide scale-x-125 scale-y-110 origin-left me-[2dvw] px-4 py-2 cursor-pointer"
      >
        Download Resume
      </div>
    </a>
  )
}
