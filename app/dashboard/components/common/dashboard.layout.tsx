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
import { Button, Layout, Menu, theme } from 'antd';
import Link from 'next/link';
import { useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import URL from '@/app/utils/constants/url/url';
import ResponsiveLogo from '@/app/libs/components/reusables/Logo';

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
    const { signOut } = useClerk();
    const router = useRouter()
    const handleLogout = () => {
        signOut(() => {
            router.push('/')
        })
    }
    return (
        < >

            <Button
                onClick={handleLogout}
                aria-label="Logout">
                Logout
            </Button>
        </>
    )
}


const DashboardLayout: React.FC<LayoutProps> = ({ content, header }) => {

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();


    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer, position: 'relative', marginBottom: '1rem' }}>

                    <div className="flex justify-between items-center w-full">
                        <div className="shrink-0 ml-4">
                            <Link href="/">
                                <ResponsiveLogo />
                            </Link>
                        </div>
                        <div className="flex-grow">
                            {header}
                        </div>
                        <div className='pr-4'>
                            <LogoutLink />
                        </div>
                    </div>

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
    content: React.ReactNode,
    header?: React.ReactNode,
}

export default DashboardLayout;