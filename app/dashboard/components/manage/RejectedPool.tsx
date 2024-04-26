import { Drawer, Table, Button, Space } from "antd";
import { DatabaseOutlined, ExpandOutlined, PlusOutlined, RollbackOutlined } from '@ant-design/icons';
import { useState } from "react";
import ViewExpandedCandidate from "./ViewExpandedCandidate";



const RejectedPool: React.FC<RejectPoolProps> = ({ loading, applicantData = [], updateApplicantStatus, onDrawerClose, openRejectPool }) => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [actionCount, setActionCount] = useState(0);
    const [viewCandidateExpanded, setCandidateViewExpanded] = useState("");

    const handleExpand = (record: Applicant) => {
        setCandidateViewExpanded(record.resumeUrl)
    }
    const columns = [
        {
            title: 'Candidate Name',
            dataIndex: 'applicantName',
            key: 'applicantName',
        },
        {
            title: 'Candidate Short Intro',
            dataIndex: 'shortIntro',
            key: 'shortIntro',
        },
        {
            title: 'Candidate email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record: Applicant) => (
                <>
                    <Space>
                        <Button onClick={() => handleMoveToShortlist(record)} icon={<RollbackOutlined />} />
                        <Button onClick={() => handleExpand(record)} icon={<ExpandOutlined />} />
                    </Space>
                </>
            ),
        },
    ];

    const handleMoveToShortlist = (record: Applicant) => {
        let count = actionCount + 1;
        setActionCount(count)
        updateApplicantStatus(record._id as string, 'rejected', 'shortlisted')
    };


    const handleOnClose = () => {
        setOpenDrawer(false);
        setActionCount(0);
        if (actionCount > 0) onDrawerClose();

    }

    return (
        <>

            <div className='w-100 min-h-5 mt-4 mb-8'>
                <Button className='float-end'
                    danger={true}
                    onClick={() => { setOpenDrawer(true) }}
                    icon={
                        <DatabaseOutlined />
                    }>Rejected Pool</Button>
            </div>
            <Drawer title="Rejected Candidates" placement="right" closable={true} onClose={handleOnClose}
                width={"80%"}
                open={openDrawer}>
                <Table dataSource={applicantData} columns={columns} loading={loading} rowKey="_id" />
            </Drawer>

            <ViewExpandedCandidate
                onCandidateModalClose={(status: boolean) => {
                    setCandidateViewExpanded("")
                }}
                resumeLink={viewCandidateExpanded} visible={!!viewCandidateExpanded}></ViewExpandedCandidate>
        </>
    );
}

export default RejectedPool;

interface RejectPoolProps {
    loading: boolean;
    openRejectPool?: boolean;
    applicantData: Applicant[];
    updateApplicantStatus: (applicantId: string, previousState: 'rejected', newState: 'shortlisted') => void;
    onDrawerClose: () => void;
}

interface Applicant {
    _id: string;
    jobId: string;
    ownerId: string;
    email: string;
    name: string;
    applicantName: string;
    shortIntro: string;
    resumeUrl: string;
    status: string;
}
