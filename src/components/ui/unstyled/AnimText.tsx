'use client'

import { isValidElement, useMemo, useRef } from 'react'
import { motion, useReducedMotion, useInView } from 'motion/react'

// ─── animation variants ────────────────────────────────────────────────────
const WORD_HIDDEN = { y: '110%', opacity: 0 }
const WORD_VISIBLE = { y: '0%', opacity: 1 }
const WORD_TRANSITION = { duration: 0.75, ease: [0.22, 1, 0.36, 1] } as const

// ─── single word unit ──────────────────────────────────────────────────────
function Word({ word, index, stagger, delay, reduced }: { word: string; index: number; stagger: number; delay: number; reduced: boolean }) {
  return (
    // clip wrapper — overflow:hidden masks the slide-up travel
    <span className="inline-block overflow-hidden align-bottom leading-[1.1] -mb-[0.1em] pb-[0.1em]">
      <motion.span
        className="inline-block will-change-transform"
        initial={reduced ? WORD_VISIBLE : WORD_HIDDEN}
        animate={WORD_VISIBLE}
        transition={{ ...WORD_TRANSITION, delay: delay + index * stagger }}
      >
        {word}
      </motion.span>
    </span>
  )
}

// ─── main component ────────────────────────────────────────────────────────
export default function AnimText<T extends React.ElementType = 'div'>({
  children,
  className = '',
  as,
  delay = 0.3,
  stagger = 0.06,
  once = true,
  ...props
}: {
  children: React.ReactNode
  className?: string
  as?: T
  delay?: number
  stagger?: number
  once?: boolean
} & React.ComponentPropsWithoutRef<T>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Tag: any = as || 'div'
  const reduced = useReducedMotion() ?? false
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once })

  const isStrOrNum = typeof children === 'string' || typeof children === 'number'
  const isTText = isValidElement(children) && 'tKey' in (children.props as object)

  // ── string: split into words, animate each ──────────────────────────────
  const text = String(children)
  const tokens = useMemo(() => text.split(/(\s+)/), [text])

  // ── non-text children: single block reveal ──────────────────────────────
  if (!isStrOrNum && !isTText) {
    return (
      <Tag ref={ref} className={`relative overflow-hidden leading-[1.05] ${className}`} {...props}>
        <motion.span
          className="inline-block will-change-transform [direction:inherit]"
          initial={reduced ? WORD_VISIBLE : WORD_HIDDEN}
          animate={inView ? WORD_VISIBLE : WORD_HIDDEN}
          transition={{ ...WORD_TRANSITION, delay: Number(delay) }}
        >
          {children}
        </motion.span>
      </Tag>
    )
  }

  // track word index separately (skip whitespace tokens)
  let wordIdx = -1

  return (
    <Tag ref={ref} className={`relative leading-[1.05] ${className}`} style={{ ...props.style }} {...props}>
      {tokens.map((token, i) => {
        if (/^\s+$/.test(token)) {
          // preserve whitespace naturally
          return (
            <span key={i} aria-hidden="true">
              {token}
            </span>
          )
        }
        wordIdx++
        const idx = wordIdx

        return inView ? (
          <Word key={i} word={token} index={idx} stagger={stagger} delay={delay} reduced={reduced} />
        ) : (
          // keep layout stable before inView triggers
          <span key={i} className="inline-block overflow-hidden align-bottom leading-[1.1] -mb-[0.1em] pb-[0.1em]">
            <span className="inline-block opacity-0">{token}</span>
          </span>
        )
      })}
    </Tag>
  )
}
