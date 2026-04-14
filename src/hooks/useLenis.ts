'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

export function useLenis<T extends HTMLElement>() {
  const elementRef = useRef<T>(null)
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    if (!elementRef.current) return

    const lenis = new Lenis({
      wrapper: elementRef.current,
      content: elementRef.current,
      lerp: 0.1,
      wheelMultiplier: 1,
      touchMultiplier: 1,
      infinite: false,
    })

    lenisRef.current = lenis

    let resizeTimeout: NodeJS.Timeout

    const debouncedResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        lenis.resize()
      }, 50)
    }

    const resizeObserver = new ResizeObserver(() => {
      debouncedResize()
    })

    // Observe wrapper and initial children
    resizeObserver.observe(elementRef.current)
    Array.from(elementRef.current.children).forEach((child) => {
      resizeObserver.observe(child)
    })

    // Catch DOM additions/removals
    const mutationObserver = new MutationObserver((mutations) => {
      let shouldResize = false
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          shouldResize = true
          mutation.addedNodes.forEach((node) => {
            if (node instanceof HTMLElement) {
              resizeObserver.observe(node)
              // Catch any direct children of added nodes too
              Array.from(node.children).forEach((child) => resizeObserver.observe(child))
            }
          })
        }
      })
      if (shouldResize) {
        debouncedResize()
      }
    })

    mutationObserver.observe(elementRef.current, {
      childList: true,
      subtree: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    const rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(resizeTimeout)
      resizeObserver.disconnect()
      mutationObserver.disconnect()
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return { elementRef, lenisRef }
}
