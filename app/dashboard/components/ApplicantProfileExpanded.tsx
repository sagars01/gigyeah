import React, { useState } from 'react';
import { Modal, Row, Col, Button } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, FileTextOutlined } from '@ant-design/icons';
import { apiService } from '../../libs/request/apiservice'

const ApplicantProfileExpand: React.FC<IProps> = ({ applicant, open, onClose, jobDesc }) => {


    const [summaryLoading, setSummaryLoading] = useState(false)
    const [profileSummary, setProfileSummary] = useState(null)
    const [errorProfileSummary, setErrorProfileSummary] = useState<any>(null)

    const getModalWidth = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth < 768) return '100%'; // Mobile devices
        else if (screenWidth < 1024) return '80%'; // Tablets
        return '95%'; // Desktops and larger screens
    };

    const handleReject = () => {

    }

    const handleShortlist = () => {

    }

    const handleSummarize = async (resumeUrl: string) => {
        debugger
        const url = `/ai/summarize`;
        const body = {
            resumeUrl,
            jobDescription: jobDesc
        }
        setSummaryLoading(true)
        setProfileSummary(null)
        setErrorProfileSummary(null)
        try {
            const response: any = await apiService.post(url, body)
            const { summary: { text } } = response
            setProfileSummary(text)
        } catch (error: any) {
            setErrorProfileSummary("Error summarizing profile")
        } finally {
            setSummaryLoading(false)
        }
    }
    return (
        <Modal
            title="Applicant Details"
            open={open}
            onOk={onClose}
            onCancel={onClose}
            width={getModalWidth()}
            centered
        >
            <Row gutter={16} style={{ height: '80vh' }}> {/* Add vertical gutter for better spacing on small screens */}
                <Col xs={24} md={12}>
                    {/* Content scales down on small screens */}
                    <div>
                        <h3>{applicant?.name}</h3>
                        <p>Email: {applicant?.email}</p>
                        <p>Introduction: {applicant?.shortIntro}</p>
                    </div>
                    <div>
                        {
                            summaryLoading && (
                                <>Loading...</>
                            )
                        }
                        {
                            profileSummary && (
                                <>
                                    {
                                        profileSummary
                                    }
                                </>
                            )
                        }
                        {
                            errorProfileSummary && (
                                <>
                                    {
                                        errorProfileSummary
                                    }
                                </>
                            )
                        }
                    </div>
                    <div style={{ position: 'absolute', bottom: 0, left: 0, margin: 8 }}>
                        <Button onClick={handleShortlist} icon={<CheckCircleOutlined />} style={{ marginRight: 8 }}>Shortlist</Button>
                        <Button onClick={handleReject} danger icon={<CloseCircleOutlined />} style={{ marginRight: 8 }}>Reject</Button>
                        <Button onClick={() => handleSummarize(applicant?.resumeUrl as string)} type="primary" icon={<FileTextOutlined />} style={{ marginRight: 8 }}>Summarize</Button>
                    </div>

                </Col>
                <Col xs={24} md={12}>
                    <div style={{ height: '100%' }}> {/* Adjust height for mobile */}
                        <iframe
                            src={applicant?.resumeUrl}
                            style={{ width: '100%', height: '100%', border: 'none' }}
                            title="Resume"
                        ></iframe>
                    </div>
                </Col>
            </Row>
        </Modal>
    );
};

export default ApplicantProfileExpand;

interface IProps {
    applicant: {
        name: string;
        email: string;
        shortIntro: string;
        resumeUrl: string;
    } | null;
    open: boolean;
    onClose: () => void;
    jobDesc: string;
}
