"use client";

// import { useWindowDimensions } from '@/utils/ui/getWindowDims.utils';
import React, { useState } from 'react';
import { KeyOutlined, MenuFoldOutlined, MenuUnfoldOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, Typography, theme } from 'antd';

import CreateJob from './createJob';
import GetJobsComponent from './getJobs';
import { useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation'

import styles from "./styles/dashboard.module.css"
import DashboardLayout from '@/libs/components/reusables/dashboard.layout';

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

    const CreateNewJob = () => {
        return (
            <Button style={{ bottom: '25%', right: 15, position: 'absolute' }} type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
                Create New Job
            </Button>
        )
    }

    return (
        <>
            <CreateJob jobCreatedEvt={onJobCreatedSuccessfully} openDrawer={openDrawer} onDrawerClose={onDrawerClose} />
            <DashboardLayout
                header={<CreateNewJob />}
                content={<GetJobsComponent
                    shouldFetchJobs={shouldFetchJobs} jobId={jobId} />} />
        </>
    );
};

export default DashboardComponent;