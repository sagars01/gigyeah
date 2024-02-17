// components/layout/DashboardLayout.tsx
import React, { ReactNode } from 'react';
import { Layout } from 'antd';
import Sidebar from './Sidebar';
import CustomHeader from './CustomHeader';
import CustomFooter from './CustomFooter';

const { Content } = Layout;

interface DashboardLayoutProps {
    children: ReactNode;
    headerContent?: ReactNode;
    siderItems: Array<any>;
    bottomSiderItems: Array<any>;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, headerContent, siderItems, bottomSiderItems }) => {
    return (
        <Layout>
            <Sidebar siderItems={siderItems} bottomSiderItems={bottomSiderItems} />
            <Layout style={{ marginLeft: 200 }}>
                <CustomHeader content={headerContent} />
                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    {children}
                </Content>
                <CustomFooter />
            </Layout>
        </Layout>
    );
};

export default DashboardLayout;
