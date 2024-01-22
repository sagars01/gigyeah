import { InboxOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Button, Form, Input, Upload, message } from 'antd';

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};

const normFile = (e: any) => {
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
            name="shortIntro"
            label="Why should we hire you?"
            rules={[{ required: true, message: 'Please provide a short description!' }]}
        >
            <Input.TextArea rows={4} placeholder="Enter a short description" />
        </Form.Item>
    </>
);


const ResumeUploadComponent: React.FC<IResumeUploadProps> = ({ jobId }) => {
    const [loading, setLoading] = useState(false);
    const [relevantFile, setRelevantFile] = useState(null);

    const onFinish = async (values: any) => {
        setLoading(true);

        const formData = new FormData();
        formData.append('jobId', jobId);
        formData.append('name', values.name);
        formData.append('email', values.email);
        formData.append('shortIntro', values.shortIntro);

        if (values.dragger.length > 0) {
            const file = values.dragger[0].originFileObj;
            formData.append('file', file);
            formData.append('filename', encodeURIComponent(file.name));
        } else {
            message.error('Please upload a file.');
            setLoading(false);
            return;
        }
        try {
            const response = await fetch(`/api/job/apply?filename=${encodeURIComponent(values.dragger[0].originFileObj.name)}&jobId=${jobId}`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            await response.json();
            message.success('Job Applied Successfully!');
        } catch (error) {
            message.error('Failed to upload the file.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };


    const FormFieldsResumeUpload = () => (
        <Form.Item label="Relevant Files">
            <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                <Upload.Dragger name="files" beforeUpload={() => false} multiple={false} maxCount={1}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                </Upload.Dragger>
            </Form.Item>
        </Form.Item>
    )

    return (
        <Form
            name="validate_other"
            {...formItemLayout}
            onFinish={onFinish}
        >
            <FormFieldsForCandidateData />
            <FormFieldsResumeUpload />
            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

interface IResumeUploadProps {
    jobId: string;
}

export default ResumeUploadComponent;
