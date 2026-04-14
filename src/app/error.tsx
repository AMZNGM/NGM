'use client'

import { useEffect } from 'react'
import Bg from '@/components/ui/Bg'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="z-10 relative flex flex-col justify-center items-center w-dvw h-dvh overflow-hidden font-wide text-main uppercase hide-nav">
      <Bg mode={1} />

      <div className="absolute inset-0 flex flex-col justify-center items-center text-[20dvw] leading-[14.5dvw] scale-x-300 pointer-events-none select-none">
        {Array.from({ length: 25 }).map((_, i) => (
          <h2 key={i} className="animate-pulse">
            ERROR
          </h2>
        ))}
      </div>

      <button
        onClick={() => reset()}
        className="z-10 bg-bg hover:border border-2 hover:border-main text-[4dvw] max-md:text-6xl leading-[6dvw] px-4 py-2 cursor-pointer"
      >
        Reload
      </button>
    </main>
  )
}
