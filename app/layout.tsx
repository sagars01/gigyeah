"use client"
import React from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider, theme } from 'antd';
import '../styles/components/global.css';
import { WindowDimensionsProvider } from '@/utils/ui/getWindowDims.utils';

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html lang="en">
    <body>
      <AntdRegistry>
        <ConfigProvider theme={{
          algorithm: theme.defaultAlgorithm
        }}>
          <WindowDimensionsProvider>
            {children}
          </WindowDimensionsProvider>
        </ConfigProvider>
      </AntdRegistry>
    </body>
  </html>
);

export default RootLayout;