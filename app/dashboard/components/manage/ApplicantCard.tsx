import React, { useState } from 'react';
import { Card, Col, Button, Tooltip, Tag, Typography, Input, message } from 'antd';
import { ArrowRightOutlined, CloseOutlined, FileOutlined, SaveOutlined, EditOutlined, CheckOutlined } from '@ant-design/icons';
import { apiService } from '@/app/libs/request/apiservice';
import SummaryModal from './SummaryModal';
import URL from '@/app/utils/constants/url/url';

interface Applicant {
    skills?: string[];
    _id: string;
    jobId: string;
    ownerId: string;
    email: string;
    name: string;
    applicantName: string;
    shortIntro: string;
    resumeUrl: string;
    status: string;
    notes?: string;
}

interface ApplicantCardProps {
    applicant: Applicant;
    handleMoveToNextStage: (applicant: Applicant) => void;
    handleReject: (applicant: Applicant) => void;
    handleResume: (resumeUrl: string) => void;
    handleSaveForFuture: (applicant: Applicant) => void;
    handleUpdateNotes: (id: string, notes: string) => void;
}

const ApplicantCard: React.FC<ApplicantCardProps> = ({
    applicant,
    handleMoveToNextStage,
    handleReject,
    handleResume,
    handleSaveForFuture,
    handleUpdateNotes
}) => {
    const [editMode, setEditMode] = useState(false);
    const [notes, setNotes] = useState(applicant.notes || '');

    const [summary, setSummary] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [summarizing, setSummarizing] = useState(false);

    const toggleEditMode = () => {
        setEditMode(!editMode);
        if (editMode && notes !== applicant.notes) {
            handleUpdateNotes(applicant._id, notes);
        }
    };
    const handleSummarize = async (resumeUrl: string) => {

        const body = {
            resumeUrl
        }
        try {

            const response: any = await apiService.post(URL.api.private.ai.summarize, body)
            const { summary: { text } } = response;
            return text

        } catch (error: any) {
            throw new Error("Could not process request")
        }
    }

    const summarizeApplicant = async () => {
        setSummarizing(true);
        try {
            const summaryText = "await handleSummarize(applicant.resumeUrl)";
            setSummary(summaryText);
            message.success('Summary is ready.');
        } catch (error) {
            message.error('Failed to summarize the resume.');
        } finally {
            setSummarizing(false);
        }
    };

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };


    const handleNotesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNotes(e.target.value);
    };

    return (
        <><SummaryModal visible={modalVisible} summary={summary} onClose={toggleModal} />
            <Col lg={8} md={12} xs={24}>
                <Card
                    title={applicant.name}
                    actions={[
                        <div key={1}>
                            {
                                !summary ? <Button className='float-right right-5' type="primary" onClick={summarizeApplicant} disabled={summarizing}>
                                    {summary ? 'View Summary' : 'Summarize'}
                                </Button> : <Button
                                    className='float-right right-5' type="primary"
                                    onClick={() => toggleModal()}>
                                    View Summary
                                </Button>
                            }

                        </div>

                    ]}
                    extra={
                        <div className="flex space-x-2">
                            {
                                applicant.status !== "hired" &&
                                <Tooltip title="Move to Next Stage">
                                    <Button shape="circle" icon={<ArrowRightOutlined />} onClick={() => handleMoveToNextStage(applicant)} />
                                </Tooltip>
                            }
                            {
                                applicant.status !== 'hired' &&
                                <Tooltip title="Reject">
                                    <Button shape="circle" icon={<CloseOutlined />} onClick={() => handleReject(applicant)} danger />
                                </Tooltip>
                            }

                            <Tooltip title="Open Resume">
                                <Button shape="circle" icon={<FileOutlined />} onClick={() => handleResume(applicant.resumeUrl)} />
                            </Tooltip>
                            <Tooltip title="Save for Future Roles">
                                <Button shape="circle" icon={<SaveOutlined />} onClick={() => handleSaveForFuture(applicant)} />
                            </Tooltip>
                        </div>
                    }
                >
                    <Typography.Title level={4}>{applicant.applicantName}</Typography.Title>
                    <p>{applicant.shortIntro}</p>
                    {applicant.skills && (
                        <div className="flex flex-wrap gap-2">
                            {applicant.skills.map((skill) => <Tag color="blue" key={skill}>{skill}</Tag>)}
                        </div>
                    )}
                    <div className="mt-2">
                        {editMode ? (
                            <Input
                                value={notes}
                                onChange={handleNotesChange}
                                suffix={
                                    <Tooltip title="Save">
                                        <CheckOutlined onClick={toggleEditMode} />
                                    </Tooltip>
                                }
                            />
                        ) : (
                            <Typography.Text onClick={toggleEditMode}>
                                {notes || 'Add notes...'}
                                <EditOutlined className="ml-2" />
                            </Typography.Text>
                        )}
                    </div>
                </Card>
            </Col>
        </>
    );
};

export default ApplicantCard;
