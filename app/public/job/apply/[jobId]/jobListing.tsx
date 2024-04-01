import React, { useState } from 'react';
import { Card, Typography, List, Empty, Row } from 'antd';
const { Title, Text } = Typography;

const JobListing: React.FC<IJobListingProps> = ({ jobContent, error }) => {

    const ListingCard = () => (
        <>

            <Card loading={!jobContent}>
                <Title level={2}>Job Listing</Title>
                <Title level={3}>{jobContent?.title}</Title>
                <Text strong>Hired By: </Text> <Text>{jobContent?.createdBy.name}</Text>
                <br />
                <Text strong>Company Name:</Text> <Text>{jobContent?.createdBy.company.name}</Text>
                <br />
                <Text strong>Company Description:</Text> <Text>{jobContent?.createdBy.company.description}</Text>
                <br />
                <Text strong>Job Description:</Text>
                <div>
                    <div dangerouslySetInnerHTML={{ __html: jobContent?.description || '' }}></div>
                </div>
                <br />
                <Text strong>Pay Range: {jobContent?.payRange.currency} {jobContent?.payRange.min} - {jobContent?.payRange.max}</Text>
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
    createdBy: {
        name: string;
        company: {
            name: string;
            description: string;
        }
    };
    title: string;
    description: string;
    requirements: string[];
    postedAt: string;
    payRange: {
        currency: string,
        min: number
        max: number
    };
    status: 'active' | 'expired'
}

interface IJobListingProps {
    jobContent?: JobPosting;
    error?: boolean;
}

export default JobListing;
