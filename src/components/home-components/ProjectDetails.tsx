'use client'

import { motion } from 'motion/react'
import { useLenis } from '@/hooks/useLenis'
import { useSoundEffects } from '@/hooks/useSoundEffects'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import AnimText from '@/components/ui/unstyled/AnimText'
import MoreInfoModal from '@/components/home-components/MoreInfoModal'
import ExpandableImage from '@/components/app-components/image-modal/ExpandableImage'
import { type WEB_PROJECTS } from '@/data/db'

type ProjectType = (typeof WEB_PROJECTS)[0]

export default function ProjectDetails({ project }: { project: ProjectType | null }) {
  const { elementRef: imagesRef } = useLenis<HTMLDivElement>()
  const { whistle } = useSoundEffects()

  if (!project) {
    return <section></section>
  }

  return (
    <AnimIn as="section" center blur className="relative flex flex-col gap-[2dvw] size-full px-2 md:px-2.5 max-md:py-[2dvw]">
      <div className="flex justify-between items-end">
        <AnimText
          as="h3"
          className="md:hidden font-wide text-[3dvw] md:text-[1.26dvw] uppercase scale-x-400 scale-y-500 origin-top-left mb-[12dvw]"
        >
          {project.title}
        </AnimText>

        <AnimText
          as="h3"
          className="max-md:hidden font-wide text-[3dvw] md:text-[1.26dvw] uppercase scale-x-400 scale-y-500 origin-top-left mb-[3dvw]"
        >
          {project.title.split('').map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.02, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              whileHover={{
                scale: 0.9,
                color: 'var(--color-main)',
                textShadow: '0 0 20px rgba(255, 99, 51, 0.5)',
                transition: { duration: 0.15 },
              }}
              className="inline-block tracking-wider cursor-default"
              style={{ whiteSpace: char === ' ' ? 'pre' : undefined }}
            >
              {char}
            </motion.span>
          ))}
        </AnimText>

        <div className="top-[1.5dvw] md:top-[0.8dvw] right-[1dvw] absolute md:overflow-hidden">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => whistle()}
            className="group flex flex-col justify-center items-center bg-main/10 hover:bg-main/30 hover:text-shadow-main border border-main/30 hover:border-main/60 rounded-full font-wide font-bold text-[2.8dvw] text-main md:text-[0.85dvw] uppercase scale-x-200 scale-y-70 max-md:origin-right px-[1dvw] py-[3.2dvw] md:py-[0.5dvw]"
          >
            <svg viewBox="0 0 120.02 60.51" className="size-[1.2dvw] max-md:size-[4dvw] fill-main group-hover:fill-[#ff6333]">
              <g>
                <g>
                  <path d="M37.42,59.78C21.88,54.19,8.8,44.08,0,30.68,9.89,16.69,19.7,7.83,40.16.68c-20.74,11.74-22.35,45.43-2.74,59.1Z" />
                  <path d="M120.02,30.68c-8.57,13.46-23.87,25-39.57,29.83,20.97-13.56,19.23-49.05-2.88-60.51,15.12,2.85,36.71,19.75,42.45,30.68Z" />
                </g>
                <g>
                  <path d="M37.42,59.78C21.88,54.2,8.79,44.08,0,30.68,9.89,16.69,19.71,7.83,40.16.68c-20.74,11.74-22.35,45.43-2.74,59.1Z" />
                  <polygon points="65.91 38.82 67.95 55.13 60.01 40.73 52.07 55.13 54.11 38.81 39.22 45.8 50.45 33.79 34.31 30.68 50.45 27.57 39.22 15.57 54.11 22.55 52.07 6.23 60.01 20.63 67.95 6.23 65.91 22.55 80.8 15.57 69.57 27.57 85.71 30.68 69.57 33.79 80.8 45.8 65.91 38.82" />
                  <path d="M120.02,30.68c-8.57,13.46-23.87,25-39.57,29.83,20.97-13.56,19.23-49.05-2.88-60.51,15.11,2.85,36.71,19.75,42.45,30.68Z" />
                </g>
                <polygon points="80.8 45.8 65.91 38.82 67.95 55.13 60.01 40.73 52.07 55.13 54.11 38.81 39.22 45.8 50.45 33.79 34.31 30.68 50.45 27.57 39.22 15.57 54.11 22.55 52.07 6.23 60.01 20.63 67.95 6.23 65.91 22.55 80.8 15.57 69.57 27.57 85.71 30.68 69.57 33.79 80.8 45.8" />
              </g>
            </svg>

            <span>look</span>
          </a>
        </div>
      </div>

      <div className="space-y-[8dvw] md:space-y-[1.2dvw] font-medium">
        <AnimText stagger={0.008} className="opacity-80 font-sec text-[3dvw] md:text-[0.7dvw] leading-relaxed scale-y-125 origin-top">
          {project.longDescription}
        </AnimText>

        <AnimText
          as="p"
          stagger={0.008}
          className="opacity-50 font-sec text-[3dvw] md:text-[0.71dvw] leading-relaxed scale-y-125 origin-top"
        >
          {project.description}
        </AnimText>
      </div>

      <div className="flex flex-col max-md:mt-[6dvw]">
        <span className="opacity-80 font-wide text-[5dvw] md:text-[1.5dvw] uppercase scale-x-200 scale-y-75 origin-top-left">Stack</span>

        <div className="flex flex-wrap gap-[0.5dvw] max-md:gap-[1dvw]">
          {project.stack.map((tag) => (
            <span
              key={tag}
              className="bg-text/10 hover:bg-main/50 rounded-sm max-md:font-bold text-[2.5dvw] md:text-[0.65dvw] px-[0.9dvw] md:px-[0.5dvw] py-[0.3dvw] cursor-default"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-[0.3dvw] opacity-80 font-wide text-[2.5dvw] md:text-[0.7dvw] uppercase tracking-wide scale-x-160 origin-left max-md:mb-[4dvw]">
        <span>{project.services.type}</span>
        <span>{project.services.role}</span>
        {project.languages && <span>{project.languages.join(', ')}</span>}
        <span>{project.services.date}</span>
      </div>

      {project.moreInfo && <MoreInfoModal moreInfo={project.moreInfo} projectTitle={project.title} />}

      {project.images && project.images.length > 0 && (
        <div ref={imagesRef} className="flex flex-col gap-[1dvw] max-md:gap-[2dvw]">
          {project.images.map((src, index) => (
            <div key={index} className="relative overflow-hidden rounded-lg">
              <ExpandableImage
                src={src}
                gallery={project.images?.map((img, i) => ({ src: img, alt: `${project.title} screenshot ${i + 1}` })) || []}
                initialIndex={index}
                alt={`${project.title} screenshot ${index + 1}`}
                width={2000}
                height={2000}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="w-full h-auto aspect-auto rounded-lg"
              />
            </div>
          ))}
        </div>
      )}
    </AnimIn>
  )
}
