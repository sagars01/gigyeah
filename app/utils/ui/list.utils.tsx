import { ArrowRightOutlined } from '@ant-design/icons';
import Button from 'antd/es/button';
import Empty from 'antd/es/empty';
import Col from 'antd/es/grid/col';
import Row from 'antd/es/row';
import Paragraph from 'antd/es/typography/Paragraph';
import React from 'react';



type CustomListProps = {
    items: any[]
}

const CustomList: React.FC<CustomListProps> = ({ items }) => {
    return (
        <div className="custom-list">
            {items.length > 0 ? (
                items.map((item, index) => (
                    <div className="list-item" key={index}>
                        <div className="item-meta">
                            <Row gutter={[6, 6]}>
                                <Col lg={18}>
                                    <div className="item-title">{item.title}</div>
                                    <Paragraph ellipsis={{
                                        rows: 3,
                                        expandable: true,
                                        symbol: 'more'
                                    }}>
                                        {item.description}
                                    </Paragraph>
                                </Col>
                                {item?.status === 'active' && (
                                    <Col lg={6}>
                                        <a href={`/public/job/apply/${item._id}`} target="_blank" rel="noopener noreferrer">
                                            <Button type="primary">Apply Now!</Button>
                                        </a>
                                    </Col>
                                )}
                            </Row>
                        </div>
                    </div>
                ))
            ) : (
                <Empty description="No active jobs" />
            )}
        </div>
    );
};

export default CustomList;
