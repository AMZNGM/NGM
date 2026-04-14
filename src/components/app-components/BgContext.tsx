'use client'

import { createContext, useContext, useState } from 'react'

const BgContext = createContext<{
  bgMode: number
  cycleBg: () => void
} | null>(null)

export function BgProvider({ children }: { children: React.ReactNode }) {
  const [bgMode, setBgMode] = useState(0)
  const cycleBg = () => setBgMode((prev) => (prev + 1) % 3)

  return <BgContext.Provider value={{ bgMode, cycleBg }}>{children}</BgContext.Provider>
}

export function useBg() {
  const ctx = useContext(BgContext)
  if (!ctx) throw new Error('useBg must be used within a BgProvider')
  return ctx
}
