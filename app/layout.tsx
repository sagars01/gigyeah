"use client"
import React from 'react';
import { ClerkLoaded, ClerkLoading, ClerkProvider } from '@clerk/nextjs';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider, theme } from 'antd';
import './styles/components/global.css';
import { WindowDimensionsProvider } from '@/app/utils/ui/getWindowDims.utils';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from '@vercel/analytics/react'

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html lang="en">
    <body>
      <Analytics />
      <ClerkProvider>
        <ClerkLoading>
          <div className="loader"></div>
        </ClerkLoading>
        <ClerkLoaded>
          <AntdRegistry>
            <ConfigProvider theme={{
              algorithm: theme.defaultAlgorithm
            }}>
              <WindowDimensionsProvider>
                {children}
                <SpeedInsights />
              </WindowDimensionsProvider>
            </ConfigProvider>
          </AntdRegistry>
        </ClerkLoaded>
      </ClerkProvider>

    </body>
  </html >
);

export default RootLayout;