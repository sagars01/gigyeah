import { InboxOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Button, Form, Input, Upload, message } from 'antd';

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};

const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

const FormFieldsForCandidateData = () => (
    <>
        <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter your name!' }]}>
            <Input placeholder="Enter your name" />
        </Form.Item>

        <Form.Item
            name="email"
            label="Email"
            rules={[
                {
                    required: true,
                    message: 'Please enter your email address!',
                },
                {
                    type: 'email',
                    message: 'Invalid email address format!',
                },
            ]}
        >
            <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
            name="shortDescription"
            label="Short Description"
            rules={[{ required: true, message: 'Please provide a short description!' }]}
        >
            <Input.TextArea rows={4} placeholder="Enter a short description" />
        </Form.Item>

    </>
)

const ResumeUploadComponent: React.FC<IResumeUploadProps> = ({ jobId }) => {
    const [loading, setLoading] = useState(false);
    const onFinish = (values: any) => {
        console.log(...values)
    }
    return (
        <Form
            name="validate_other"
            {...formItemLayout}
        >
            <FormFieldsForCandidateData></FormFieldsForCandidateData>
            <Form.Item label="Relevant Files">
                <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                    <Upload.Dragger name="files" beforeUpload={() => false} multiple={false}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                    </Upload.Dragger>
                </Form.Item>
            </Form.Item>
            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )

};

interface IResumeUploadProps {
    jobId: string;
}


export default ResumeUploadComponent;
