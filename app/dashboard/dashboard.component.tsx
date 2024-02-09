"use client";

// import { useWindowDimensions } from '@/utils/ui/getWindowDims.utils';
import React, { useState } from 'react';
import { KeyOutlined, MenuFoldOutlined, MenuUnfoldOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, Typography, theme } from 'antd';

import CreateJob from './createJob.component';
import GetJobsComponent from './getJobs.component';
import { useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation'

import styles from "./styles/dashboard.module.css"

const { Header, Content, Footer, Sider } = Layout;


const DashboardComponent: React.FC = () => {

    const [menuCollapsed, setMenuCollapsed] = useState(false);


    const { signOut } = useClerk();


    const router = useRouter()
    const NavItems = [
        {
            key: 1,
            icon: <PlusOutlined />,
            label: "Add features"
        }
    ]

    const BtmNavItems = [
        {
            key: 2,
            icon: <KeyOutlined />,
            label: "Logout",
            onClick: () => signOut(() => router.push("/"))
        }
    ]


    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const [shouldFetchJobs, setFetchJob] = useState(false);
    const [jobId, setJobId] = useState<any>(null);

    // const { width, height } = useWindowDimensions();


    const [openDrawer, setOpenDrawer] = useState(false);
    const showDrawer = () => {
        setOpenDrawer(true)
    }

    const onDrawerClose = () => {
        setOpenDrawer(false)
    }

    const onJobCreatedSuccessfully = (response: any) => {
        const { jobId } = response;
        setJobId(jobId);
        setFetchJob(true);
        setOpenDrawer(false);
    }

    return (
        <Layout>
            <CreateJob jobCreatedEvt={onJobCreatedSuccessfully} openDrawer={openDrawer} onDrawerClose={onDrawerClose} />
            <Sider
                trigger={null} collapsible collapsed={menuCollapsed}
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={(broken) => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
                style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }}
            >
                <div className={styles.dsbSiderIconWrapper}>
                    <div className={`${styles.demoLogoVertical} ${styles.leftAligned}`} >
                        <Typography.Title level={4}>
                            GigYeah
                        </Typography.Title>
                    </div>
                    <Button
                        type="text"
                        icon={menuCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setMenuCollapsed(!menuCollapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                            color: "#fff",
                        }}
                    />
                </div>
                <div className={styles.topSiderMenu}>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={NavItems} />
                </div>
                <div className={styles.bottomSiderMenu}>
                    <Menu theme="dark" mode="inline" items={BtmNavItems} />
                </div>

            </Sider>
            <Layout style={{ marginLeft: 200 }}>
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
                        <GetJobsComponent shouldFetchJobs={shouldFetchJobs} jobId={jobId} />
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