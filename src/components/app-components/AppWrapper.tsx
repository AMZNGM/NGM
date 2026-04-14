import { BgProvider } from '@/components/app-components/BgContext'
import { SuppressWarnings } from '@/components/app-components/suppressWarnings'
import { ImageModalProvider } from '@/components/app-components/image-modal'
import ScrollProvider from '@/components/app-components/ScrollProvider'
import CustomCursor from '@/components/app-components/CustomCursor'
import Banner from '@/components/app-components/banner'

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
