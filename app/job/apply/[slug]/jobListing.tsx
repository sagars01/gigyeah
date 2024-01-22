import React, { useState } from 'react';
import { Card, Typography, List } from 'antd';
const { Title, Text } = Typography;

const JobListing: React.FC<IJobListingProps> = ({ jobContent }) => {
    return (
        <>
            <Card bordered={false} loading={!jobContent}>
                <Title level={2}>Job Listing</Title>
                <Title level={3}>{jobContent?.company.name}</Title>
                <Text strong>Title:</Text> <Text>{jobContent?.title}</Text>
                <br />
                <Text strong>Company Description:</Text> <Text>{jobContent?.company.description}</Text>
                <br />
                <Text strong>Job Description:</Text> <Text>{jobContent?.description}</Text>
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
    jobContent: JobPosting;
}

export default JobListing;
