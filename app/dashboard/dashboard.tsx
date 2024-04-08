"use client";

// import { useWindowDimensions } from '@/utils/ui/getWindowDims.utils';
import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import CreateJob from './createJob';
import GetJobsComponent from './getJobs';

import DashboardLayout from '@/app/libs/components/reusables/dashboard.layout';


const DashboardComponent: React.FC = () => {



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