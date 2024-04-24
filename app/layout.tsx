import React from 'react';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from '@vercel/analytics/react'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs';

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