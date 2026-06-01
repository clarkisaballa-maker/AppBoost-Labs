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

        {/* TikTok Pixel */}
        <Script id="tiktok-pixel" strategy="afterInteractive">
          {`
    !function (w, d, t) {
      w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
    var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
    ;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
      ttq.load('D86I8FRC77U5SIE7L560');
      ttq.page();
    }(window, document, 'ttq');
  `}
        </Script>
  
        {/* Bing UET Pixel */}
        <Script id="bing-uet" strategy="afterInteractive">
          {`
    (function(w, d, t, u, o) {
      w[u] = w[u] || [], o.ts = (new Date).getTime();
      var n = d.createElement(t);
      n.src = "https://bat.bing.net/bat.js?ti=" + o.ti + ("uetq" != u ? "&q=" + u : ""),
      n.async = 1, n.onload = n.onreadystatechange = function() {
        var s = this.readyState;
        s && "loaded" !== s && "complete" !== s ||
        (o.q = w[u], w[u] = new UET(o), w[u].push("pageLoad"),
        n.onload = n.onreadystatechange = null)
      };
      var i = d.getElementsByTagName(t)[0];
      i.parentNode.insertBefore(n, i);
    })(window, document, "script", "uetq", {ti:"97248083", enableAutoSpaTracking: true});
  `}
        </Script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}