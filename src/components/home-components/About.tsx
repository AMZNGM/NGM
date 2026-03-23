import { BIO } from '@/data/db'
import AnimText from '@/components/ui/unstyled/AnimText'

export default function About() {
  return (
    <section className="md:top-2 md:left-1/2 z-10 md:absolute space-y-4 max-w-lg md:mb-20 max-md:p-4 md:pr-4">
      <AnimText stagger={0.008} className="text-text/80 text-2xl leading-none">
        {BIO.summary}
      </AnimText>

      <AnimText stagger={0.008} delay={0.4} className="opacity-50 font-mono font-bold text-sm leading-relaxed">
        {BIO.experience}
      </AnimText>
    </section>
  )
}
