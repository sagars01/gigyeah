"use client"
import React from 'react';
import { Col, Row } from 'antd';
import UserProfileEditor from './components/UserProfileEditor';
import DashboardLayout from '@/app/dashboard/components/common/dashboard.layout';
import { UserProvider } from '@/app/user/profile/contexts/UserProfileContext';
import ProfileVisualizer from './components/UserProfileVisualizer';
import DashboardHeader from '@/app/dashboard/components/common/dashboard.header';
import URL from '@/app/utils/constants/url/url';


const EditProfilePage = () => {


    const MainContent = () => {
        return (
            <Row gutter={16}>
                <Col span={12}>
                    <UserProfileEditor />
                </Col>
                <Col span={12}>
                    <ProfileVisualizer />
                </Col>
            </Row>
        )
    }
    const links = [
        { title: "Dashboard", link: URL.dashboard.root, isActive: false },
        { title: "Profile", link: URL.user.profile, isActive: true }
    ];

    const HeaderOptions = () => (
        <div className="flex justify-end">
            <DashboardHeader links={links} />
        </div>
    )


    return (
        <UserProvider>
            <DashboardLayout
                header={<HeaderOptions />}
                content={
                    <MainContent />
                }>

            </DashboardLayout>
        </UserProvider>
    );
};

export default EditProfilePage;
