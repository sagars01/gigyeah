'use client';
import { useEffect, useState } from 'react';
import JobListing from './jobListing';
import ResumeUploadForm from './resumeUploader';
import { Row, Col } from 'antd';


async function getJobInformation(jobId: string) {
    try {
        const res = await fetch(`/api/job/public?jobId=${jobId}`);
        if (!res.ok) {
            throw new Error(`Failed to fetch job, received status ${res.status}`);
        }
        const job = await res.json();
        return { job, error: null };
    } catch (error: any) {
        return { job: null, error: error.message };
    }
}

export default function JobApplicationPage({ params: { jobId = "" } }) {
    const [jobDetail, setJobDetails] = useState<any>(null);
    const [jobFetchError, setJobFetchError] = useState<boolean>(false);

    useEffect(() => {
        const fetchJob = async () => {
            const { job, error } = await getJobInformation(jobId);
            if (!error) setJobDetails(job)
            else {
                setJobFetchError(true)
            }
        }
        fetchJob()
    }, [jobId]);
    return (
        <>
            <Row gutter={16}>
                {jobFetchError ? (
                    <Col span={24}>
                        <JobListing jobContent={jobDetail} error={jobFetchError} />
                    </Col>
                ) : (
                    <>
                        <Col
                            xs={24}
                            md={jobDetail?.status === 'expired' ? 12 : 16}
                            lg={jobDetail?.status === 'expired' ? 12 : 16}
                            offset={jobDetail?.status === 'expired' ? 6 : 0}
                            style={{ maxHeight: '95vh', overflowY: 'auto' }}
                        >
                            <JobListing jobContent={jobDetail} error={jobFetchError} />
                        </Col>
                        {jobDetail?.status !== 'expired' && (
                            <Col xs={24} md={8} lg={8}>
                                <ResumeUploadForm jobId={jobId} isLoading={!jobDetail} />
                            </Col>
                        )}
                    </>
                )}
            </Row>
        </>
    );
}

