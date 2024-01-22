'use client';
import { useEffect, useState } from 'react';
import JobListing from './jobListing';
import ResumeUploadForm from './resumeUploader';
import { Row, Col } from 'antd';

interface JobApplicationPageProps {
    params: { slug: string };
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
    const [jobDetail, setJobDetails] = useState<any>(null)
    useEffect(() => {
        const fetchJob = async () => {
            try {
                const { job } = await getServerSideProps(args.params.slug);
                setJobDetails(job)
            } catch (error) {

            }

        }
        fetchJob()
    }, []);
    return (
        <>
            <Row gutter={16}>
                <Col xs={24} md={16} style={{ maxHeight: '95vh', overflowY: 'auto' }}>
                    <JobListing jobContent={jobDetail} />
                </Col>
                <Col xs={24} md={8}>
                    <ResumeUploadForm jobId={args.params.slug} />
                </Col>
            </Row>
        </>
    );
}

