import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Col, Drawer, Form, Input, InputNumber, Row, Select, Space, Typography, message } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { apiService } from '@/app/libs/request/apiservice';

interface ICreateJobProps {
    openDrawer: boolean;
    jobCreatedEvt: any;
    onDrawerClose: (e: Event | boolean) => void;
}

interface IJob {
    title: string;
    description: string;
    requirements: string[];
    location: {
        city: string;
        country: string;
    }
    remote: boolean;
}
function convertSkillsArray(skillsArray: any[]) {
    return skillsArray.map((item: { skill: any; }) => item.skill);
}

const { Option } = Select;
const CreateJob: React.FC<ICreateJobProps> = ({ openDrawer = false, onDrawerClose, jobCreatedEvt }) => {
    const [open, setOpen] = useState(openDrawer);

    const [form] = Form.useForm();

    const onClose = () => {
        form.resetFields();
        onDrawerClose(false);
    };



    useEffect(() => {
        setOpen(openDrawer);
    }, [openDrawer]);

    const onSubmit = async (e: any) => {
        const formData: IJob = form.getFieldsValue();
        const updatedRequirementModel = convertSkillsArray(formData.requirements);
        formData.requirements = updatedRequirementModel;
        try {
            const response = await apiService.post(
                "/job/create",
                formData
            )
            message.success("Job created successfully!")
            console.log(response);
            jobCreatedEvt(response);
            form.resetFields();

        } catch (error) {
            // TODO: Point out exactly where the error is on the form
            console.log(error)
            message.error("Unexpected error ocurred. Try Again!")
        }

    }

    const validateMinMax = (_: any, value: any) => {
        if (!value) {
            return Promise.reject(new Error('Please enter a value'));
        }
        const minPay = form.getFieldValue(['payRange', 'min']);
        const maxPay = form.getFieldValue(['payRange', 'max']);
        if (minPay && maxPay && minPay > maxPay) {
            return Promise.reject(new Error('Max pay must be greater than min pay'));
        }
        return Promise.resolve();
    };

    return (
        <>
            <Drawer
                title="Create a new job"
                width={720}
                onClose={onClose}
                maskClosable={false}
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
                            <Form.List name="requirements">
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
                        <Col span={8}>
                            <Form.Item
                                name={['payRange', 'currency']}
                                label="Currency"
                                rules={[{ required: true, message: 'Please select a currency' }]}
                            >
                                <Select placeholder="Select currency">
                                    <Option value="USD">USD</Option>
                                    <Option value="INR">INR</Option>
                                    <Option value="EUR">EUR</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name={['payRange', 'min']}
                                label="Minimum Pay"
                                rules={[{
                                    required: true,
                                    validator: validateMinMax,
                                    message: 'Please enter minimum pay'
                                }]}
                            >
                                <InputNumber
                                    style={{ width: '100%' }}
                                    placeholder="Minimum"
                                    min={0}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name={['payRange', 'max']}
                                label="Maximum Pay"
                                rules={[{ required: true, validator: validateMinMax, message: 'Please enter maximum pay' }]}
                            >
                                <InputNumber
                                    style={{ width: '100%' }}
                                    placeholder="Maximum"
                                    min={0}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name={['location', 'city']}
                                label="City"
                                rules={[{ required: true, message: 'Please enter the city' }]}
                            >
                                <Input placeholder="Enter city name" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name={['location', 'country']}
                                label="Country"
                                rules={[{ required: true, message: 'Please enter the country' }]}
                            >
                                <Input placeholder="Enter country name" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="remote"
                                valuePropName="checked"
                                wrapperCol={{
                                    offset: 0,
                                    span: 24,
                                }}
                            >
                                <Checkbox>Remote Position</Checkbox>
                            </Form.Item>
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
