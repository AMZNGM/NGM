import { Suspense } from 'react'

import Hero from '@/components/home-components/Hero'
import BgDitherVeil from '@/components/ui/BgDitherVeil'

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://ngm-lemon.vercel.app/'),

  title: {
    default: '_N G M',
    template: '%s | Abdulrahman NGM | N G M |  – Creative Frontend Developer',
  },

  description:
    'Portfolio of Abdulrahman NGM, a creative frontend developer specializing in interactive and motion-driven web experiences using React, Next.js, GSAP, and Framer Motion.',

  keywords: ['Creative Frontend Developer', 'React Developer', 'Next.js Developer', 'GSAP Animation', 'Framer Motion'],

  authors: [{ name: 'Abdulrahman NGM' }],
  creator: 'Abdulrahman NGM',

  alternates: {
    canonical: 'https://ngm-lemon.vercel.app/',
  },

  openGraph: {
    title: 'Abdulrahman NGM – Creative Frontend Developer',
    description: 'Creative frontend developer building motion-driven web experiences with React, Next.js, GSAP, and Framer Motion.',
    url: 'https://ngm-lemon.vercel.app/',
    siteName: 'Abdulrahman NGM Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/NGM-CORRPRET.png',
        width: 1200,
        height: 630,
        alt: 'Abdulrahman NGM - Creative Frontend Developer',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Abdulrahman NGM – Creative Frontend Developer',
    description: 'Creative frontend developer specializing in interactive and motion-driven websites.',
    images: ['/images/NGM-CORRPRET.png'],
  },
}

export default function Home() {
  return (
    <Suspense>
      <BgDitherVeil />
      <Hero />
    </Suspense>
  )
}
