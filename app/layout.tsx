
import React from 'react';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from '@vercel/analytics/react'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs';
import { Metadata } from 'next';

const domain = process.env.NEXT_PUBLIC_APP_DOMAIN as string;
const imgUrl = domain + "/img/homepage/og_homt.png"


export const metadata: Metadata = {
  title: 'Hiring Made Simple',
  description: 'Simplest ATS for recruiting software engineers',
  metadataBase: new URL("https://www.withjessi.com"),
  openGraph: {
    title: 'WithJessi',
    description: 'The Simplest ATS to hire tech talent',
    url: 'https://www.withjessi.com',
    siteName: 'WithJessi',
    images: [
      {
        url: imgUrl,
        width: 800,
        height: 600,
      },
      {
        url: imgUrl,
        width: 1800,
        height: 1600,
        alt: 'View With Jessi',
      },
    ],
    locale: 'en_US',
    type: 'website'
  },
}




const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html lang="en">

    <body style={{
      margin: 0,
      padding: 0
    }}>
      <Analytics />
      <SpeedInsights />
      <ClerkProvider>
        {children}
      </ClerkProvider>
    </body>
  </html >
);

export default RootLayout;