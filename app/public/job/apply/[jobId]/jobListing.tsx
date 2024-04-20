"use server"
import React, { ReactNode } from 'react';
import { Card, Empty, Space } from 'antd';
import Text from 'antd/es/typography/Text';
import Link from 'next/link';
import URL from '@/app/utils/constants/url/url';
import List from '../../../../libs/components/reusables/List';



const JobListing: React.FC<IJobListingProps> = ({ jobContent, error }) => {

    const spaceStyle = {
        margin: '0.5rem 0',
        display: 'block',
    };
    const publicProfile = URL.user.public;

    const ListingCard = () => (
        <>
            <Card loading={!jobContent}>

                <div style={spaceStyle}>
                    <Space>
                        <Text strong>Hired By:</Text>
                        <Text>
                            <Link href={`${publicProfile}/${jobContent?.createdBy.id}`}>{jobContent?.createdBy.name}</Link>
                        </Text>
                    </Space>
                </div>

                <div style={spaceStyle}>
                    <Space>
                        <Text strong>Company Name:</Text>
                        <Text>{jobContent?.createdBy.company.name}</Text>
                    </Space>
                </div>

                <div style={spaceStyle}>
                    <Space>
                        <Text strong>Company Description:</Text>
                        <Text>{jobContent?.createdBy.company.description}</Text>
                    </Space>
                </div>

                <div style={spaceStyle}>

                    <Text strong>Job Description:</Text>
                    <div>
                        <div dangerouslySetInnerHTML={{ __html: jobContent?.description || '' }}></div>
                    </div>

                </div>

                <div style={spaceStyle}>
                    <Space>
                        <Text strong>Pay Range:</Text>
                        <Text>{jobContent?.payRange.currency} {jobContent?.payRange.min} - {jobContent?.payRange.max}</Text>
                    </Space>
                </div>

                <div style={spaceStyle}>
                    <Space>
                        <Text strong>Requirements:</Text>
                    </Space>
                </div>
                <List items={jobContent?.requirements}>

                </List>

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
        id: string;
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
