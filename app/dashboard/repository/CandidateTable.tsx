"use client"
import React from 'react';
import { Table, Button, Space } from 'antd';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';

interface Candidate {
    key: string;
    name: string;
    shortBio: string;
    jobRef: string;
}

const candidates: Candidate[] = [
    { key: '1', name: 'John Doe', shortBio: 'Experienced software developer', jobRef: 'REF1234' },
    { key: '2', name: 'Jane Smith', shortBio: 'Project manager with 5 years of experience', jobRef: 'REF5678' },
    { key: '3', name: 'Alice Johnson', shortBio: 'Data analyst in tech industry', jobRef: 'REF9101' },
];

const CandidateTable: React.FC = () => {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Short Bio',
            dataIndex: 'shortBio',
            key: 'shortBio',
        },
        {
            title: 'Job Reference',
            dataIndex: 'jobRef',
            key: 'jobRef',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: undefined, record: Candidate) => (
                <Space size="middle">
                    <Button icon={<EyeOutlined />} onClick={() => viewDetails(record.key)}>View</Button>
                    <Button danger icon={<DeleteOutlined />} onClick={() => deleteCandidate(record.key)}>Delete</Button>
                </Space>
            ),
        },
    ];

    const viewDetails = (key: string) => {
        console.log('Viewing details for:', key);
        // Implement view details functionality or navigation
    };

    const deleteCandidate = (key: string) => {
        console.log('Deleting candidate:', key);
        // Implement delete functionality
    };

    return (
        <Table columns={columns} dataSource={candidates} />
    );
};

export default CandidateTable;
