import './globals.css'
import localFont from 'next/font/local'
import { Major_Mono_Display } from 'next/font/google'
import AppWrapper from '@/components/app-components/AppWrapper'

export const mainFont = localFont({
  // src: '../../public/fonts/Rinter/Rinter.woff2',
  src: '../../public/fonts/kiona/Kiona-Regular.ttf',

  // src: [
  //   {
  //     path: '../../public/fonts/Satoshi/Satoshi-Variable.woff2',
  //     weight: '100 900',
  //     style: 'normal',
  //   },
  //   {
  //     path: '../../public/fonts/Satoshi/Satoshi-VariableItalic.woff2',
  //     weight: '100 900',
  //     style: 'italic',
  //   },
  //   {
  //     path: '../../public/fonts/Satoshi/Satoshi-Light.woff2',
  //     weight: '300',
  //     style: 'normal',
  //   },
  //   {
  //     path: '../../public/fonts/Satoshi/Satoshi-LightItalic.woff2',
  //     weight: '300',
  //     style: 'italic',
  //   },
  //   {
  //     path: '../../public/fonts/Satoshi/Satoshi-Regular.woff2',
  //     weight: '400',
  //     style: 'normal',
  //   },
  //   {
  //     path: '../../public/fonts/Satoshi/Satoshi-Italic.woff2',
  //     weight: '400',
  //     style: 'italic',
  //   },
  //   {
  //     path: '../../public/fonts/Satoshi/Satoshi-Medium.woff2',
  //     weight: '500',
  //     style: 'normal',
  //   },
  //   {
  //     path: '../../public/fonts/Satoshi/Satoshi-MediumItalic.woff2',
  //     weight: '500',
  //     style: 'italic',
  //   },
  //   {
  //     path: '../../public/fonts/Satoshi/Satoshi-Bold.woff2',
  //     weight: '700',
  //     style: 'normal',
  //   },
  //   {
  //     path: '../../public/fonts/Satoshi/Satoshi-BoldItalic.woff2',
  //     weight: '700',
  //     style: 'italic',
  //   },
  //   {
  //     path: '../../public/fonts/Satoshi/Satoshi-Black.woff2',
  //     weight: '900',
  //     style: 'normal',
  //   },
  //   {
  //     path: '../../public/fonts/Satoshi/Satoshi-BlackItalic.woff2',
  //     weight: '900',
  //     style: 'italic',
  //   },
  // ],
  display: 'swap',
  variable: '--font-main',
})

export const secFont = Major_Mono_Display({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-major',
})

// export const secFont = localFont({
//   src: '../../public/fonts/monor/Monor_Regular.otf',
//   variable: '--font-sec',
//   display: 'swap',
// })

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
        url: '/images/NGM-CORRPRET.png',
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
    <html lang="en" className={`${mainFont.className} ${secFont.variable}`}>
      <body
        suppressHydrationWarning
        className="relative w-full h-full overflow-x-hidden! bg-bg selection:bg-main text-text antialiased md:subpixel-antialiased scroll-smooth"
      >
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  )
}
