import Parser from 'rss-parser'
import { NextResponse } from 'next/server'
import { WorkItem } from '@/types/work'

const parser = new Parser()
const CHANNELS = {
  primary: 'UCYmdAyjbeLoaeVY0TKgkDcQ', // @amzngm
  secondary: 'UCqp41Kd99ORGZa_i421_Mxg', // @AMZNGMM
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const channelType = searchParams.get('channel') // 'all', 'primary', 'secondary'

  try {
    const fetchChannel = async (id: string, label: string) => {
      try {
        const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${id}`
        const feed = await parser.parseURL(url)
        return feed.items.map((item) => {
          const videoId = item.id?.split(':').pop() || ''
          return {
            id: videoId,
            title: item.title || '',
            description: `YouTube Upload (${label})`,
            image: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
            date: item.pubDate ? new Date(item.pubDate).toISOString().split('T')[0] : '',
            link: item.link || '',
            type: 'youtube' as const,
            category: (label === '@amzngm' ? 'audio' : 'youtuber') as 'audio' | 'youtuber',
          }
        })
      } catch (err) {
        console.error(`Error fetching channel ${label}:`, err)
        return []
      }
    }

    let videos: WorkItem[] = []

    if (channelType === 'primary') {
      videos = await fetchChannel(CHANNELS.primary, '@amzngm')
    } else if (channelType === 'secondary') {
      videos = await fetchChannel(CHANNELS.secondary, '@AMZNGMM')
    } else {
      // Default: fetch both
      const [v1, v2] = await Promise.all([fetchChannel(CHANNELS.primary, '@amzngm'), fetchChannel(CHANNELS.secondary, '@AMZNGMM')])
      videos = [...v1, ...v2]
    }

    return NextResponse.json(videos)
  } catch (error) {
    console.error('API Error fetching YouTube:', error)
    return NextResponse.json([], { status: 500 })
  }
}
