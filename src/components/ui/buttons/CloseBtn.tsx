import { useSoundEffects } from '@/hooks/useSoundEffects'
import AnimText from '@/components/ui/unstyled/AnimText'

export default function CloseBtn({ onClick, className }: { onClick: () => void; className?: string }) {
  const { hoverSound, click } = useSoundEffects()

  return (
    <AnimText
      as="button"
      delay={0.52}
      onClick={() => {
        click()
        onClick()
      }}
      onMouseEnter={() => hoverSound()}
      className={`hover:opacity-75 blur-[0.5px] hover:blur-none font-wide max-md:text-main hover:text-main text-xs md:text-sm uppercase tracking-wide scale-x-325 scale-y-130 pe-2 cursor-pointer ${className}`}
    >
      Close
    </AnimText>
  )
}
