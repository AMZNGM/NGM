import { useUIStore } from '@/store/useUIStore'
import { useSoundEffects } from '@/hooks/useSoundEffects'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import AnimText from '@/components/ui/unstyled/AnimText'
import { BIO, CONTACT } from '@/data/db'

export default function AboutSection() {
  const { isAudio, isFirstLoadUI } = useUIStore()
  const { click } = useSoundEffects()
  const delay = isFirstLoadUI ? 2.1 : 0

  return (
    <AnimIn as="section" center blur delay={delay} className="group relative space-y-[3.2dvw] md:space-y-[1.8dvw] my-4">
      <AnimText
        key={isAudio ? 'about-audio' : 'about-dev'}
        as="h4"
        delay={delay}
        className="font-wide text-[4dvw] md:text-[1.4dvw] group-hover:text-main uppercase tracking-tight scale-x-225 scale-y-90 max-md:scale-y-150 origin-left max-md:mb-[6dvw]"
      >
        {isAudio ? '_About+Sound' : '_About'}
      </AnimText>

      <div key={isAudio ? 'content-audio' : 'content-dev'} className="space-y-[3.2dvw] md:space-y-[1.8dvw]">
        <AnimText
          delay={delay}
          className="text-shadow-text text-shadow-xs font-bold text-[4.7dvw] md:text-[0.9dvw] uppercase leading-[1dvw] tracking-tighter scale-x-111 origin-left mb-[2.75dvw] md:mb-[0.75dvw]"
        >
          <div className="flex items-center gap-[0.2dvw] max-md:gap-[0.5dvw]">
            <svg
              viewBox="0 0 107.07 114"
              className="size-[5.5dvw] md:size-[1.1dvw] fill-text/50 group-hover:rotate-360 transition-transform duration-200 ease-in-out"
            >
              <path d="M.1,62.37l14.66,49.78c.55,1.87,2.91,2.47,4.29,1.09l23.8-23.8c1.38-1.38.78-3.72-1.08-4.28l-22.62-6.8c-1.86-.56-2.45-2.91-1.08-4.28l19.29-19.29c.67-.67.92-1.65.65-2.55l-5.58-18.72c-.56-1.87-2.91-2.46-4.28-1.08L.75,59.83c-.67.67-.91,1.64-.65,2.55Z" />
              <path d="M53.55,14.73L4.06.11C2.1-.47.28,1.36.87,3.32l10.21,33.84c.56,1.86,2.91,2.45,4.28,1.07l15.61-15.64c1.37-1.38,3.72-.79,4.28,1.07l8.4,27.84c.25.83.91,1.48,1.74,1.73l18.46,5.39c1.96.57,3.77-1.26,3.18-3.21l-11.75-38.95c-.25-.83-.9-1.48-1.73-1.72Z" />
              <path d="M71.52,87.1l34.79-34.75c1.38-1.38.78-3.73-1.09-4.29l-33.89-10c-1.96-.58-3.77,1.24-3.19,3.2l6.46,21.83c.58,1.95-1.24,3.77-3.19,3.2l-27.33-8.07c-.91-.27-1.89-.02-2.55.65l-12.92,13c-1.37,1.38-.77,3.73,1.1,4.28l39.29,11.59c.9.27,1.88.02,2.55-.65Z" />
            </svg>

            {isAudio ? BIO.audioTitle : BIO.title}
          </div>
        </AnimText>

        {isAudio ? (
          <AnimText
            as="p"
            delay={delay}
            stagger={0.008}
            className="opacity-80 font-bold text-[3dvw] md:text-[1dvw] text-balance leading-[3.5dvw] md:leading-[1.3dvw]"
          >
            {BIO.audioBio}
          </AnimText>
        ) : (
          <>
            <AnimText
              as="p"
              delay={delay}
              stagger={0.008}
              className="opacity-80 font-bold text-[4.2dvw] md:text-[0.95dvw] mb-[2dvw] md:mb-[1dvw]"
            >
              {BIO.summary}
            </AnimText>

            <p className="opacity-60 font-sec text-[3.1dvw] md:text-[0.65dvw] text-balance md:scale-y-120 md:origin-top mb-[4dvw] md:mb-[2dvw]">
              {BIO.experience.split(/(__Professional audio engineer|10 years|Nike|modern web services__)/).map((part, i) => {
                const isHighlight =
                  part === '__Professional audio engineer' || part === '10 years' || part === 'Nike' || part === 'modern web services__'
                return isHighlight ? (
                  <AnimText as="span" delay={delay + 0.1} stagger={0.08} key={i} className="font-bold">
                    {part}
                  </AnimText>
                ) : (
                  <AnimText as="span" delay={delay} stagger={0.008} key={i}>
                    {part}
                  </AnimText>
                )
              })}
            </p>
          </>
        )}

        {isAudio && (
          <AnimIn toDown blur delay={delay + 0.5} className="flex gap-[5dvw] md:gap-[2dvw] md:scale-80 md:origin-top-left">
            <div className="active:scale-90 duration-100">
              <a
                onClick={() => click()}
                href={BIO.audioLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center items-center bg-main/10 hover:bg-main/20 border border-main/40 rounded-sm font-sec font-bold text-[2dvw] text-main md:text-[0.7dvw] uppercase tracking-widest scale-x-120 scale-y-90 origin-left mt-[2dvw] md:mt-[1dvw] px-[2dvw] md:px-[1dvw] py-[1.5dvw] md:py-[0.5dvw]"
              >
                <span className="font-wide text-[2.5dvw] md:text-[1vw] uppercase tracking-widest scale-y-200 mt-[0.5dvw]">Know More_</span>
              </a>
            </div>

            <div className="active:scale-90 duration-100">
              <a
                onClick={() => click()}
                href={CONTACT[5].href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-[1dvw] md:gap-[0.5dvw] bg-main/10 hover:bg-main/20 border border-main/40 rounded-sm font-sec font-bold text-[2dvw] text-main md:text-[0.7dvw] uppercase tracking-widest scale-x-120 scale-y-90 origin-left mt-[2dvw] md:mt-[1dvw] px-[2dvw] md:px-[1dvw] py-[1dvw] md:py-[0.5dvw]"
              >
                <svg viewBox="0 0 107 106.72" className="w-[5dvw] md:w-[2dvw] h-[5dvw] md:h-[2dvw] fill-main">
                  <path d="M50.37,102.47l.75-45.77V12.65c0-4.39,5.34-6.65,8.44-3.54l38.26,38.37c3.1,3.11.96,8.47-3.53,8.47h-33.66c-3.74,0-5.66,4.61-2.99,7.29l42.1,42.23c2.67,2.68,7.27.75,7.27-3V7.07c0-3.97-3.21-7.07-7.05-7.07H4.74C.25,0-1.67,4.61,1.75,7.29l40.18,40.3c3.1,3.11.96,8.47-3.53,8.47H4.74c-4.49,0-6.41,4.61-2.99,7.29l42.1,42.12c1.92,2.68,6.52.75,6.52-3Z" />
                </svg>
                <span className="font-wide text-[2.5dvw] md:text-[1vw] uppercase tracking-widest scale-y-200 mt-[0.5dvw]">Stream</span>
              </a>
            </div>
          </AnimIn>
        )}
      </div>
    </AnimIn>
  )
}
