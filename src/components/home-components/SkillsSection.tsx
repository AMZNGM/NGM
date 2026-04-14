import { useUIStore } from '@/store/useUIStore'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import AnimText from '@/components/ui/unstyled/AnimText'
import { WEB_SKILLS, AUDIO_SKILLS } from '@/data/db'

export default function SkillsSection() {
  const { activeTab, isAudio, isFirstLoadUI } = useUIStore()
  const isAudioMode = activeTab === 'audio' || isAudio
  const delay = isFirstLoadUI ? 2 : 0

  return (
    <AnimIn as="section" center blur delay={delay + 0.1} className="group relative space-y-[3.2dvw] md:space-y-[1.8dvw]">
      <div key={isAudioMode ? 'audio' : 'dev'} className="space-y-[3.2dvw] md:space-y-[1.8dvw]">
        <AnimText
          as="h4"
          delay={delay}
          className="font-wide text-[4dvw] md:text-[1.4dvw] group-hover:text-main uppercase tracking-tight scale-x-225 scale-y-90 max-md:scale-y-150 origin-left max-md:mb-[6dvw]"
        >
          {isAudioMode ? '_AUDIO_SKILLS' : '_PROGRAMMING_SKILLS'}
        </AnimText>

        {(isAudioMode ? AUDIO_SKILLS : WEB_SKILLS).map((set, i) => (
          <div key={i} className="space-y-[3dvw] md:space-y-[0.75dvw] mb-[4dvw] md:mb-[1dvw]">
            <AnimText as="h5" delay={delay} className="font-wide text-[4dvw] md:text-[1vw] uppercase scale-x-200 md:scale-y-90 origin-left">
              {set.category}
            </AnimText>

            <div className="gap-[1dvw] md:gap-[0.5dvw] grid">
              {set.items.map((item, index) => (
                <AnimText
                  as="span"
                  delay={delay + 0.2}
                  key={index}
                  className="opacity-60 font-sec font-bold text-[3dvw] md:text-[0.75dvw] hover:text-main scale-x-125 origin-left cursor-default"
                >
                  .{item}
                </AnimText>
              ))}
            </div>
          </div>
        ))}
      </div>
    </AnimIn>
  )
}
