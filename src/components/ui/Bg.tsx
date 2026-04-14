'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useBg } from '@/components/app-components/BgContext'

const Silk = dynamic(() => import('@/components/ui/Silk'), {
  ssr: false,
  loading: () => <div className="-z-1 fixed inset-0 bg-bg pointer-events-none select-none" />,
})

export default function Bg({ mode }: { mode?: number }) {
  const { bgMode: contextBgMode } = useBg()
  const bgMode = mode !== undefined ? mode : contextBgMode

  return (
    <>
      {bgMode === 0 ? (
        <div key="black-bg" className="-z-1 fixed inset-0 bg-bg pointer-events-none select-none" />
      ) : bgMode === 1 ? (
        <div key="gif-bg" className="-z-1 fixed inset-0 grayscale-100 pointer-events-none select-none">
          <Image src="/images/ngm-gif.gif" alt="Background" fill priority className="object-cover opacity-50" />
        </div>
      ) : (
        <div key="silk-bg" className="-z-1 fixed inset-0 bg-bg pointer-events-none select-none">
          <Silk speed={5.2} scale={1} color="#303030" noiseIntensity={1.5} rotation={0} />
        </div>
      )}
    </>
  )
}
