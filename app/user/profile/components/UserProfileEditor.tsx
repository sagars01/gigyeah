"use client"
import React, { useContext, useState } from 'react';
import { Button, Form, Input, Card, Avatar, Col, Row, message, Select } from 'antd';
import { DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { IUserModel, UserContext } from '@/app/user/profile/contexts/UserProfileContext';
import URL from '@/app/utils/constants/url/url';
import { apiService } from '@/app/libs/request/apiservice';

const UserProfileEditor: React.FC = () => {
    const [form] = Form.useForm();
    const { userData, setUserData, loading } = useContext(UserContext);
    const [submitting, setSubmitting] = useState(false);
    const { Option } = Select;

    const onFormValuesChange = (currentChange: any, allValues: IUserModel) => {
        setUserData({ ...userData, ...allValues });
    };

    const onFormSubmit = async () => {
        try {
            setSubmitting(true);
            const values = await form.validateFields();
            console.log('Submitting form data:', values);
            await apiService.post('/user/update', values)
            message.success('Profile updated successfully!');
        } catch (errorInfo) {
            console.error('Failed to submit form:', errorInfo);
            message.error('Failed to update profile. Please check your inputs.');
        } finally {
            setSubmitting(false);
        }
    };

    React.useEffect(() => {
        form.setFieldsValue(userData);
    }, [userData, form]);

    return (
        <Card loading={loading} extra={
            <Button
                icon={<SaveOutlined />}
                style={{ float: 'right' }}
                type="primary"
                htmlType="submit"
                loading={submitting}
                disabled={loading}
                onClick={onFormSubmit}
            >
                Save Changes
            </Button>
        }>
            <Form
                form={form}
                layout="vertical"
                onValuesChange={onFormValuesChange}
                onFinish={onFormSubmit}
            >
                <Row gutter={[16, 16]} align="middle" justify="center" style={{ marginBottom: '1rem' }}>
                    <Col span={12}>
                        <Avatar src={userData.image_url || '/fallback.png'} alt="Profile Image" size={130} />
                        <Link href={URL.user.clerkUser} style={{ position: 'absolute', bottom: 0, left: 100 }}>
                            <Button icon={<EditOutlined />} type="primary"></Button>
                        </Link>
                    </Col>
                </Row>
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="title"
                    label="Title"
                    rules={[{ required: true, message: 'Please input your title!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="intro"
                    label="Introduction"
                >
                    <Input.TextArea rows={4} />
                </Form.Item>
                <Form.Item
                    name={['company', 'name']}
                    label="Company Name"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name={['company', 'description']}
                    label="Company Description"
                >
                    <Input.TextArea rows={4} />
                </Form.Item>
                <Form.List name="socialMedia">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(field => (
                                <Row key={field.key} gutter={[16, 16]}>
                                    <Col span={8}>
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'platform']}
                                            key={field.key}
                                            label="Platform"
                                            rules={[{ required: true, message: 'Please select platform!' }]}
                                        >
                                            <Select placeholder="Select a platform">
                                                <Option value="Twitter">Twitter</Option>
                                                <Option value="LinkedIn">LinkedIn</Option>
                                                <Option value="Instagram">Instagram</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={14}>
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'url']}
                                            key={field.key}
                                            label="URL"
                                            rules={[
                                                { required: true, message: 'Please input URL!' },
                                                { type: 'url', message: 'Please enter a valid URL!' }
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={2}>
                                        <Button
                                            style={{ marginTop: '1.8rem' }}
                                            icon={<DeleteOutlined />} onClick={() => remove(field.name)}></Button>
                                    </Col>
                                </Row>
                            ))}


                            <Form.Item >
                                <Button
                                    disabled={fields.length > 2}
                                    type="dashed" onClick={() => add(null)} block>Add Social Media</Button>
                            </Form.Item>


                        </>
                    )}
                </Form.List>
            </Form>
        </Card>
    );
};

export default UserProfileEditor;
