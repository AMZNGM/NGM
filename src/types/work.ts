export type WorkItem = {
  id: string
  title: string
  description: string
  image: string
  date: string // ISO string or YYYY-MM-DD
  link: string
  type: 'project' | 'youtube'
  category: 'web' | 'audio' | 'youtuber'
}
