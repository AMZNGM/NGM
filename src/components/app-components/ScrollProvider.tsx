'use client'

import { useEffect, useRef } from 'react'
import LocomotiveScroll from 'locomotive-scroll'

export default function ScrollProvider({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInitializedRef = useRef(false)

  useEffect(() => {
    if (isInitializedRef.current || !containerRef.current) return

    isInitializedRef.current = true
    const scroll = new LocomotiveScroll({
      smooth: true,
      lerp: 0.1,
      el: containerRef.current,
    } as Record<string, unknown>)

    return () => {
      scroll.destroy()
      isInitializedRef.current = false
    }
  }, [])

  return (
    <div ref={containerRef} data-scroll-container>
      {children}
    </div>
  )
}

// data-scroll
// data-scroll-speed="0.2"
