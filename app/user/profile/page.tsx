"use client"
import React from 'react';
import { Col, Row } from 'antd';
import UserProfileEditor from './components/UserProfileEditor';
import DashboardLayout from '@/app/libs/components/reusables/dashboard.layout';
import { UserProvider } from '@/app/user/profile/contexts/UserProfileContext';
import ProfileVisualizer from './components/UserProfileVisualizer';


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


    return (
        // <UserProvider>
        <DashboardLayout menu={{
            activeIndex: '3.1'
        }} content={
            <MainContent />
        }>

        </DashboardLayout>
        // </UserProvider>
    );
};

export default EditProfilePage;
