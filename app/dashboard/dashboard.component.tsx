"use client";

import React, { useState } from 'react';
import { PlusOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { useWindowDimensions } from '@/utils/ui/getWindowDims.utils';
import CreateJob from './createJob.component';

const { Header, Content, Footer, Sider } = Layout;

const items = [UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
    (icon, index) => ({
        key: String(index + 1),
        icon: React.createElement(icon),
        label: `nav ${index + 1}`,
    }),
);

const DashboardComponent: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();


    const { width, height } = useWindowDimensions();

    const [openDrawer, setOpenDrawer] = useState(false);
    const showDrawer = () => {
        setOpenDrawer(true)
    }

    const onDrawerClose = () => {
        setOpenDrawer(false)
    }

    return (
        <Layout>
            <CreateJob openDrawer={openDrawer} onDrawerClose={onDrawerClose} />
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={(broken) => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
            >
                <div className="demo-logo-vertical" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer, position: 'relative' }} >
                    <Button style={{ bottom: '25%', right: 15, position: 'absolute' }} type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
                        Create New Job
                    </Button>
                </Header>
                <Content style={{ margin: '24px 16px 0' }}>
                    <div
                        style={{
                            padding: 24,
                            minHeight: '100vh',
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        content
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Gigyeah ©{new Date().getFullYear()} Made in India
                </Footer>
            </Layout>
        </Layout>
    );
};

export default DashboardComponent;