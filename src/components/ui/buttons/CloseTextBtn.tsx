import AnimText from '@/components/ui/unstyled/AnimText'
import TextScramble from '@/components/ui/text/TextScramble'

export default function CloseTextBtn({
  onClick,
  className = '',
  delay = 0.5,
}: {
  onClick: () => void
  className?: string
  delay?: number
}) {
  return (
    <AnimText
      as={'button'}
      delay={delay}
      onClick={onClick}
      className={`w-fit font-mono uppercase text-text/60 hover:text-text transition-colors text-sm rtl:leading-5 tracking-wider cursor-pointer select-none ${className}`}
    >
      <TextScramble text="close" />
    </AnimText>
  )
}
