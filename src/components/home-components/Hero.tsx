import Navigation from '@/components/home-components/Navigation'
import About from '@/components/home-components/About'
import Projects from '@/components/home-components/Projects'

export default function Hero() {
  return (
    <section className="relative w-dvw min-h-dvh md:overflow-hidden">
      <Navigation />
      <div className="max-md:hidden">
        <About />
      </div>
      <Projects />
    </section>
  )
}
