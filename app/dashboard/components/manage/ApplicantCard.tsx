import React, { useState } from 'react';
import { Card, Col, Button, Tooltip, Tag, Typography, Input, message, Modal, Checkbox, Space } from 'antd';
import { ArrowRightOutlined, CloseOutlined, FileOutlined, SaveOutlined, EditOutlined, CheckOutlined, InfoCircleFilled, InfoCircleOutlined, RocketOutlined } from '@ant-design/icons';
import { apiService } from '@/app/libs/request/apiservice';
import SummaryModal from './SummaryModal';
import URL from '@/app/utils/constants/url/url';
import Paragraph from 'antd/es/typography/Paragraph';
import TextArea from 'antd/es/input/TextArea';
import ViewResumeDetails from './ViewResumeDetails';
import { Applicant } from './ApplicantManagement';


interface ApplicantCardProps {
    applicant: Applicant;
    rowIdx: number;
    handleMoveToNextStage: (applicant: Applicant) => void;
    handleReject: (applicant: Applicant) => void;
    handleSaveForFuture: (applicant: Applicant) => void;
    jobDescription: string;
    setUpForSummary: (rowIdx: number) => void
}

const ApplicantCard: React.FC<ApplicantCardProps> = ({
    applicant,
    handleMoveToNextStage,
    handleReject,
    handleSaveForFuture,
    jobDescription,
    setUpForSummary,
    rowIdx

}) => {
    const [editMode, setEditMode] = useState(false);
    const [notes, setNotes] = useState(applicant.notes || '');

    const [summary, setSummary] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [summarizing, setSummarizing] = useState(false);

    const [viewResume, setViewResume] = useState<any>(null)

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };
    const handleSummarize = async (resumeUrl: string) => {
        const body = {
            resumeUrl,
            jobDescription
        }
        try {

            const response: any = await apiService.post(URL.api.private.ai.summarize, body)
            return response

        } catch (error: any) {
            throw new Error("Could not process request")
        }
    }

    const summarizeApplicant = async () => {
        setSummarizing(true);
        try {
            const summaryText = await handleSummarize(applicant.resumeUrl);
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

    const handleResume = (resumeUrl: string) => {
        setViewResume(resumeUrl)
    }

    const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNotes(e.target.value);
    };
    const [saving, setSavingNotes] = useState(false);
    const handleSaveNotes = async () => {
        try {
            setSavingNotes(true)
            await apiService.post(URL.api.private.applicant.update + `?applicantId=${applicant._id}`, {
                notes
            })

        } catch (error) {
            message.error("Could not save notes");
        } finally {
            setSavingNotes(false)
            toggleEditMode();
        }
    }


    const CandidateCard = () => {
        const handleCheckCandidateCardForComparison = () => {
            setUpForSummary(rowIdx)
        }


        return (
            <Card
                title={<>
                    <Space>
                        <Checkbox
                            id={applicant._id}
                            key={applicant._id}
                            onChange={handleCheckCandidateCardForComparison}
                            checked={applicant.checkedForSummary}
                        />
                        <Tooltip className='ml-1' title="Select to compare">
                            <InfoCircleOutlined />
                        </Tooltip>
                    </Space>
                </>}
                actions={[
                    <div key={1}>
                        {
                            !summary ? <Button className='float-right right-5' type="primary" onClick={summarizeApplicant}
                                icon={<RocketOutlined />}
                                disabled={summarizing}>
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
                <hr className='mt-4' />
                <div className="mt-4">

                    {editMode ? (
                        <div className='flex space-x-2'>
                            <TextArea
                                disabled={saving}
                                value={notes}
                                rows={2}
                                onChange={handleNotesChange}
                            />
                            <Button onClick={handleSaveNotes} className='mt-2 float-end top-3' type='default' icon={<SaveOutlined />}></Button>
                        </div>
                    ) : (
                        <Paragraph>
                            <Typography.Text onClick={toggleEditMode}>
                                {notes || 'Add notes...'}
                                <EditOutlined className="ml-2" />
                            </Typography.Text>
                        </Paragraph>
                    )}
                </div>
            </Card>
        )
    }

    return (
        <>
            <SummaryModal visible={modalVisible} summary={summary} onClose={toggleModal} />
            <ViewResumeDetails viewResume={viewResume} onCloseModal={() => setViewResume(null)} />
            <Col lg={8} md={12} xs={24}>
                <CandidateCard />
            </Col>
        </>
    );
};

export default ApplicantCard;
