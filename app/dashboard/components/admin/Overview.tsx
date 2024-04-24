import { Row, Col } from "antd"
import { OverviewCardProps, OverviewCards } from "./OverviewCards"
import { RiseOutlined, UserOutlined } from "@ant-design/icons"


const OverviewSection: React.FC<any> = ({ openJobs, closedJobs }) => {
    const overviewItems: OverviewCardProps[] = [
        {
            key: 'openJobs',
            title: openJobs.length || 0,
            description: openJobs.length === 1 ? "Open Job" : "Open Jobs",
            status: 'enabled'
        },
        {
            key: 'closedJobs',
            title: closedJobs.length || 0,
            description: closedJobs.length === 1 ? 'Closed Job' : 'Closed Jobs',
            status: 'enabled'
        },
        {
            key: 'candidateRepository',
            title: <><UserOutlined style={{ fontSize: '1.5rem' }} /></>,
            description: "Candidate Repository",
            status: 'enabled'
        },
        {
            key: 'profileViews',
            title: <><RiseOutlined style={{ fontSize: '1.5rem' }} /></>,
            description: "Profile Views",
            status: 'disabled'
        }
    ];

    return (
        <>
            <Row gutter={[16, 16]}>
                {
                    overviewItems.map(({ key, title, description, status }) => {
                        return (
                            <Col key={key} lg={6} md={6} xs={24}>
                                <OverviewCards key={key} title={title} description={description} status={status} />
                            </Col>
                        )
                    })
                }
            </Row>
        </>
    )
}

export default OverviewSection