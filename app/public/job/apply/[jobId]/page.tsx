'use server'
import JobListing from './jobListing';
import ResumeUploadForm from './resumeUploader';
import Title from 'antd/es/typography/Title';
import PublicHeader from '@/app/libs/components/reusables/header.public';
import PublicJobsController from '@/app/api/job/public/controllers/publicjob.controller';
import Col from 'antd/es/col';
import Row from 'antd/es/row';


async function getJobInformation(jobId: string) {
    try {
        const response = await PublicJobsController.getJobDetails(jobId);
        return {
            job: { ...response },
            error: null
        }
    } catch (error: any) {
        return { job: null, error: error.message };
    }
}

export default async function JobApplicationPage({ params: { jobId = "" } }) {

    const { job: jobDetail, error }: any = await getJobInformation(jobId);

    return (
        <>
            <PublicHeader />
            <Col lg={{
                span: 16,
                offset: 4
            }}>
                {!error && <Title style={{ margin: '2rem 0' }}>{jobDetail?.title}</Title>}
            </Col>
            <Row gutter={[8, 8]}>
                {error ? (
                    <Col span={24}>
                        <JobListing jobContent={jobDetail} error={error} />
                    </Col>
                ) : (
                    <>

                        <Col
                            xs={24}
                            md={{ span: 8, offset: 4 }}
                            lg={{ span: 8, offset: 4 }}
                        >
                            <JobListing jobContent={jobDetail} error={error} />
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

