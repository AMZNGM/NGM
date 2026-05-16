import { Suspense } from 'react'
import Loader from '@/components/ui/loaders/Loader'
import Navbar from '@/components/nav-components/Navbar'
import Bg from '@/components/ui/Bg'
import Hero from '@/components/home-components/Hero'
import Footer from '@/components/footer.components/Footer'

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://amzngm.com/'),

  title: {
    default: 'NGM | Creative Developer',
    template: '%s | NGM – Creative Developer',
  },

  description:
    'WebAR Engineer & Creative 3D Developer. Building real-time AR try-on systems, 3D configurators, and motion-driven web experiences with Three.js, MediaPipe, React Three Fiber, and GSAP.',

  keywords: ['Creative Developer', 'Developer', 'Web', 'Creative Developer', '3D Developer', 'WebAR Developer', 'WebAR'],

  authors: [{ name: 'NGM' }],
  creator: 'NGM',

  alternates: {
    canonical: 'https://amzngm.com/',
  },

  openGraph: {
    title: 'NGM | Creative Developer',
    description:
      'WebAR Engineer & Creative 3D Developer. Building real-time AR try-on systems, 3D configurators, and motion-driven web experiences with Three.js, MediaPipe, React Three Fiber, and GSAP.',
    url: 'https://amzngm.com/',
    siteName: 'NGM Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/NGM-CORRPRET.webp',
        width: 1200,
        height: 630,
        alt: 'NGM - Creative Developer',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'NGM | Creative Developer',
    description:
      'WebAR Engineer & Creative 3D Developer. Building real-time AR try-on systems, 3D configurators, and motion-driven web experiences with Three.js, MediaPipe, React Three Fiber, and GSAP.',
    images: ['/images/NGM-CORRPRET.webp'],
  },
}

export default function Home() {
  return (
    <Suspense fallback={<Loader />}>
      <main className="relative w-dvw md:h-dvh">
        <Bg />
        <div className="z-10 relative flex flex-col justify-between items-center size-full">
          <Navbar />
          <Hero />
          <Footer />
        </div>
      </main>
    </Suspense>
  )
}
