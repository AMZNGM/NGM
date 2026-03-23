import { SuppressWarnings } from '@/utils/suppressWarnings'
import ScrollProvider from '@/components/app-components/ScrollProvider'
import Banner from '@/components/app-components/banner'

export default function AppWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ScrollProvider>
      <Banner />
      <SuppressWarnings />
      {children}
    </ScrollProvider>
  )
}
