import { InboxOutlined, RocketFilled } from '@ant-design/icons';
import React, { useState } from 'react';
import { Button, Card, Form, Input, Upload, message } from 'antd';
import buttonStyles from '../../../../styles/components/Button.module.css';

const formItemLayout = {

};

const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

const FormFieldsForCandidateData = () => (
    <>
        <Form.Item name="name" rules={[{ required: true, message: 'Please enter your name!' }]}>
            <Input placeholder="What should we call you?" />
        </Form.Item>

        <Form.Item
            name="email"
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
            rules={[{ required: true, message: 'Please advertise yourself' }]}
        >
            <Input.TextArea rows={3} placeholder="Tell us about real you in 120 words" maxLength={120} />
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
        <Form.Item>
            <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                <Upload.Dragger name="files" beforeUpload={() => false} multiple={false} maxCount={1}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload. [PDF]</p>
                    <p className="ant-upload-hint">Upload your resume, proof of work,or relevant documents</p>
                </Upload.Dragger>
            </Form.Item>
        </Form.Item>
    )

    return (
        <Card>
            <Form
                name="validate_other"
                {...formItemLayout}
                onFinish={onFinish}
            >
                <FormFieldsForCandidateData />
                <FormFieldsResumeUpload />
                <Form.Item>
                    <Button icon={<RocketFilled />} type="primary"
                        className={buttonStyles.gradientButton}
                        htmlType="submit" loading={loading}>
                        Apply
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

interface IResumeUploadProps {
    jobId: string;
}

export default ResumeUploadComponent;
