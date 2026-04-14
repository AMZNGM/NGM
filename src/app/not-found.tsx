import Link from 'next/link'
import Bg from '@/components/ui/Bg'

export default function NotFound() {
  return (
    <main className="z-10 relative flex flex-col justify-center items-center w-dvw h-dvh overflow-hidden font-wide max-md:text-main uppercase hide-nav">
      <Bg mode={1} />
      <h2 className="text-[6dvw] hover:text-main leading-[2dvw] scale-x-300 scale-y-70 max-md:scale-y-200 max-md:origin-bottom max-md:-translate-y-3">
        Nothing here
      </h2>
      <Link href="/" className="text-[20dvw] hover:text-main leading-[30dvw] scale-y-200">
        Go back home
      </Link>
    </main>
  )
}
