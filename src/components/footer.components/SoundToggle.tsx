'use client'

import { useSoundEffects } from '@/hooks/useSoundEffects'
import { useSoundStore } from '@/store/useSoundStore'

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
      {isMuted ? (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
          />
        </svg>
      ) : (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
          />
        </svg>
      )}
    </div>
  )
}
