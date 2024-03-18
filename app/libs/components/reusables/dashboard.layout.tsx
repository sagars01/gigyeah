"use client"

import React, { useState } from 'react';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import Link from 'next/link';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const DashboardLink = () => {
    return (
        <div>
            <PieChartOutlined style={{ paddingRight: '0.5rem' }} />
            <Link href={"/dashboard"} />
        </div>
    )
}

const items: MenuItem[] = [
    getItem('Dashboard', '1', <DashboardLink />),
    getItem('Option 2', '2', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined />),
];

const DashboardLayout: React.FC<LayoutProps> = ({ menu: { activeIndex } = { activeIndex: 1 }, content, header }) => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const onMenuClick = () => {

    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={onMenuClick} />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer, position: 'relative', marginBottom: '1rem' }} >
                    {header}
                </Header>
                <Content style={{ margin: '0 16px' }}>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        {content}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Gigyeah ©{new Date().getFullYear()} Built by Sagar from India
                </Footer>
            </Layout>
        </Layout>
    );
};

interface LayoutProps {
    menu?: {
        activeIndex: number;
    },
    content: React.ReactNode,
    header?: React.ReactNode,
}

export default DashboardLayout;