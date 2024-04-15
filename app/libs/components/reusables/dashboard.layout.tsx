"use client"

import React, { useState } from 'react';
import {
    BookOutlined,
    DesktopOutlined,
    DollarCircleOutlined,
    KeyOutlined,
    MoneyCollectFilled,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import Link from 'next/link';
import { useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import URL from '@/app/utils/constants/url/url';
import Image from 'next/image';

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
            <Link href={URL.dashboard.root} />
        </div>
    )
}

const redirect = (url: string) => {
    window.location.href = url;
}

const ProfileLink = () => {
    return (
        <div>
            <BookOutlined style={{ paddingRight: '0.5rem' }} />
        </div>
    )
}

const SubscriptionLink = () => {
    return (
        <>
            <DollarCircleOutlined style={{ paddingRight: '0.5rem' }} />
            <Link href={URL.user.subscription} />
        </>
    )
}

const UsageLink = () => {
    return (
        <>
            <MoneyCollectFilled style={{ paddingRight: '0.5rem' }} />
            <Link href={URL.user.usage} />
        </>
    )
}


const LogoutLink = () => {

    return (
        < >


            <div>
                <KeyOutlined style={{ paddingRight: '0.5rem' }} />
            </div>

        </>
    )
}


const items: MenuItem[] = [
    getItem('Dashboard', '1', <DashboardLink />),
    getItem('Jobs', '2', <DesktopOutlined />),
    getItem('User', '3', <UserOutlined />, [
        getItem('Profile', '3.1', <ProfileLink />),
        getItem('Usage', '3.2', <UsageLink />),
        getItem('Subscription', '3.3', <SubscriptionLink />),
    ]),
    getItem('Logout', '4', <LogoutLink />)
];

const DashboardLayout: React.FC<LayoutProps> = ({ menu: { activeIndex } = { activeIndex: 1 }, content, header }) => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const { signOut } = useClerk();
    const router = useRouter()

    const onMenuClick = (item: any) => {
        if (item.key === '4') {
            signOut(() => router.push("/"))
        }

        if (item.key === '3.1') {
            router.push("/user/profile")
        }
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" style={{ padding: "0.5rem" }}>
                    <img src="/icon-large.png" width={"100%"} height={"auto"} />
                </div>
                <Menu theme="dark" defaultSelectedKeys={[`${activeIndex || 1}`]} mode="inline" items={items} onClick={onMenuClick} />
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
                    WithJessi ©{new Date().getFullYear()} Built by Sagar from India
                </Footer>
            </Layout>
        </Layout>
    );
};

interface LayoutProps {
    menu?: {
        activeIndex: string;
    },
    content: React.ReactNode,
    header?: React.ReactNode,
}

export default DashboardLayout;