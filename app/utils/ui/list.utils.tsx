import Button from 'antd/es/button';
import Col from 'antd/es/grid/col';
import Row from 'antd/es/row';
import React from 'react';



type CustomListProps = {
    items: any[]
}

const CustomList: React.FC<CustomListProps> = ({ items }) => {
    return (
        <div className="custom-list">
            {items.map((item, index) => (
                <div className="list-item" key={index}>
                    <div className="item-meta">
                        <Row gutter={[6, 6]}>
                            <Col lg={18}>
                                <div className="item-title">{item.title}</div>
                                <div className="item-description">{item.description}</div>
                            </Col>

                            {item?.status === 'active' && (
                                <Col lg={6}>
                                    <a href={`/public/job/apply/${item._id}`} target="_blank" rel="noopener noreferrer">
                                        <Button type='primary'>Apply Now!</Button>
                                    </a>
                                </Col>
                            )}
                        </Row>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CustomList;
