"use client"

import React, { useEffect, useState } from 'react';
import { Card, Button, Space, Spin, message, Menu, Col, Row, Tooltip } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, EyeOutlined, FileTextOutlined } from '@ant-design/icons';
import { apiService } from '@/libs/request/apiservice';


interface Applicant {
    _id: string;
    jobId: string;
    email: string;
    applicantName: string;
    shortIntro: string;
    resumeUrl: string;
    status: 'applied' | 'shortlisted' | 'rejected';
    applicationsReceived: number;
}

interface Props {
    jobId: string;
}

const ApplicationList: React.FC<Props> = ({ jobId }) => {
    const [applicants, setApplicants] = useState<Applicant[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        fetchApplicants();
    }, [jobId]);

    const fetchApplicants = async () => {
        setLoading(true);
        try {

            // TODO: Fix the API Types Issue
            const response: any = await apiService.get<{ applicants: Applicant[] }>(`/application/fetch?jobId=${jobId}`);
            setApplicants(response.applicants || []);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            message.error('Failed to fetch applicants');
        }
    };

    const handleMenuClick = (applicantId: string, action: string) => {
        console.log(`Action: ${action} on applicantId: ${applicantId}`);
        // Here you can add the functionality for shortlisting or rejecting applicants
    };

    const applicantActionsMenu = (applicantId: string) => (
        <Menu onClick={({ key }) => handleMenuClick(applicantId, key)}>
            <Menu.Item key="shortlist">Shortlist</Menu.Item>
            <Menu.Item key="reject">Reject</Menu.Item>
        </Menu>
    );

    if (loading) {
        return <Spin className='absolute-middle' tip="Loading applicants..." size="large" />;
    }

    const Applications = () => {
        return (
            <>
                <Space direction="vertical" size="middle" style={{ display: 'flex', width: '100%' }}>
                    {applicants.map((applicant) => (
                        // Inside the map function of applicants

                        <Card key={applicant._id}>
                            <Row gutter={[16, 16]}>
                                <Col span={18}>
                                    <p><strong>Name:</strong> {applicant.applicantName}</p>
                                    <p><strong>Email:</strong> {applicant.email}</p>
                                    <p><strong>Intro:</strong> {applicant.shortIntro}</p>
                                    <p><strong>Status:</strong> {applicant.status}</p>
                                </Col>
                                <Col span={6} style={{ textAlign: 'right' }}>
                                    <Tooltip title="View Resume">
                                        <Button type="primary" shape="circle" icon={<EyeOutlined />} href={applicant.resumeUrl} target="_blank" />
                                    </Tooltip>
                                    <Tooltip title="Shortlist">
                                        <Button shape="circle" icon={<CheckCircleOutlined />} style={{ marginLeft: '10px', color: 'green' }} />
                                    </Tooltip>
                                    <Tooltip title="Reject">
                                        <Button shape="circle" icon={<CloseCircleOutlined />} style={{ marginLeft: '10px', color: 'red' }} />
                                    </Tooltip>
                                    <div style={{ textAlign: 'right', marginTop: 16 }}>
                                        <Button
                                            type="primary" onClick={() => {/* Handle Summarize for Me action */ }}>
                                            Summarize for Me
                                        </Button>
                                    </div>
                                </Col>
                            </Row>

                        </Card>

                    ))}
                </Space>
            </>
        )
    }

    return (
        <>
            <Applications />
        </>
    );
};

export default ApplicationList;
