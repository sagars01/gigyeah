'use client';
import { useEffect, useState } from 'react';
import JobListing from './jobListing';
import ResumeUploadForm from './resumeUploader';
import { Row, Col } from 'antd';

interface JobApplicationPageProps {
    params: { jobId: string };
    job: any; // Replace 'any' with a more specific type if available
    error?: string;
}

async function getServerSideProps(jobId: string) {
    try {
        const res = await fetch(`/api/job/fetch?jobId=${jobId}`); // Replace with your API endpoint
        if (!res.ok) {
            throw new Error(`Failed to fetch job, received status ${res.status}`);
        }
        const job = await res.json();
        return { job, error: null };
    } catch (error: any) {
        return { job: null, error: error.message };
    }
}

export default function JobApplicationPage(args: JobApplicationPageProps) {
    const [jobDetail, setJobDetails] = useState<any>(null);
    const [jobFetchError, setJobFetchError] = useState<boolean>(false);

    useEffect(() => {
        const fetchJob = async () => {
            const { job, error } = await getServerSideProps(args.params.jobId);
            if (!error) setJobDetails(job)
            else {
                setJobFetchError(true)
            }
        }
        fetchJob()
    }, []);
    return (
        <>
            <Row gutter={16}>
                {
                    jobFetchError ? (
                        <>
                            <Col xs={24}>
                                <JobListing jobContent={jobDetail} error={jobFetchError} />
                            </Col>
                        </>
                    ) : (
                        <>
                            <Col xs={24} md={16} style={{ maxHeight: '95vh', overflowY: 'auto' }}>
                                <JobListing jobContent={jobDetail} error={jobFetchError} />
                            </Col>
                            <Col xs={24} md={8}>
                                <ResumeUploadForm jobId={args.params.jobId} isLoading={!jobDetail} />
                            </Col>
                        </>
                    )
                }
            </Row>
        </>
    );
}

