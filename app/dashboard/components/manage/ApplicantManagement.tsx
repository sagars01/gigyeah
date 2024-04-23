"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { Card, Spin, Button, message, Row, Col, Empty } from 'antd';
import { ArrowRightOutlined, DownOutlined, CloseOutlined } from '@ant-design/icons';
import { apiService } from '@/app/libs/request/apiservice';
import Stages from './Stages';
import CandidateApplicantCard from './CandidateCard';


const nextStatus = {
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
    status: keyof typeof nextStatus;
}

const ApplicantManagement: React.FC<{ jobId: string, jobDesc: string }> = ({ jobId, jobDesc }) => {
    const [applicants, setApplicants] = useState<Applicant[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [allApplicants, setAllApplicants] = useState<any>({});

    const fetchApplicants = useCallback(async () => {
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
    }, [jobId]);

    useEffect(() => {
        fetchApplicants();
    }, [jobId, fetchApplicants]);


    const onStageChange = (stageName: string) => {
        let applicants: any = [];
        if (allApplicants[stageName]) {
            applicants = allApplicants[stageName]
        }
        setApplicants(applicants);
    }

    return (
        <>
            <Stages onChangeEvt={onStageChange} />
            {
                applicants.length ? (
                    <CandidateApplicantCard applicants={applicants} jobDesc={jobDesc} />
                ) : (
                    <div className='mt-4'>
                        <Empty description="No Candidates here" />
                    </div>
                )
            }

        </>

    );
};

export default ApplicantManagement;

