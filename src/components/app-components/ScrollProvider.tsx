'use client'

import { useEffect, useRef } from 'react'
import LocomotiveScroll from 'locomotive-scroll'

export default function ScrollProvider({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const scroll = new LocomotiveScroll({
      smooth: true,
      lerp: 0.1,
    } as Record<string, unknown>)

    return () => scroll.destroy()
  }, [])

  return (
    <div ref={containerRef} data-scroll-container>
      {children}
    </div>
  )
}

// data-scroll
// data-scroll-speed="0.2"
