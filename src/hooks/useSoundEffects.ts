import useSound from 'use-sound'
import { useSoundStore } from '@/store/useSoundStore'
import { useIsMobile } from '@/hooks/useIsMobile'

export const useSoundEffects = () => {
  const isMobile = useIsMobile()
  const { isMuted } = useSoundStore()
  const [hoverSound] = useSound('/sounds/hover.mp3', { volume: 0.4, soundEnabled: !isMuted && !isMobile })
  const [logoHover] = useSound('/sounds/ngmTage.mp3', { volume: 0.5, soundEnabled: !isMuted })
  const [whistle] = useSound('/sounds/whistle.mp3', { volume: 0.4, soundEnabled: !isMuted })
  const [woosh] = useSound('/sounds/woosh.mp3', { volume: 0.5, soundEnabled: !isMuted })
  const [woosh2] = useSound('/sounds/woosh2.mp3', { volume: 0.5, soundEnabled: !isMuted })
  const [click] = useSound('/sounds/click.mp3', { volume: 0.1, soundEnabled: !isMuted })
  const [failed] = useSound('/sounds/failed.mp3', { volume: 0.5, soundEnabled: !isMuted })
  const [jump] = useSound('/sounds/jump.mp3', { volume: 0.5, soundEnabled: !isMuted })

  return {
    hoverSound,
    logoHover,
    whistle,
    woosh,
    woosh2,
    click,
    failed,
    jump,
  }
}
