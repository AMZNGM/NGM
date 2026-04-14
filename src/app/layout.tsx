import './globals.css'
import localFont from 'next/font/local'
import { Cairo, IBM_Plex_Mono } from 'next/font/google'
import AppWrapper from '@/components/app-components/AppWrapper'

export const main_font = localFont({
  src: [
    {
      path: '../../public/fonts/helvetica/Helvetica.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/helvetica/Helvetica-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-main',
})

export const sec_font = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-sec',
})

export const wide_font = localFont({
  src: '../../public/fonts/Franchise.ttf',
  display: 'swap',
  variable: '--font-wide',
})

export const arab_font = Cairo({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-arab',
})

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://ngm-lemon.vercel.app/'),

  title: {
    default: 'NGM – Creative Frontend Developer',
    template: '%s | Abdulrahman NGM',
  },

  description:
    'Portfolio of Abdulrahman NGM, a creative frontend developer specializing in interactive and motion-driven web experiences using React, Next.js, GSAP, and Framer Motion.',

  keywords: [
    'Creative Frontend Developer',
    'React Developer',
    'Next.js Developer',
    'GSAP Animation',
    'Framer Motion',
    'Interactive Web Development',
    'Creative Developer',
  ],

  authors: [{ name: 'Abdulrahman NGM' }],
  creator: 'Abdulrahman NGM',

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  openGraph: {
    title: 'Abdulrahman NGM – Creative Frontend Developer',
    description: 'Creative frontend developer building motion-driven web experiences with React, Next.js, GSAP, and Framer Motion.',
    url: 'https://ngm-lemon.vercel.app/',
    siteName: 'Abdulrahman NGM Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/NGM-CORRPRET.webp',
        width: 1200,
        height: 630,
        alt: 'Abdulrahman NGM - Creative Frontend Developer',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Abdulrahman NGM – Creative Frontend Developer',
    description: 'Creative frontend developer specializing in interactive and motion-driven websites.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${main_font.className} ${sec_font.variable} ${wide_font.variable} ${arab_font.variable}`}>
      <body
        suppressHydrationWarning
        className="relative w-full h-full bg-bg selection:bg-main text-text selection:text-bg antialiased md:subpixel-antialiased scroll-smooth"
      >
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  )
}
