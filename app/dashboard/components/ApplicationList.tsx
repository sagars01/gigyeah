"use client"
import React, { useEffect, useState } from 'react';
import { Card, Button, Space, Spin, message, Menu, Col, Row, Tooltip, Pagination, Empty } from 'antd';
import { CheckCircleOutlined, CheckSquareOutlined, CloseCircleOutlined, ExpandAltOutlined, ExpandOutlined, EyeOutlined } from '@ant-design/icons';
import { apiService } from '@/app/libs/request/apiservice';
import ApplicantProfileExpand from './ApplicantProfileExpanded';

interface Applicant {
    _id: string;
    jobId: string;
    onwerId: string;
    email: string;
    name: string;
    applicantName: string;
    shortIntro: string;
    resumeUrl: string;
    status: 'applied' | 'shortlisted' | 'rejected';
    applicationsReceived: number;
}

interface Props {
    jobId: string;
    jobDesc: string;
}

type Action = 'expand' | 'shortlist' | 'reject' | 'summarize';

const ApplicationList: React.FC<Props> = ({ jobId, jobDesc }) => {
    const [applicants, setApplicants] = useState<Applicant[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
    const [applicantData, setApplicantData] = useState<Applicant | null>(null);
    const [selectedKey, setSelectedKey] = useState('all');

    useEffect(() => {
        fetchApplicants();
    }, [jobId]);

    const fetchApplicants = async () => {
        setLoading(true);
        try {
            const response: any = await apiService.get<{ applicants: Applicant[] }>(`/application/fetch?jobId=${jobId}`);
            setApplicants(response.applicants || []);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            message.error('Failed to fetch applicants');
        }
    };

    const updateApplicationStatus = async (applicantId: string, status: 'shortlisted' | 'rejected') => {
        const updateResponse = await apiService.put(`/application/update`, {
            applicantId,
            status
        })

        return updateResponse;
    };

    const handleShortlist = async (applicant: Applicant) => {
        try {
            await updateApplicationStatus(applicant._id, 'shortlisted');
            setApplicants((prevApplicants) =>
                prevApplicants.map((a) =>
                    a._id === applicant._id ? { ...a, status: 'shortlisted' } : a
                )
            );
            message.success(`${applicant.applicantName} has been shortlisted.`);
        } catch (error) {
            message.error('Failed to shortlist applicant.');
        }
    };

    const handleReject = async (applicant: Applicant) => {
        try {
            await updateApplicationStatus(applicant._id, 'rejected');
            setApplicants((prevApplicants) =>
                prevApplicants.map((a) =>
                    a._id === applicant._id ? { ...a, status: 'rejected' } : a
                )
            );
            message.success(`${applicant.applicantName} has been rejected.`);
        } catch (error) {
            message.error('Failed to reject applicant.');
        }
    };

    const handleApplicationAction = async (applicant: Applicant, action: Action) => {
        switch (action) {
            case 'expand':
                setApplicantData(applicant);
                break;
            case 'shortlist':
                await handleShortlist(applicant);
                break;
            case 'reject':
                await handleReject(applicant);
                break;
            case 'summarize':
                // Handle summarize action
                break;
        }
    };

    const onApplicationExpandedClose = () => {
        setApplicantData(null);
    };

    const getFilteredApplicants = () => {
        let filteredApplicants: Applicant[] = [];
        switch (selectedKey) {
            case 'applied':
                filteredApplicants = applicants.filter(applicant => applicant.status === 'applied');
                break;
            case 'rejected':
                filteredApplicants = applicants.filter(applicant => applicant.status === 'rejected');
                break;
            case 'shortlisted':
                filteredApplicants = applicants.filter(applicant => applicant.status === 'shortlisted');
                break;
            default:
                filteredApplicants = applicants;
                break;
        }
        return filteredApplicants;
    };

    const handleFilterOption = (filter: string) => {
        setSelectedKey(filter);
        setPagination({ ...pagination, current: 1 }); // Reset pagination to the first page
    };

    const ApplicationsList = () => {
        const filteredApplicants = getFilteredApplicants();
        const startIndex = (pagination.current - 1) * pagination.pageSize;
        const visibleApplicants = filteredApplicants.slice(startIndex, startIndex + pagination.pageSize);



        if (visibleApplicants.length === 0) {
            return (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                    <Empty
                        description={
                            <span>
                                No applicants found
                            </span>
                        }
                    />
                </div>
            );
        }

        return (
            <>
                {visibleApplicants.map((applicant) => (
                    <Card key={applicant._id}>
                        <Row gutter={[16, 16]}>
                            <Col span={18}>
                                <p><strong>Name:</strong> {applicant.applicantName}</p>
                                <p><strong>Email:</strong> {applicant.email}</p>
                                <p><strong>Intro:</strong> {applicant.shortIntro}</p>
                                <p><strong>Status:</strong> {applicant.status}</p>
                            </Col>
                            <Col span={6} style={{ alignContent: 'center', textAlign: 'right' }}>

                                <Tooltip title="Shortlist">
                                    <Button shape="circle"
                                        type='primary'
                                        onClick={() => handleApplicationAction(applicant, 'shortlist')}
                                        icon={<CheckCircleOutlined color='white' />} style={{ marginLeft: '10px' }} />
                                </Tooltip>
                                <Tooltip title="Reject">
                                    <Button shape="circle"
                                        type='default'
                                        onClick={() => handleApplicationAction(applicant, 'reject')}
                                        icon={<CloseCircleOutlined />} style={{ marginLeft: '10px', color: 'red' }} />
                                </Tooltip>
                                <Tooltip title="Expand">
                                    <Button onClick={() => handleApplicationAction(applicant, 'expand')} shape="circle" icon={<ExpandAltOutlined />} style={{ marginLeft: '10px', color: 'blue' }} />
                                </Tooltip>
                            </Col>
                        </Row>
                        <Button type='primary' style={{ float: 'right' }}>
                            Summarize
                        </Button>
                    </Card>
                ))}
                {filteredApplicants.length > 10 && pagination.current === 1 && (
                    <Pagination
                        style={{ marginTop: '16px', textAlign: 'center' }}
                        current={pagination.current}
                        pageSize={pagination.pageSize}
                        total={filteredApplicants.length}
                        onChange={(page, pageSize) => setPagination({ current: page, pageSize })}
                    />
                )}
            </>
        );
    };

    const FilterPanel = () => {
        return (
            <>
                <Card title="Quick View" style={{ position: 'sticky', top: 0 }}>
                    <Menu
                        mode="vertical"
                        defaultSelectedKeys={[selectedKey]}
                        onClick={({ key }) => handleFilterOption(key)}
                        style={{ borderRight: 0 }}
                    >
                        <Menu.Item key="all" icon={<ExpandOutlined />}>All</Menu.Item>
                        <Menu.Item key="applied" icon={<CheckCircleOutlined />}>
                            Applied
                        </Menu.Item>
                        <Menu.Item key="rejected" icon={<CloseCircleOutlined />}>
                            Rejected
                        </Menu.Item>
                        <Menu.Item key="shortlisted" icon={<CheckSquareOutlined />}>
                            Shortlisted
                        </Menu.Item>
                    </Menu>
                </Card>
            </>
        );
    };

    return (
        <>
            <ApplicantProfileExpand open={!!applicantData} jobDesc={jobDesc} applicant={applicantData} onClose={onApplicationExpandedClose} />
            <Space direction="vertical" size="middle" style={{ display: 'flex', width: '100%' }}>
                <Row gutter={[16, 16]}>
                    <Col lg={6}>
                        <FilterPanel />
                    </Col>
                    <Col lg={18}>
                        {loading ? (
                            <Spin className='absolute-middle' tip="Loading applicants..." size="large" />
                        ) : (
                            <ApplicationsList />
                        )}
                    </Col>
                </Row>
            </Space>
        </>
    );
};

export default ApplicationList;


