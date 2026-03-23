import AnimText from '@/components/ui/unstyled/AnimText'

export default function NGM() {
  return (
    <section className="max-md:hidden relative flex justify-center items-center w-dvw h-dvh">
      <AnimText className="flex justify-end w-full font-bold text-[12dvw] pointer-events-none select-none">
        <span className="block">N</span>
        <span className="block">G</span>
        <span className="block">M</span>
      </AnimText>
    </section>
  )
}
