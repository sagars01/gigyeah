import { Button, Col, List, Modal, Space } from "antd"
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import { useState } from "react"

const data: ComparisonData = {
    "Candidate1": {
        "Strengths": [
            "Extensive experience in cybersecurity and network security",
            "Strong technical skills in Java, Spring, Hibernate, SQL, AWS, and Azure",
            "Proven track record in identifying and investigating threats and vulnerabilities"
        ],
        "Weakness": [
            "Limited experience in cloud technologies",
            "No experience in software architecture and design"
        ],
        "Compatibility With Job Description": [
            "Strong match in cybersecurity and network security skills",
            "Limited match in cloud technologies and software architecture"
        ],
        "Loyalty Level": "High (average tenure of 7 years in previous companies)",
        "Match Percentage": "70%"
    },
    "Candidate2": {
        "Strengths": [
            "Extensive experience in software architecture and design",
            "Strong technical skills in Python, JavaScript, React, AWS/GCP, Kubernetes, MongoDB, and PostgreSQL",
            "Proven track record in leading and architecting large-scale projects"
        ],
        "Weakness": [
            "Limited experience in cybersecurity and network security",
            "No experience in Java, Spring, Hibernate, and SQL"
        ],
        "Compatibility With Job Description": [
            "Strong match in software architecture and design and cloud technologies",
            "Limited match in cybersecurity and network security skills"
        ],
        "Loyalty Level": "High (average tenure of 4 years in previous companies)",
        "Match Percentage": "80%"
    }
}


interface ComparisonProps {
    viewSummary: boolean;
    hideComparison: () => void;
    compareData: ComparisonData;
    jobTitle: string
}


const ComparisonView: React.FC<ComparisonProps> = ({ viewSummary, hideComparison, compareData, jobTitle }) => {
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
                        <Col lg={12}>
                            <div key={index} style={{ flex: '1 1 45%', margin: '10px' }}>
                                <Title level={3}>{candidate}</Title>
                                {Object.entries(details).map(([key, value], idx) => (
                                    <div key={idx}>

                                        {Array.isArray(value) ? (
                                            <>
                                                <Title level={5}>{key}</Title>
                                                <List
                                                    dataSource={value}
                                                    renderItem={item => <List.Item>{item}</List.Item>}
                                                />
                                            </>
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

const ApplicantSummarizer: React.FC<Props> = ({ applicants, jobTitle }) => {
    const [compareStatus, setCompareStatus] = useState<SummaryState>('default')
    const [viewSummary, setViewSummary] = useState(false);
    const [compareData, setCompareData] = useState<any>(data);

    const showComparison = () => {
        setViewSummary(true);
    }

    const hideComparison = () => {
        setViewSummary(false);
    }


    return (
        <>
            {
                <div>
                    <Button type="default" onClick={showComparison}>
                        Compare
                    </Button>
                </div>
            }

            {compareStatus === "ready" && (
                <Button type="primary" onClick={showComparison}>View Summary</Button>
            )}
            <ComparisonView viewSummary={viewSummary} hideComparison={hideComparison} compareData={data} jobTitle={jobTitle} />
        </>
    )
}

export default ApplicantSummarizer

interface Props {
    jobTitle: string;
    applicants: Applicant[]
}

type SummaryState = 'default' | 'ready' | 'error'

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