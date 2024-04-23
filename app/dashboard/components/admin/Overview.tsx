import { Row, Col } from "antd"
import { OverviewCardProps, OverviewCards } from "./OverviewCards"
import { RiseOutlined, UserOutlined } from "@ant-design/icons"


const OverviewSection: React.FC<any> = ({ openJobs, closedJobs }) => {
    const overviewItems: OverviewCardProps[] = [
        {
            title: openJobs.length || 0,
            description: openJobs.length === 1 ? "Open Job" : "Open Jobs",
            status: 'enabled'
        },
        {
            title: closedJobs.length || 0,
            description: closedJobs.length === 1 ? 'Closed Job' : 'Closed Job',
            status: 'enabled'
        },
        {
            title: <><UserOutlined style={{ fontSize: '1.5rem' }} /></>,
            description: "Candidate Repository",
            status: 'enabled'
        },
        {
            title: <><RiseOutlined style={{ fontSize: '1.5rem' }} /></>,
            description: "Profile Views",
            status: 'disabled'
        }
    ]
    return (
        <>
            <Row gutter={[16, 16]}>
                {
                    overviewItems.map(({ title, description, status }) => {
                        return (
                            <Col lg={6} md={6} xs={24}>
                                <OverviewCards title={title} description={description} status={status} />
                            </Col>
                        )
                    })
                }
            </Row>
        </>
    )
}

export default OverviewSection