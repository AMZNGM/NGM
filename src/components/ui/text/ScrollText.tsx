'use client'

import React, { ElementType, useMemo, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'motion/react'

const extractTextFromChildren = (children: React.ReactNode): string | undefined => {
  if (children == null) return ''
  if (typeof children === 'string') return children
  if (typeof children === 'number') return String(children)
  if (Array.isArray(children)) {
    return children.map(extractTextFromChildren).join('')
  }
  if (React.isValidElement(children)) {
    const props = (children as React.ReactElement<Record<string, unknown>>).props
    const childText = props.children as React.ReactNode
    if (childText != null) {
      return extractTextFromChildren(childText)
    }
    return ''
  }
}

const ScrollText = ({
  children,
  as = 'span',
  offset = ['0 0', '0 1'],
  className,
  containerRef,
  springConfig = { stiffness: 200, damping: 30 },
  ...props
}: {
  children: React.ReactNode
  as?: ElementType
  containerRef: React.RefObject<HTMLElement | null>
  offset?: [string, string]
  className?: string
  springConfig?: {
    stiffness?: number
    damping?: number
    mass?: number
  }
}) => {
  const ref = useRef<HTMLElement>(null)

  const text = useMemo(() => {
    try {
      return extractTextFromChildren(children)
    } catch (error) {
      console.error(error)
      return ''
    }
  }, [children])

  const { scrollYProgress } = useScroll({
    container: containerRef,
    target: ref,
    offset: offset as [`${number} ${number}`, `${number} ${number}`],
  })

  const springScrollYProgress = useSpring(scrollYProgress, springConfig)
  const top = useTransform(springScrollYProgress, [0, 1], ['0%', '-100%'])
  const bottom = useTransform(springScrollYProgress, [0, 1], ['100%', '0%'])

  const ElementTag = as

  return (
    <ElementTag className={`relative flex justify-center items-center overflow-hidden p-0 ${className}`} ref={ref} {...props}>
      <span className="relative text-transparent" aria-hidden="true">
        {text}
      </span>

      <motion.span className="absolute" style={{ top: top }}>
        {text}
      </motion.span>

      <motion.span className="absolute" style={{ top: bottom }} aria-hidden="true">
        {text}
      </motion.span>
    </ElementTag>
  )
}

ScrollText.displayName = 'ScrollText'

export default ScrollText
