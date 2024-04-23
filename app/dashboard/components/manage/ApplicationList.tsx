"use client"
import React, { useState, useEffect, useCallback } from 'react';
import { Steps, Card, Spin, Button, message, List } from 'antd';
import { ArrowRightOutlined, DownOutlined, CloseOutlined } from '@ant-design/icons';
import { apiService } from '@/app/libs/request/apiservice';

const { Step } = Steps;

enum CandidateInterviewJourneyStatus {
    applied = 'applied',
    shortlisted = 'shortlisted',
    interview = 'interview',
    rejected = 'rejected',
    hired = 'hired'
}

const statusTitles = [
    'Applied',
    'Shortlisted',
    'Interview',
    'Rejected',
    'Hired'
];

const nextStatus: any = {
    applied: 'shortlisted',
    shortlisted: 'interview',
    interview: 'hired'
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
    status: keyof typeof CandidateInterviewJourneyStatus;
    applicationsReceived: number;
    summary?: string;
}

const ApplicantManagement: React.FC<{ jobId: string }> = ({ jobId }) => {
    const [applicants, setApplicants] = useState<Applicant[]>([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchApplicants = useCallback(async () => {
        try {
            const response = await apiService.get<{ applicants: Applicant[] }>(`/application/fetch?jobId=${jobId}`);
            setApplicants(response.applicants || []);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(true);
            message.error('Failed to fetch applicants');
        }
    }, [jobId]);

    useEffect(() => {
        fetchApplicants();
    }, [jobId, fetchApplicants]);

    const handleMoveToNextStep = (applicantId: string, nextStatus: CandidateInterviewJourneyStatus) => {
        // API call to update status
        console.log('Moving to next step:', applicantId, nextStatus);
    };

    const handleRejectApplicant = (applicantId: string) => {
        // API call to set status to rejected
        console.log('Rejecting applicant:', applicantId);
    };

    const handleExpandProfile = (applicantId: string) => {
        // Expand to show more details or navigate to detailed profile page
        console.log('Expanding profile:', applicantId);
    };

    const handleSummarizeResume = (applicantId: string) => {
        // Summarize resume functionality
        console.log('Summarizing resume:', applicantId);
    };

    const filteredApplicants = applicants.filter(applicant => applicant.status === statusTitles[currentStep].toLowerCase());

    if (loading) {
        return <Spin size="large" className="m-auto mt-20" />;
    }

    if (error) {
        return <p className="text-center">Failed to load applicants. Please try again later.</p>;
    }

    return (
        <>
            <Steps current={currentStep} onChange={setCurrentStep} className="mb-5">
                {statusTitles.map((title, index) => (
                    <Step key={title} title={title} />
                ))}
            </Steps>
            <List
                grid={{ gutter: 1, column: 3 }}
                dataSource={filteredApplicants}
                renderItem={applicant => (
                    <List.Item key={applicant._id}>
                        <Card title={applicant.applicantName} className="w-full">
                            <p>Email: {applicant.email}</p>
                            <p>Short Intro: {applicant.shortIntro}</p>
                            <Button onClick={() => handleExpandProfile(applicant._id)} icon={<DownOutlined />} className="mr-2">Expand</Button>
                            <Button onClick={() => handleSummarizeResume(applicant._id)} className="mr-2">Summarize</Button>
                            {applicant.status !== 'hired' && (
                                <Button onClick={() => handleMoveToNextStep(applicant._id, nextStatus[applicant.status])} className="mr-2">Next Step</Button>
                            )}
                            <Button onClick={() => handleRejectApplicant(applicant._id)} icon={<CloseOutlined />} className="text-red-500 hover:text-red-700">Reject</Button>
                        </Card>
                    </List.Item>
                )}
            />

        </>
    );
};

export default ApplicantManagement;
