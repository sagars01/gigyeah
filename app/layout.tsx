"use client"
import React from 'react';
import { ClerkLoaded, ClerkLoading, ClerkProvider } from '@clerk/nextjs';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider, theme } from 'antd';
import './styles/components/global.css';
import { WindowDimensionsProvider } from '@/app/utils/ui/getWindowDims.utils';
import { SpeedInsights } from "@vercel/speed-insights/next"

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html lang="en">
    <body>
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