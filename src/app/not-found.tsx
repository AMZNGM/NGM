import Link from 'next/link'
import BgDitherVeil from '@/components/ui/BgDitherVeil'

export default function NotFound() {
  return (
    <main className="flex flex-col justify-center items-center w-dvw h-dvh overflow-hidden bg-bg text-text">
      <BgDitherVeil />

      <h2>there is no page here</h2>

      <Link href="/" className="z-10 font-sec text-main hover:text-text transition-colors duration-300 mt-3">
        GO BACK HOME
      </Link>
    </main>
  )
}
