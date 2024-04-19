import React from 'react';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html lang="en">
    <body style={{
      margin: 0,
      padding: 0
    }}>
      <Analytics />
      <SpeedInsights />
      {children}
    </body>
  </html >
);

export default RootLayout;