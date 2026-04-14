import dbData from '@/data/db.json'
import { WorkItem } from '@/types/work'

export const BIO = dbData.BIO
export const CONTACT = dbData.CONTACT
export const WEB_SKILLS = dbData.WEB_SKILLS
export const AUDIO_SKILLS = dbData.AUDIO_SKILLS
export const WEB_PROJECTS = dbData.WEB_PROJECTS
export const AUDIO_PROJECTS = dbData.AUDIO_PROJECTS

export const getWebProjects = (): WorkItem[] => {
  return WEB_PROJECTS.map((p) => ({
    id: p.title.toLowerCase().replace(/\s+/g, '-'),
    title: p.title,
    description: p.description,
    image: p.images[0],
    date: p.services.date,
    link: p.link,
    type: 'project',
    category: 'web',
  }))
}

export const getAudioProjects = async (): Promise<WorkItem[]> => {
  const local = AUDIO_PROJECTS.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    image:
      (p as { image?: string }).image ||
      (p.mediaType === 'Youtube' ? `https://i.ytimg.com/vi/${p.mediaUrl.split('v=')[1]?.split('&')[0]}/hqdefault.jpg` : ''),
    date: p.year,
    link: p.mediaUrl,
    type: 'project' as const,
    category: 'audio' as const,
  }))

  try {
    const res = await fetch('/api/youtube?channel=primary')
    if (!res.ok) return local
    const ytVideos: WorkItem[] = await res.json()
    return [...local, ...ytVideos]
  } catch (error) {
    console.error('Error fetching audio videos:', error)
    return local
  }
}

export const getYoutuberProjects = async (): Promise<WorkItem[]> => {
  try {
    const res = await fetch('/api/youtube?channel=secondary')
    if (!res.ok) return []
    return await res.json()
  } catch (error) {
    console.error('Error fetching YouTuber projects:', error)
    return []
  }
}
