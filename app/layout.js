import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geistSans = Geist({ 
  subsets: ["latin"],
  variable: '--font-geist-sans'
})

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: '--font-geist-mono'
})

export const metadata = {
  title: 'AppBoost Labs | App Optimization & Growth',
  description: 'AppBoost Labs helps apps optimize performance, increase user engagement, and achieve growth through data-driven strategies. Based in Brickell, Miami, Florida.',
  metadataBase: new URL('https://appboostlabs.org'),
  openGraph: {
    title: 'AppBoost Labs | App Optimization & Growth',
    description: 'AppBoost Labs helps apps optimize performance, increase user engagement, and achieve growth through data-driven strategies. Based in Brickell, Miami, Florida.',
    url: 'https://appboostlabs.org',
    siteName: 'AppBoost Labs',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AppBoost Labs - App Optimization & Growth',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AppBoost Labs | App Optimization & Growth',
    description: 'AppBoost Labs helps apps optimize performance, increase user engagement, and achieve growth through data-driven strategies. Based in Brickell, Miami, Florida.',
    images: ['/images/og-image.jpg'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
