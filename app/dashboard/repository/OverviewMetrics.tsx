import React from 'react';
import { Card, Statistic, Row, Col } from 'antd';

const OverviewMetrics: React.FC<Props> = () => {
    return (
        <div className="p-5">
            <Row gutter={16} className="mt-6">
                <Col span={6}>
                    <Card>
                        <Statistic title="Total Candidates" value={1128} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic title="Candidates Interviewed" value={300} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic title="Candidates Hired" value={85} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic title="Follow-Ups" value={50} />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default OverviewMetrics;

interface Props {

}