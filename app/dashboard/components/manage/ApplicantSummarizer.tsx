import { apiService } from "@/app/libs/request/apiservice";
import URL from "@/app/utils/constants/url/url";
import { LoadingOutlined, RocketOutlined } from "@ant-design/icons";
import { Button, Col, List, Modal, Space, message } from "antd"
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import { useState } from "react"


interface ComparisonProps {
    viewSummary: boolean;
    hideComparison: () => void;
    compareData: ComparisonData;
    jobTitle: string;
    applicants: Applicant[]
}


const ComparisonView: React.FC<ComparisonProps> = ({ viewSummary, hideComparison, compareData, jobTitle, applicants = [] }) => {
    return (
        <Modal
            width={"100%"}
            title={jobTitle}
            open={viewSummary}
            onOk={hideComparison}
            onCancel={hideComparison}
            centered
            footer={null}
        >
            {compareData && (
                <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                    {Object.entries(compareData).map(([candidate, details], index) => (
                        <Col key={candidate} lg={12}>
                            <div key={index} style={{ flex: '1 1 45%', margin: '1rem 0' }}>
                                <Title key={candidate} level={4}>{applicants[index]?.applicantName}</Title>
                                {Object.entries(details).map(([key, value], idx) => (
                                    <div key={idx}>

                                        {Array.isArray(value) ? (
                                            <div className="mb-4">
                                                <Title level={5}>{key}</Title>
                                                <List
                                                    dataSource={value}
                                                    renderItem={item => <List.Item>{item}</List.Item>}
                                                />
                                            </div>
                                        ) : (
                                            <>
                                                <Space>
                                                    <Title level={5}>{key} : </Title>
                                                    <Paragraph className="mt-2">{value}</Paragraph>
                                                </Space>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </Col>
                    ))}
                </div>
            )}
        </Modal>
    );
};

const ApplicantSummarizer: React.FC<Props> = ({ applicants, jobTitle, jobDesc }) => {
    const [compareStatus, setCompareStatus] = useState<SummaryState>('default')
    const [viewSummary, setViewSummary] = useState(false);
    const [compareData, setCompareData] = useState<any>(null);

    const getComparison = async () => {

        const body = {
            job_desc: jobDesc,
            pdf_urls: [
                applicants[0].resumeUrl,
                applicants[1].resumeUrl
            ]
        }
        try {
            setCompareStatus('loading')
            const response = await apiService.post(URL.api.private.ai.compare, body);
            setCompareData(response)
            message.success("Comparison Ready")
            setCompareStatus('ready')
        } catch (error) {
            message.success("Could not process request at the moment")
            setCompareStatus('error')
        }

    }

    const showComparison = () => {
        setViewSummary(true)
    }

    const hideComparison = () => {
        setViewSummary(false);
    }


    return (
        <>
            {
                <div className="flex items-center space-x-2">

                    <Button type="primary" onClick={showComparison}>View Comparison</Button>

                    <Button
                        disabled={applicants.length !== 2}
                        icon={compareStatus === "loading" ? <LoadingOutlined /> : <RocketOutlined />}
                        type="default"
                        onClick={getComparison}>
                        Compare
                    </Button>

                </div>

            }
            <ComparisonView applicants={applicants} viewSummary={viewSummary} hideComparison={hideComparison} compareData={compareData} jobTitle={jobTitle} />
        </>
    )
}

export default ApplicantSummarizer

interface Props {
    jobTitle: string;
    jobDesc: string;
    applicants: Applicant[]
}

type SummaryState = 'default' | 'ready' | 'error' | 'loading'

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

interface CandidateDetails {
    Strengths: string[];
    Weakness: string[];
    "Compatibility With Job Description": string[];
    "Loyalty Level": string;
    "Match Percentage": string;
}

interface ComparisonData {
    [candidate: string]: CandidateDetails;
}