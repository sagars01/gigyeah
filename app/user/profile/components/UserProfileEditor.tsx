"use client"
import React, { useContext } from 'react';
import { Button, Form, Input, Upload, Card } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import Image from 'next/image';
import Link from 'next/link';
import { IUserModel, UserContext } from '@/app/user/profile/contexts/UserProfileContext';

const UserProfileEditor: React.FC = () => {
    const [form] = Form.useForm();
    const { userData, setUserData, loading } = useContext(UserContext);

    const onFormValuesChange = (_: any, allValues: IUserModel) => {
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
                    <div style={{ marginBottom: '10px' }}>
                        <Image src={userData.image_url || '/fallback.png'} alt="Profile Image" width={128} height={128} style={{ borderRadius: '50%' }} />
                    </div>
                    <Link href="/profile/edit" passHref>
                        <Button icon={<EditOutlined />} type="primary">Edit Profile</Button>
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
