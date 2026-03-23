'use client'

import Image from 'next/image'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PROJECTS } from '@/data/db'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import { useIsMobile } from '@/hooks/useIsMobile'
import { ExternalLink } from 'lucide-react'
import { MotionLine } from '@/components/ui/effects/Lines'
import { easings } from '@/utils/anim'
import AnimText from '@/components/ui/unstyled/AnimText'
import TextScramble from '@/components/ui/text/TextScramble'

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState<(typeof PROJECTS)[0] | null>(null)
  const [expandedMobileIndex, setExpandedMobileIndex] = useState<number | null>(null)
  const isMobile = useIsMobile(768)

  const handleOutsideClick = () => {
    setHoveredProject(null)
  }

  const handlePageScroll = useCallback(() => {
    setHoveredProject(null)
  }, [])

  useEffect(() => {
    if (hoveredProject) {
      window.addEventListener('scroll', handlePageScroll)
      return () => window.removeEventListener('scroll', handlePageScroll)
    }
  }, [hoveredProject, handlePageScroll])

  useBodyScrollLock(!!hoveredProject)

  return (
    <>
      <section className="md:bottom-4 md:left-1/2 z-10 md:absolute md:w-1/2 max-md:mt-28 max-md:mb-28 max-md:p-4 md:pe-4 pointer-events-auto">
        <AnimText className="font-mono text-main text-xs uppercase tracking-widest mb-6">Featured_Projects_</AnimText>

        {PROJECTS.map((project, i) => {
          const isMobileExpanded = expandedMobileIndex === i

          return (
            <motion.div
              key={i}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              onClick={() => {
                if (!isMobile) {
                  setHoveredProject(project)
                } else {
                  setExpandedMobileIndex(isMobileExpanded ? null : i)
                }
              }}
              className="group border-text/10 hover:border-main border-l hover:text-main transition-all duration-200 pt-1 pl-2 cursor-pointer"
            >
              <div className="flex justify-between gap-4 duration-200 group-hover:px-1 cursor-pointer">
                <AnimText as={'h3'} className="w-1/2 max-md:w-full font-medium text-xl">
                  <TextScramble text={project.title} />
                </AnimText>

                {project.development && (
                  <div className="flex flex-wrap justify-between items-start gap-4 max-md:w-30 md:w-full font-mono text-xs">
                    {Object.entries(project.development)
                      .slice(!isMobile ? 1 : 2)
                      .map(([key, value]) => (
                        <div key={key}>
                          <span className="text-text/60 mr-2">_:{key}</span>
                          <TextScramble text={value} />
                        </div>
                      ))}
                  </div>
                )}
                <ExternalLink size={16} />
              </div>

              {/* mobile details */}
              <AnimatePresence>
                {isMobileExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: easings.cubiz }}
                    onClick={(e) => e.stopPropagation()}
                    className="md:hidden overflow-hidden bg-main/30 mt-2 p-2"
                  >
                    <button
                      onClick={() => window.open(project.link, '_blank')}
                      className="bg-main hover:bg-text font-sec text-text hover:text-main text-sm uppercase tracking-widest transition-colors duration-200 mt-1 mb-6 px-2 py-1 cursor-pointer"
                    >
                      Take a look
                    </button>

                    <p className="font-mono text-text/60 text-xs mb-4">{project.description}</p>
                    <p className="font-mono font-bold text-text/80 text-xs leading-relaxed mb-6">{project.longDescription}</p>

                    {project.development && (
                      <div className="mb-6">
                        <h4 className="font-mono text-main text-xs uppercase tracking-widest mb-2">Development</h4>
                        <div className="flex flex-wrap gap-4 font-mono text-xs">
                          {Object.entries(project.development).map(([key, value]) => (
                            <div key={key}>
                              <span className="text-text/60">_:{key}</span>
                              <span className="ml-2">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {project.languages && project.languages.length > 0 && (
                      <div className="mb-6">
                        <h4 className="font-mono text-main text-xs uppercase tracking-widest mb-2">Languages</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.languages.map((lang, j) => (
                            <span key={j} className="bg-main/20 border border-text/10 font-mono text-text text-xs px-2 py-1">
                              {lang}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-1">
                      {project.tags.map((tag, j) => (
                        <span key={j} className="border-e border-text/10 font-mono text-main text-xs px-1">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {project.images && project.images.length > 0 && (
                      <div className="gap-4 grid grid-cols-1 mt-6">
                        {project.images.map((img, j) => (
                          <motion.div
                            key={j}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 + j * 0.1 }}
                            className="relative aspect-video overflow-hidden bg-text/5"
                          >
                            <Image src={img} alt={`${project.title} preview ${j + 1}`} fill className="object-cover" />
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <MotionLine from={i % 2 === 0 ? 'left' : 'right'} className="bg-text group-hover:bg-main opacity-10 group-hover:opacity-60" />
            </motion.div>
          )
        })}
      </section>

      {/* desktop Project Details Modal */}
      <AnimatePresence>
        {hoveredProject && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.5, ease: easings.cubiz }}
            onClick={handleOutsideClick}
            className="max-md:hidden z-50 fixed inset-0 pointer-events-auto"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              className="bottom-0 left-[12%] absolute w-[35dvw] h-[80dvh] bg-main/30 p-4 pb-0"
            >
              <div className="h-full overflow-y-auto">
                <AnimText as="h3" className="text-2xl mb-4">
                  {hoveredProject.title}
                </AnimText>

                <button
                  onClick={() => window.open(hoveredProject.link, '_blank')}
                  className="bg-main hover:bg-text font-sec hover:text-main text-sm uppercase tracking-widest transition-colors duration-200 mb-6 px-2 py-1 cursor-pointer"
                >
                  Take a look
                </button>

                <p className="font-sec text-text/60 text-sm mb-4">{hoveredProject.description}</p>
                <p className="text-text/80 text-sm leading-relaxed mb-6">{hoveredProject.longDescription}</p>

                {hoveredProject.development && (
                  <div className="mb-6">
                    <h4 className="font-mono text-main text-xs uppercase tracking-widest mb-2">Development</h4>
                    <div className="flex flex-wrap gap-4 font-mono text-xs">
                      {Object.entries(hoveredProject.development).map(([key, value]) => (
                        <div key={key}>
                          <span className="text-text/60">_:{key}</span>
                          <span className="ml-2">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {hoveredProject.languages && hoveredProject.languages.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-mono text-main text-xs uppercase tracking-widest mb-2">Languages</h4>
                    <div className="flex flex-wrap gap-2">
                      {hoveredProject.languages.map((lang, j) => (
                        <span key={j} className="bg-main/20 border border-text/10 font-mono text-text text-xs px-2 py-1">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {hoveredProject.tags.map((tag, j) => (
                    <span key={j} className="border-e border-text/10 font-mono text-main text-xs uppercase pe-2">
                      {tag}
                    </span>
                  ))}
                </div>

                {hoveredProject.images && hoveredProject.images.length > 0 && (
                  <div className="gap-4 grid grid-cols-1 mt-6">
                    {hoveredProject.images.map((img, j) => (
                      <motion.div
                        key={j}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 + j * 0.1 }}
                        className="relative aspect-video overflow-hidden bg-text/5"
                      >
                        <Image src={img} alt={`${hoveredProject.title} preview ${j + 1}`} fill className="object-cover" />
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
