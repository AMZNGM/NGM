'use client'

import dynamic from 'next/dynamic'
import { BgProvider } from '@/components/app-components/BgContext'
import { SuppressWarnings } from '@/components/app-components/suppressWarnings'
import { ImageModalProvider } from '@/components/app-components/image-modal'
import ScrollProvider from '@/components/app-components/ScrollProvider'
import Banner from '@/components/app-components/banner'
const CustomCursor = dynamic(() => import('@/components/app-components/CustomCursor'), { ssr: false })

export default function AppWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ScrollProvider>
      <BgProvider>
        <ImageModalProvider>
          <SuppressWarnings />
          <CustomCursor />
          <Banner />
          {children}
        </ImageModalProvider>
      </BgProvider>
    </ScrollProvider>
  )
}
