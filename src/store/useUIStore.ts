import { create } from 'zustand'
import { WEB_PROJECTS } from '@/data/db'

export type TabType = 'gallery' | 'latest' | 'audio'
type ProjectType = (typeof WEB_PROJECTS)[0]

interface UIState {
  activeTab: TabType
  selectedProject: ProjectType | null
  isFirstLoadUI: boolean
  isAudio: boolean
  setActiveTab: (tab: TabType) => void
  setSelectedProject: (project: ProjectType | null) => void
  setFirstLoadComplete: () => void
  toggleAudio: () => void
  setIsAudio: (value: boolean) => void
}

export const useUIStore = create<UIState>((set) => ({
  activeTab: 'gallery',
  selectedProject: null,
  isFirstLoadUI: true,
  isAudio: false,
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedProject: (project) => {
    set({ selectedProject: project })
    if (project) set({ activeTab: 'gallery' })
  },
  setFirstLoadComplete: () => set({ isFirstLoadUI: false }),
  toggleAudio: () => set((state) => ({ isAudio: !state.isAudio })),
  setIsAudio: (value) => set({ isAudio: value }),
}))
