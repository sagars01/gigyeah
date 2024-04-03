'use client';
import { useEffect, useState } from 'react';
import JobListing from './jobListing';
import ResumeUploadForm from './resumeUploader';
import { Row, Col } from 'antd';
import Title from 'antd/es/typography/Title';


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
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchJob = async () => {
            setLoading(true)
            const { job, error } = await getJobInformation(jobId);
            if (!error) setJobDetails(job)
            else {
                setJobFetchError(true)
            }
            setLoading(false)
        }
        fetchJob()
    }, [jobId]);
    return (
        <>
            <Col lg={{
                span: 16,
                offset: 4
            }}>
                {!loading && !jobFetchError && <Title style={{ textAlign: 'center', margin: '0.5rem 0' }}>{jobDetail?.title} at {jobDetail?.createdBy.company.name}</Title>}
            </Col>
            <Row gutter={[8, 8]}>
                {jobFetchError ? (
                    <Col span={24}>
                        <JobListing jobContent={jobDetail} error={jobFetchError} />
                    </Col>
                ) : (
                    <>

                        <Col
                            xs={24}
                            md={{ span: 8, offset: 4 }}
                            lg={{ span: 8, offset: 4 }}
                        >
                            <JobListing jobContent={jobDetail} error={jobFetchError} />
                        </Col>
                        {jobDetail?.status !== 'expired' && (
                            <Col xs={24}
                                md={{ span: 8 }}
                                lg={{ span: 8 }}
                            >
                                <ResumeUploadForm jobId={jobId} isLoading={!jobDetail} />
                            </Col>
                        )}
                    </>
                )}
            </Row>
        </>
    );
}

