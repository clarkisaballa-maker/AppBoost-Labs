import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
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
  title: 'AppBoost Labs | Mobile App Performance & Product Growth Consulting',
  description:
    'AppBoost Labs provides mobile app performance analysis, quality assurance testing, user experience optimization, and product growth consulting for digital businesses. Supporting scalable app improvement with data-driven strategies from Miami, Florida.',

  metadataBase: new URL('https://appboostlabs.org'),

  keywords: [
    'Mobile App Performance',
    'QA Testing Services',
    'User Experience Optimization',
    'Product Growth Consulting',
    'App Performance Analysis',
    'Application Testing',
    'Digital Product Optimization',
    'ASO Consulting',
    'Product Analytics',
    'UX Improvement',
    'Mobile Product Consulting',
    'Business App Solutions'
  ],

  authors: [
    {
      name: 'AppBoost Labs'
    }
  ],

  creator: 'AppBoost Labs',
  publisher: 'AppBoost Labs',

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },

  openGraph: {
    title: 'AppBoost Labs | Mobile App Performance & Product Growth Consulting',
    description:
      'Professional mobile app performance analysis, QA testing, UX optimization, and growth consulting for digital products and businesses. Helping brands improve retention, engagement, and long-term product performance.',
    url: 'https://appboostlabs.org',
    siteName: 'AppBoost Labs',

    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AppBoost Labs - Mobile App Performance & Growth Consulting'
      }
    ],

    locale: 'en_US',
    type: 'website'
  },

  twitter: {
    card: 'summary_large_image',
    title: 'AppBoost Labs | Mobile App Performance & Product Growth Consulting',
    description:
      'AppBoost Labs delivers professional app performance analysis, QA testing, UX optimization, and product growth consulting for modern digital businesses.',
    images: ['/images/og-image.jpg']
  },

  alternates: {
    canonical: 'https://appboostlabs.org'
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics Script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-JHQFXX1VEQ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JHQFXX1VEQ');
          `}
        </Script>

        {/* Facebook Pixel Base Code */}
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '26904723459170525'); // Replace with your Pixel ID
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}