import { create } from 'zustand'
import { WEB_PROJECTS } from '@/data/db'

export type TabType = 'gallery' | 'latest' | 'audio'
type ProjectType = (typeof WEB_PROJECTS)[0]

interface UIState {
  activeTab: TabType
  selectedProject: ProjectType | null
  isFirstLoadUI: boolean
  isAudio: boolean
  showIntro: boolean
  setActiveTab: (tab: TabType) => void
  setSelectedProject: (project: ProjectType | null) => void
  toggleAudio: () => void
  setIsAudio: (value: boolean) => void
  dismissIntro: () => void
}

export const useUIStore = create<UIState>((set) => ({
  activeTab: 'gallery',
  selectedProject: null,
  isFirstLoadUI: true,
  isAudio: false,
  showIntro: true,
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedProject: (project) => {
    if (project) {
      set({ selectedProject: project, activeTab: 'gallery', showIntro: false })
    } else {
      set({ selectedProject: null })
    }
  },
  toggleAudio: () => set((state) => ({ isAudio: !state.isAudio })),
  setIsAudio: (value) => set({ isAudio: value }),
  dismissIntro: () => set({ showIntro: false }),
}))
