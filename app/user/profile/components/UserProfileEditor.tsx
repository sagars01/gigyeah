"use client"
import React, { useContext, useState } from 'react';
import { Avatar, Button, Form, Input, Upload } from 'antd';
import { IUserModel, UserContext } from '@/app/user/profile/contexts/UserProfileContext';
import Card from 'antd/es/card/Card';
import { EditOutlined, UploadOutlined } from '@ant-design/icons';
import Link from 'next/link';

const UserProfileEditor: React.FC = () => {
    const [form] = Form.useForm();
    const { userData, setUserData, loading } = useContext(UserContext);

    const onFormValuesChange = (changedValues: any, allValues: IUserModel) => {
        setUserData(allValues);
    };

    React.useEffect(() => {
        form.setFieldsValue(userData);
    }, [userData, form]);


    return (
        <Card loading={loading}>
            <Form
                form={form}
                layout="vertical"
                onValuesChange={onFormValuesChange} // Attach the onValuesChange handler
            >
                <Form.Item
                    name="image_url"
                >
                    <Avatar size={128} src={userData.image_url} />
                    <Link href={process.env.NEXT_PUBLIC_USER_PROFILE as string} target='_blank'>
                        <Button type='primary' style={{ position: 'absolute', bottom: 0, left: '20%' }} size='small' icon={
                            <EditOutlined />
                        }></Button>
                    </Link>
                </Form.Item>
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
                    name="email"
                    label="Email"
                    rules={[
                        { required: true, message: 'Please input your email!' },
                        { type: 'email', message: 'Please enter a valid email!' }
                    ]}
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
                <Form.Item>
                    <Button style={{ float: 'right' }} type="primary" htmlType="submit">
                        Save Changes
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default UserProfileEditor;
