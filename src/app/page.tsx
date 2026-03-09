// import dynamic from 'next/dynamic'
import { Suspense } from 'react'

import Hero from '@/components/home-components/Hero'
import Loader from '@/components/shared/Loader'
// const About = dynamic(() => import('@/components/home-components/About'))

export const generateMetadata = () => {
  return {
    title: 'Next Generation Marketing',
    description: 'Next Generation Marketing is a digital marketing agency that specializes in SEO, PPC, and social media marketing.',
  }
}

export default function Home() {
  return (
    <Suspense fallback={<Loader />}>
      <Hero />
    </Suspense>
  )
}
