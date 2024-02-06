// JobsDisplayComponent.tsx
import React, { useEffect, useState } from 'react';
import { Card, message } from 'antd';
import { apiService } from '@/utils/request/apiservice';

interface Job {
    _id: string;
    title: string;
    description: string;
}

interface JobsDisplayComponentProps {
    shouldFetchJobs: boolean;
    jobId?: string;
}

// TODO: Make this component to fetch all jobs as well as specialized job using the jobId
// To achieve this edit the exisiting API to return all jobs for the specific user incase there's is no jobId

const GetJobsComponent: React.FC<JobsDisplayComponentProps> = ({ shouldFetchJobs, jobId }) => {
    const [jobs, setJobs] = useState<Job[]>([]);


    useEffect(() => {
        const fetchJobs = async () => {
            try {
                if (shouldFetchJobs) {
                    const response = await apiService.get<Job>(`/job/fetch?jobId=${jobId}`);
                    const job = response;
                    const updatedJob: any = [...jobs, job]
                    setJobs(updatedJob);
                }
            } catch (error) {
                message.error('Failed to fetch jobs');
            }
        };

        fetchJobs();
    }, [shouldFetchJobs]);

    return (
        <>
            {jobs.map((job) => (
                <Card key={job._id} title={job.title} style={{ marginBottom: 16 }}>
                    <p>{job.description}</p>
                    {/* Use job._id as part of the link if needed */}
                    <a href={`/jobs/${job._id}`}>View Job</a>
                </Card>
            ))}
        </>
    );
};

export default GetJobsComponent;
