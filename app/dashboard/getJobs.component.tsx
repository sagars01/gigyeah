// JobsDisplayComponent.tsx
import React, { useEffect, useState, useCallback } from 'react';
import { Card, message, Dropdown, Menu, Button, Empty, Spin } from 'antd';
import { DeleteOutlined, EyeOutlined, MoreOutlined, SettingOutlined } from '@ant-design/icons';
import { apiService } from '@/utils/request/apiservice';
import styles from "./styles/dashboard.module.css"

interface Job {
    _id: string;
    title: string;
    description: string;
}

interface JobsDisplayComponentProps {
    shouldFetchJobs: boolean;
    jobId?: string;
}

const GetJobsComponent: React.FC<JobsDisplayComponentProps> = ({ shouldFetchJobs, jobId }) => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const fetchJobs = async () => {
        try {
            setLoading(true)
            const url = jobId ? `/job/fetch?jobId=${jobId}` : `/job/fetch`;
            const response = await apiService.get<Job | Job[]>(url);
            const job = response;
            let updatedJob: any = []
            if (Array.isArray(job)) {
                updatedJob = [...jobs, ...job]
            } else {
                updatedJob = [...jobs, job]
            }
            setJobs(updatedJob);
        } catch (error) {
            message.error('Failed to fetch jobs');
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchJobs();
    }, [shouldFetchJobs, jobId]);

    const handleMenuClick = useCallback((jobId: string, action: string) => {
        console.log(`Action: ${action} on jobId: ${jobId}`);

    }, []);

    const jobActionsMenu = (jobId: string) => (
        <Menu onClick={({ key }) => handleMenuClick(jobId, key)}>
            <Menu.Item key="disable"> Delete <DeleteOutlined /></Menu.Item>
        </Menu>
    );

    const JobListingCard = () => {
        return (
            <>
                {


                    jobs.length > 0 ? jobs.map((job) => (
                        <Card
                            key={job._id}
                            title={job.title}
                            style={{ marginBottom: 16 }}
                            extra={
                                <Dropdown overlay={jobActionsMenu(job._id)} trigger={['click']}>
                                    <a onClick={(e) => e.preventDefault()}>
                                        <MoreOutlined />
                                    </a>
                                </Dropdown>
                            }
                        >
                            <p>{job.description}</p>
                            <div className={styles.buttonSeperator}>
                                <Button type='primary' icon={<EyeOutlined />}>
                                    <a href={`/job/apply/${job._id}`}>View Job</a>
                                </Button>
                                <Button type='primary' icon={<SettingOutlined />}>
                                    <a href={`/job/applicants/${job._id}`}>Manage Applications</a>
                                </Button>
                            </div>
                        </Card>
                    )) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />

                }
            </>
        )
    }

    return (
        <>
            {
                !loading ? <JobListingCard /> : <div className='absolute-middle'><Spin size='large' /></div>
            }
            {
                !loading && error ? <Empty description={"Oops!"} /> : <></>
            }
        </>
    );
};

export default GetJobsComponent;
