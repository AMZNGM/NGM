'use client'

import { MoveDown, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { easings } from '@/utils/anim'
import { BIO, CONTACT, SKILLS } from '@/data/db'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import AnimText from '@/components/ui/unstyled/AnimText'
import TextScramble from '@/components/ui/text/TextScramble'
import DigitalClock from '@/components/home-components/DigitalClock'
import About from '@/components/home-components/About'

export default function Navigation() {
  const [showSkills, setShowSkills] = useState(false)
  const [showContact, setShowContact] = useState(false)

  return (
    <nav className="z-10 md:fixed inset-0 flex flex-col justify-between items-start gap-14 w-full md:h-full p-4 max-md:pt-12 pointer-events-none">
      {/* Head Section */}
      <div className="pointer-events-auto">
        <AnimText as={'h1'}>{BIO.name}</AnimText>
        <AnimText as={'p'} className="text-sm">
          {BIO.title}
        </AnimText>
        <div className="flex">
          <DigitalClock />
          <AnimText className="opacity-50 font-mono text-xs mt-1 pointer-events-none select-none">__{BIO.location}</AnimText>
        </div>
      </div>

      <div className="md:hidden">
        <About />
      </div>

      <div className="max-md:w-full pointer-events-auto">
        {/* Skills Section */}
        <AnimIn
          delay={0.5}
          onMouseEnter={() => setShowSkills(true)}
          onMouseLeave={() => setShowSkills(false)}
          className="group relative mb-8 md:pe-12 cursor-pointer"
        >
          <Sparkles size={20} strokeWidth={1} className="group-hover:animate-pulse mb-1" />
          <h4 className="font-sec text-sm uppercase tracking-wider select-none">Skills_</h4>

          {/* desktop */}
          <AnimatePresence>
            {showSkills && (
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                exit={{ y: '100%' }}
                transition={{ duration: 0.5, ease: easings.cubiz, delay: 0.1 }}
                className="max-md:hidden -bottom-130 left-full z-50 fixed w-150 h-[80dvh] pointer-events-auto"
              >
                <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 w-full h-full bg-main/30 p-4">
                  {SKILLS.map((set, i) => (
                    <div key={i}>
                      <AnimText as="h4" className="font-sec uppercase tracking-wider mb-4">
                        {set.category}
                      </AnimText>

                      <div className="gap-4 grid">
                        {set.items.map((item, j) => (
                          <AnimText key={j} className="opacity-70 text-xs">
                            {item}
                            {j < set.items.length - 1 && <span className="text-text/20 mx-2">•</span>}
                          </AnimText>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* mobile */}
          <div className="md:hidden z-50 gap-8 grid grid-cols-3 w-full h-full mt-4 p-4">
            {SKILLS.map((set, i) => (
              <div key={i}>
                <AnimText as="h4" className="font-sec uppercase tracking-wider mb-4">
                  {set.category}
                </AnimText>

                <div className="gap-4 grid">
                  {set.items.map((item, j) => (
                    <AnimText key={j} className="opacity-70 text-xs">
                      {item}
                      {j < set.items.length - 1 && <span className="text-text/20 mx-2">•</span>}
                    </AnimText>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </AnimIn>

        {/* Contact Section */}
        <AnimIn
          onMouseEnter={() => setShowContact(true)}
          onMouseLeave={() => setShowContact(false)}
          className="relative flex flex-col justify-end items-end font-sec uppercase tracking-wider md:pe-12"
        >
          <MoveDown
            size={20}
            strokeWidth={1}
            className={`mb-1 transition-transform duration-500 ease-in-out ${showContact ? 'rotate-90' : ''}`}
          />
          <h4 className="text-sm select-none">Contact_</h4>

          {/* desktop */}
          <AnimatePresence>
            {showContact && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: easings.cubiz }}
                className="max-md:hidden flex flex-col gap-1 overflow-hidden mt-4"
              >
                {CONTACT.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    <TextScramble text={item.text} className="hover:text-main text-xs transition-colors cursor-pointer" />
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* mobile */}
          <div className="md:hidden flex flex-col items-end gap-1 w-full h-full overflow-hidden font-bold text-sm mt-4">
            {CONTACT.map((item, index) => (
              <a
                key={index}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                <h6>{item.text}</h6>
              </a>
            ))}
          </div>
        </AnimIn>
      </div>
    </nav>
  )
}
