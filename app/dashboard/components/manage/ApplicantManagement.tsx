"use client";
import React, { useState, useEffect } from 'react';
import { Card, Spin, Button, message, Row, Col, Empty, Space } from 'antd';
import { LoadingOutlined, DatabaseOutlined, RightOutlined } from '@ant-design/icons';
import { apiService } from '@/app/libs/request/apiservice';
import Stages from './Stages';
import Title from 'antd/es/typography/Title';
import ApplicantCard from './ApplicantCard';
import URL from '@/app/utils/constants/url/url';
import Paragraph from 'antd/es/typography/Paragraph';
import RejectedPool from './RejectedPool';
import Link from 'next/link';
import ApplicantSummarizer from './ApplicantSummarizer';


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



export interface Applicant {
    notes: string;
    c: boolean | undefined;
    skills: any[];
    _id: string;
    jobId: string;
    ownerId: string;
    email: string;
    name: string;
    applicantName: string;
    shortIntro: string;
    resumeUrl: string;
    status: string;
    checkedForSummary?: boolean
}

interface ApplicationManagementProps {
    jobId: string,
    jobDesc: string,
    jobTitle: string
}


const ApplicantManagement: React.FC<ApplicationManagementProps> = ({ jobId, jobDesc, jobTitle }) => {
    const [applicants, setApplicants] = useState<Applicant[]>([]);
    const [viewStage, setViewStage] = useState<string>('applied')
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [allApplicants, setAllApplicants] = useState<any>({});
    const [comparingApplicant, setComparingApplicant] = useState<Applicant[]>([])

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
            setApplicants(applicantMap[viewStage])
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
        setViewStage(stageName)
    }


    const updateApplicationStatus = async (applicantId: string, status: string) => {
        const updateResponse = await apiService.put(URL.api.private.application.update, {
            applicantId,
            status
        })

        return updateResponse;
    };

    const handleReject = async (applicant: Applicant) => {
        try {
            setLoading(true)
            await updateApplicationStatus(applicant._id, CandidateInterviewJourneyStatus.rejected);
            updateLocalApplicantStatus(applicant._id, applicant.status, CandidateInterviewJourneyStatus.rejected);
            message.success(`${applicant.applicantName} has been rejected.`);
        } catch (error) {
            message.error('Failed to reject applicant.');
        } finally {
            setLoading(false)
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

    const handleMoveToNextStage = async (applicant: Applicant) => {
        try {
            await updateApplicationStatus(applicant._id, nextStatus[applicant.status])
            updateLocalApplicantStatus(applicant._id, applicant.status, nextStatus[applicant.status])
            message.success(`${applicant.applicantName} has moved to ${nextStatus[applicant.status]}`)
        } catch (error) {
            message.error(`Could not process request at the moment!`)
        }
    }

    const handleMoveBackToShortlist = async (applicantId: string, previousStage: string, newStage: string) => {
        try {
            setLoading(true)
            await updateApplicationStatus(applicantId, newStage);
            updateLocalApplicantStatus(applicantId, previousStage, newStage)
            message.success(`Candidate moved back to the race!`)
        } catch (error) {
            message.error(`Could not process request at the moment!`)
        } finally {
            setLoading(false)
        }

    }

    const handleSaveForFuture = (applicants: Applicant) => {
        // TODO: Repository
    }


    const handleSetupForComparison = (rowIdx: number, action: boolean) => {
        const updateApplicantsData = [...applicants];
        const compareStack = comparingApplicant;
        const applicantCard = updateApplicantsData[rowIdx];
        const applicantIdxInStack = compareStack.findIndex((stackElement) => stackElement._id === applicantCard._id);

        if (applicantIdxInStack > -1) {
            compareStack.splice(applicantIdxInStack, 1);
            setComparingApplicant(compareStack);
        } else {

            compareStack.push(applicantCard);


        }


        updateApplicantsData[rowIdx].checkedForSummary = action;
        setApplicants(updateApplicantsData);
    };

    return (
        <>
            <div className='mb-8 inline-block'>
                <Title level={3}>
                    <Link
                        className='text-blue-500'
                        target='_blank'
                        href={URL.dashboard.viewJob + `/${jobId}`}>
                        {jobTitle}
                    </Link>
                </Title>
                <Paragraph
                    ellipsis={{
                        rows: 1,
                        expandable: true,
                        onEllipsis: (ellipsis) => {
                            // console.log('Ellipsis changed:', ellipsis);
                        },
                    }}
                >
                    {jobDesc}
                </Paragraph>
            </div>
            <div>
                <Space className='flex justify-end'>
                    <ApplicantSummarizer jobDesc={jobDesc} jobTitle={jobTitle} applicants={comparingApplicant} />
                    <RejectedPool applicantData={allApplicants['rejected']}
                        openRejectPool={true}
                        loading={loading}
                        onDrawerClose={() => fetchApplicants()}
                        updateApplicantStatus={handleMoveBackToShortlist} />
                </Space>
            </div>
            <Stages onChangeEvt={onStageChange} />
            {
                loading ?
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh' }}>
                        <Spin indicator={<LoadingOutlined style={{ fontSize: '2rem' }} spin />} />
                    </div> :
                    <div className='mt-4 mb-4'>
                        <Row gutter={[16, 16]}>
                            {applicants?.length > 0 ?
                                applicants?.map((applicant, idx) => (
                                    <ApplicantCard
                                        setUpForSummary={handleSetupForComparison}
                                        jobDescription={jobDesc}
                                        key={applicant._id}
                                        rowIdx={idx}
                                        applicant={applicant}
                                        handleMoveToNextStage={handleMoveToNextStage}
                                        handleReject={handleReject}
                                        handleSaveForFuture={handleSaveForFuture}
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

