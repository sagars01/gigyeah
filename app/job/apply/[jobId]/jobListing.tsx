import React, { useState } from 'react';
import { Card, Typography, List, Empty } from 'antd';
const { Title, Text } = Typography;

const JobListing: React.FC<IJobListingProps> = ({ jobContent, error }) => {
    const ListingCard = () => (
        <>
            <Card bordered={false} loading={!jobContent}>
                <Title level={2}>Job Listing</Title>
                <Title level={3}>{jobContent?.company.name}</Title>
                <Text strong>Title:</Text> <Text>{jobContent?.title}</Text>
                <br />
                <Text strong>Company Description:</Text> <Text>{jobContent?.company.description}</Text>
                <br />
                <Text strong>Job Description:</Text>
                <div>
                    <div dangerouslySetInnerHTML={{ __html: jobContent?.description || '' }}></div>
                </div>
                <br />
                <Text strong>Requirements:</Text>
                <List
                    dataSource={jobContent?.requirements}
                    renderItem={item => (
                        <List.Item>{item}</List.Item>
                    )}
                />
            </Card>
        </>
    );

    const ErrorCard = () => (
        <>
            <Card>
                <Empty description="Couldn't find the specified job" />
            </Card>
        </>
    )
    return (
        <>
            {
                error ? <ErrorCard /> : <ListingCard />
            }
        </>
    );
}

interface JobPosting {
    company: {
        name: string;
        description: string;
    };
    _id: string;
    createdBy: string;
    title: string;
    description: string;
    requirements: string[];
    postedAt: string;
}

interface IJobListingProps {
    jobContent?: JobPosting;
    error?: boolean;
}

export default JobListing;
