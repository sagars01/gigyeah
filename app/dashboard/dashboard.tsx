"use client";
import React, { useState } from 'react';

import CreateJob from './components/job/createJob';
import GetJobsComponent from './components/job/getJobs';

import DashboardLayout from '@/app/dashboard/components/common/dashboard.layout';
import MainAdminDashboard from './components/admin/MainAdminDashboard';
import DashboardHeader from './components/common/dashboard.header';
import URL from '../utils/constants/url/url';



const DashboardComponent: React.FC = () => {
    const links = [
        { title: "Dashboard", link: URL.dashboard.root, isActive: true },
        { title: "Profile", link: URL.user.profile, isActive: false }
    ];

    const HeaderOptions = () => (
        <div className="flex justify-end">
            <DashboardHeader links={links} />
        </div>
    )

    return (
        <>
            <DashboardLayout
                header={<HeaderOptions />}
                content={<MainAdminDashboard />} />
        </>
    );
};

export default DashboardComponent;