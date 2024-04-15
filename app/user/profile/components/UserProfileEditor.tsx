"use client"
import React, { useContext, useState } from 'react';
import { Button, Form, Input, Card, Avatar, Col, Row, message } from 'antd';
import { EditOutlined, SaveOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { IUserModel, UserContext } from '@/app/user/profile/contexts/UserProfileContext';
import URL from '@/app/utils/constants/url/url';
import { apiService } from '@/app/libs/request/apiservice';

const UserProfileEditor: React.FC = () => {
    const [form] = Form.useForm();
    const { userData, setUserData, loading } = useContext(UserContext);
    const [submitting, setSubmitting] = useState(false);

    const onFormValuesChange = (_: any, allValues: IUserModel) => {
        setUserData(allValues);
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
        <Card loading={loading}>
            <Form
                form={form}
                layout="vertical"
                onValuesChange={onFormValuesChange}
                onFinish={onFormSubmit}
            >
                <Row gutter={[16, 16]} style={{ marginBottom: '1rem' }}>
                    <Col span={12}>
                        <Avatar src={userData.image_url || '/fallback.png'} alt="Profile Image" size={130} />
                        <Link href={URL.user.profile} passHref style={{ position: 'absolute', bottom: 0, left: 100 }}>
                            <Button icon={<EditOutlined />} type="primary"></Button>
                        </Link>
                    </Col>
                    <Col span={12}>
                        <Button
                            icon={<SaveOutlined />}
                            style={{ float: 'right' }}
                            type="primary"
                            htmlType="submit"
                            loading={submitting}
                        >
                            Save Changes
                        </Button>
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
                {/* <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        { required: true, message: 'Please input your email!' },
                        { type: 'email', message: 'Please enter a valid email!' }
                    ]}
                >
                    <Input disabled />
                </Form.Item> */}
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
            </Form>
        </Card>
    );
};

export default UserProfileEditor;
