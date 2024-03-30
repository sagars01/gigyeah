import React, { useState } from 'react';
import { Modal, Row, Col, Button, Alert, Skeleton } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, FileTextOutlined } from '@ant-design/icons';
import { apiService } from '../../libs/request/apiservice'
import Styles from '../styles/applications.module.css';

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
            footer={false}
        >
            <Row gutter={16}> {/* Add vertical gutter for better spacing on small screens */}
                <Col xs={24} md={12}>
                    <div>
                        <h3>{applicant?.name}</h3>
                        <p>Email: {applicant?.email}</p>
                        <p>Introduction: {applicant?.shortIntro}</p>
                    </div>
                    <div className={Styles.profileSummarySpace}>
                        {
                            summaryLoading && (
                                <>
                                    <Skeleton />
                                </>
                            )
                        }
                        {
                            profileSummary && (
                                <>
                                    <div>
                                        <div dangerouslySetInnerHTML={{ __html: profileSummary }} />
                                    </div>
                                </>
                            )
                        }
                        {
                            errorProfileSummary && (
                                <>
                                    {
                                        <Alert
                                            message={"Its not you, it me. I am an AI sometimes I fail"}
                                            description={errorProfileSummary}
                                            type="error"
                                        />
                                    }
                                </>
                            )
                        }
                    </div>
                    <div style={{ marginTop: '1rem' }}>
                        <Button onClick={handleShortlist} icon={<CheckCircleOutlined />} style={{ marginRight: 8 }}>Shortlist</Button>
                        <Button onClick={handleReject} danger icon={<CloseCircleOutlined />} style={{ marginRight: 8 }}>Reject</Button>
                        <Button loading={summaryLoading}
                            onClick={() => handleSummarize(applicant?.resumeUrl as string)} type="primary" icon={<FileTextOutlined />} style={{ marginRight: 8 }}>Summarize</Button>
                    </div>

                </Col>
                <Col xs={24} md={12}>
                    <div className={Styles.resumeIframeWrapper}> {/* Adjust height for mobile */}
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
