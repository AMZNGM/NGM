'use client'

import BgDitherVeil from '@/components/ui/BgDitherVeil'
import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="relative flex justify-center items-center w-dvw h-dvh overflow-hidden bg-bg font-sec text-text">
      <BgDitherVeil />
      <div className="absolute inset-0 flex flex-col justify-center items-center text-main pointer-events-none select-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <h2 key={i} className="animate-pulse">
            ERROR
          </h2>
        ))}
      </div>

      <button onClick={() => reset()} className="z-10 bg-bg hover:border cursor-pointer">
        Reload
      </button>
    </main>
  )
}
