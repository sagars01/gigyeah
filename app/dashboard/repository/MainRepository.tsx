
import Row from "antd/es/row"
import ChatInterface from "./Chat"
import OverviewMetrics from "./OverviewMetrics"
import Col from "antd/es/col"
import CandidateTable from "./CandidateTable"

const MainRepositoryDashboard: React.FC<Props> = () => {
    return (
        <>
            <OverviewMetrics />
            <Row>

                <Col lg={16} md={12} xs={24}>
                    <CandidateTable />
                </Col>
                <Col lg={8} md={12} xs={24}>
                    <ChatInterface />
                </Col>
            </Row>

        </>
    )
}

export default MainRepositoryDashboard

interface Props {

}