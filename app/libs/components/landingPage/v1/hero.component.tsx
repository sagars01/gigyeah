import React from 'react';
import { Button, Col, Row } from 'antd';
import Title from 'antd/es/typography/Title';
import Paragraph from 'antd/es/typography/Paragraph';
import Image from 'next/image';
import Link from 'next/link';

const Hero: React.FC = () => {
    return (
        <Row align="middle" justify="center" style={{ minHeight: '90vh' }}>
            <Col lg={16} xs={24}>
                <div style={{ textAlign: 'center' }}>
                    <Title level={1}>Simplify Hiring with Jessi</Title>
                    <Title level={2}>Your first AI Recruiter</Title>
                    <Paragraph style={{ fontSize: '1rem' }}>
                        Create job, accept applications, summarize resume.

                    </Paragraph>
                    <Paragraph style={{ fontSize: '1.5rem', fontWeight: '600' }}>
                        All in one place.
                    </Paragraph>

                    <Link href={"/dashboard"}>
                        <Button type="primary" size='large'>

                            Start Hiring!

                        </Button>
                    </Link>
                </div>
            </Col>
            <Col lg={8} xs={24}>
                <Row align={"middle"} justify={'center'}>
                    <Image alt='jessi' src={"/img/jessi.webp"} width={350} height={350} />
                </Row>
            </Col>
        </Row>
    );
};

export default Hero;
