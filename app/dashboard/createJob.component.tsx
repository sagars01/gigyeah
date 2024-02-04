import React, { useEffect, useState } from 'react';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Space, Typography } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

interface ICreateJobProps {
    openDrawer: boolean;
    onDrawerClose: (e: Event | boolean) => void;
}


const CreateJob: React.FC<ICreateJobProps> = ({ openDrawer = false, onDrawerClose }) => {
    const [open, setOpen] = useState(openDrawer);
    const [form] = Form.useForm();

    const onClose = () => {
        form.resetFields();
        onDrawerClose(false);
    };

    useEffect(() => {
        setOpen(openDrawer);
    }, [openDrawer]);

    const onSubmit = (e: any) => {
        console.log(form.getFieldsValue())
    }

    return (
        <>
            <Drawer
                title="Create a new job"
                width={720}
                onClose={onClose}
                open={open}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button onClick={onSubmit} type="primary">
                            Submit
                        </Button>
                    </Space>
                }
            >
                <Form form={form} layout="vertical" requiredMark="optional" onFinish={onSubmit}>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="title"
                                label="Job Title"
                                rules={[{ required: true, message: 'Please enter job title' }]}
                            >
                                <Input placeholder="Please enter job title" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Typography.Paragraph>Mandatory Skills ( Max 3 )</Typography.Paragraph>
                            <Form.List name="skills">
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map(({ key, name, ...restField }) => (
                                            <Space key={key} style={{ display: 'flex', width: '100%' }} align="baseline">
                                                <Form.Item
                                                    wrapperCol={{
                                                        xs: 24,
                                                        sm: 24
                                                    }}
                                                    {...restField}
                                                    name={[name, 'skill']}
                                                    rules={[{ required: true, message: 'Add a skill' }]}
                                                >
                                                    <Input style={{ width: '100%' }} placeholder="Skill" />
                                                </Form.Item>
                                                <MinusCircleOutlined onClick={() => remove(name)} />
                                            </Space>
                                        ))}
                                        <Form.Item>
                                            <Button
                                                type="dashed"
                                                onClick={() => add()}
                                                block
                                                disabled={fields.length == 3}
                                                icon={<PlusOutlined />}
                                            >
                                                Add field
                                            </Button>
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="description"
                                label="Job Description"
                                rules={[{ required: true, message: 'Please enter job description' }]}
                            >
                                <Input.TextArea rows={6} placeholder="Please enter job description in 300 words" />
                            </Form.Item>
                        </Col>
                    </Row>

                </Form>
            </Drawer>
        </>
    );
};

export default CreateJob;
