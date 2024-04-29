"use client";
import React, { useState } from 'react';


import DashboardLayout from '@/app/dashboard/components/common/dashboard.layout';
import MainAdminDashboard from './components/admin/MainAdminDashboard';
import DashboardHeader from './components/common/dashboard.header';
import URL from '../utils/constants/url/url';
import './styles/dashboard.module.css'


const DashboardComponent: React.FC = () => {
    const links = [
        { title: "Dashboard", link: URL.dashboard.root, isActive: true },
        { title: "Profile", link: URL.user.profile, isActive: false },
        { title: "Repository", link: URL.dashboard.repository, isActive: false }
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