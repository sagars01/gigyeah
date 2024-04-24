"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { Card, Spin, Button, message, Row, Col, Empty, Tooltip, Tag } from 'antd';
import { ArrowRightOutlined, DownOutlined, CloseOutlined, FileOutlined, HeartOutlined, CheckCircleOutlined, CheckOutlined, LoadingOutlined } from '@ant-design/icons';
import { apiService } from '@/app/libs/request/apiservice';
import Stages from './Stages';
import Title from 'antd/es/typography/Title';
import ApplicantCard from './ApplicantCard';
import URL from '@/app/utils/constants/url/url';
import Paragraph from 'antd/es/typography/Paragraph';


enum CandidateInterviewJourneyStatus {
    applied = "applied",
    shortlisted = "shortlisted",
    interview = "interview",
    rejected = "rejected",
    hired = "hired"
}

const nextStatus: any = {
    applied: CandidateInterviewJourneyStatus.shortlisted,
    shortlisted: CandidateInterviewJourneyStatus.interview,
    interview: CandidateInterviewJourneyStatus.hired
};



interface Applicant {
    _id: string;
    jobId: string;
    ownerId: string;
    email: string;
    name: string;
    applicantName: string;
    shortIntro: string;
    resumeUrl: string;
    status: string;
}

interface ApplicationManagementProps {
    jobId: string,
    jobDesc: string,
    jobTitle: string
}


const ApplicantManagement: React.FC<ApplicationManagementProps> = ({ jobId, jobDesc, jobTitle }) => {
    const [applicants, setApplicants] = useState<Applicant[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [allApplicants, setAllApplicants] = useState<any>({});

    const fetchApplicants = async () => {
        setLoading(true);
        try {
            const response = await apiService.get<{ applicants: Applicant[] }>(`/application/fetch?jobId=${jobId}`);
            const applicantMap: any = {};

            if (response.applicants) {
                response.applicants.forEach((element: Applicant) => {
                    if (!applicantMap[element.status]) {
                        applicantMap[element.status] = []
                    }
                    applicantMap[element.status].push(element);
                });
            }
            setAllApplicants(applicantMap);
            setApplicants(applicantMap['applied'])
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(true);
            message.error('Failed to fetch applicants');
        }
        finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchApplicants();
    }, []);


    const onStageChange = (stageName: string) => {
        let applicants: any = [];
        if (allApplicants[stageName]) {
            applicants = allApplicants[stageName]
        }
        setApplicants(applicants);
    }


    const updateApplicationStatus = async (applicant: Applicant, applicantId: string, status: string) => {
        const updateResponse = await apiService.put(URL.api.private.application.update, {
            applicantId,
            status
        })

        return updateResponse;
    };

    const handleReject = async (applicant: Applicant) => {
        try {
            await updateApplicationStatus(applicant, applicant._id, CandidateInterviewJourneyStatus.rejected);
            updateLocalApplicantStatus(applicant._id, applicant.status, CandidateInterviewJourneyStatus.rejected);
            message.success(`${applicant.applicantName} has been rejected.`);
        } catch (error) {
            message.error('Failed to reject applicant.');
        }
    };

    const updateLocalApplicantStatus = (applicantId: string, oldStatus: string, newStatus: string) => {

        // Remove the applicant from their current status group
        const updatedStatusGroup = allApplicants[oldStatus].filter((app: Applicant) => app._id !== applicantId);
        setAllApplicants((prev: any) => ({
            ...prev,
            [oldStatus]: updatedStatusGroup
        }));

        // Add the applicant to the new status group
        const updatedApplicant = { ...allApplicants[oldStatus].find((app: Applicant) => app._id === applicantId), status: newStatus };
        setAllApplicants((prev: { [x: string]: any; }) => ({
            ...prev,
            [newStatus]: [...(prev[newStatus] || []), updatedApplicant]
        }));

        // Refresh the view if current stage is affected
        if (applicants.find(app => app._id === applicantId)) {
            setApplicants(prev => prev.filter(app => app._id !== applicantId));
            if (newStatus === nextStatus[oldStatus]) {
                setApplicants(prev => [...prev, updatedApplicant]);
            }
        }
    };

    const handleUpdateNotes = (notes: string) => {

    }

    const handleMoveToNextStage = async (applicant: Applicant) => {
        try {
            await updateApplicationStatus(applicant, applicant._id, nextStatus[applicant.status])
            updateLocalApplicantStatus(applicant._id, applicant.status, nextStatus[applicant.status])
            message.success(`${applicant.applicantName} has moved to ${nextStatus[applicant.status]}`)
        } catch (error) {
            message.error(`Could not process request at the moment!`)
        }
    }

    const handleSaveForFuture = (applicants: Applicant) => {

    }

    return (
        <>
            <div className='mb-8'>
                <Title level={3}>
                    {jobTitle}
                </Title>
                <Paragraph
                    ellipsis={{
                        rows: 1,
                        expandable: true,
                        onEllipsis: (ellipsis) => {
                            console.log('Ellipsis changed:', ellipsis);
                        },
                    }}
                >
                    {jobDesc}
                </Paragraph>
            </div>
            <Stages onChangeEvt={onStageChange} />
            {
                loading ?
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
                    </div> :
                    <div className='mt-4 mb-4'>
                        <Row gutter={[16, 16]}>
                            {applicants?.length > 0 ?
                                applicants?.map(applicant => (
                                    <ApplicantCard
                                        key={applicant._id}
                                        applicant={applicant}
                                        handleMoveToNextStage={handleMoveToNextStage}
                                        handleReject={handleReject}
                                        handleSaveForFuture={handleSaveForFuture}
                                        handleUpdateNotes={handleUpdateNotes}
                                    />
                                )) :
                                <div className="flex justify-center items-center w-full h-4/5 mt-4 mb-4">
                                    <Empty description="No applicants found for this stage." />
                                </div>
                            }
                        </Row>
                    </div>
            }
        </>

    );
};

export default ApplicantManagement;

