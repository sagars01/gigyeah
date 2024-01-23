import { CheckOutlined, InboxOutlined, RocketFilled } from '@ant-design/icons';
import React, { useState } from 'react';
import { Button, Card, Form, Input, Upload, message } from 'antd';
import buttonStyles from '../../../../styles/components/Button.module.css';
import Icon from '@ant-design/icons/lib/components/Icon';

const formItemLayout = {

};

const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};



const ResumeUploadComponent: React.FC<IResumeUploadProps> = ({ jobId, isLoading = true, isError = false }) => {
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const { Meta } = Card;

    const onFinish = async (values: any) => {
        setLoading(true);

        const formData = new FormData();
        formData.append('jobId', jobId);
        formData.append('name', values.name);
        formData.append('email', values.email);
        formData.append('shortIntro', values.shortIntro);

        if (values.dragger?.length > 0) {
            const file = values.dragger[0].originFileObj;
            formData.append('file', file);
            formData.append('filename', encodeURIComponent(file.name));
        } else {
            message.error('Please upload a file.');
            setLoading(false);
            return;
        }
        try {
            const response = await fetch(`/api/job/apply`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorBody = await response.json();
                const errorMessage = errorBody?.error || 'Unexpected issue occured while applying job';
                message.error(errorMessage);
                throw new Error(errorMessage);
            }

            await response.json();
            message.success('Job Applied Successfully!');
        } catch (error: any) {
            console.error(error);
        } finally {
            setLoading(false);
        }
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

    const FormFieldsResumeUpload = () => (

        <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile}
            rules={[{ required: true, message: 'Attach relevant documents' }]}>
            <Upload.Dragger name="files" beforeUpload={() => false} multiple={false} maxCount={1}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload. [PDF]</p>
                <p className="ant-upload-hint">Upload your resume, proof of work,or relevant documents</p>
            </Upload.Dragger>
        </Form.Item>

    )

    return (
        <>
            {
                !isError && (
                    <>
                        {
                            !showSuccess ? (<Card loading={isLoading}>
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
                            </Card>) : (
                                <>
                                    {/* TODO: Upload images for success */}
                                    <Card hoverable
                                        cover={
                                            <img alt="heavy check marx"
                                                src="https://cliply.co/wp-content/uploads/2021/03/372103860_CHECK_MARK_400px.gif" />
                                        }
                                    >

                                        <Meta title="Apply to other interesting jobs!" description="www.instagram.com" />
                                    </Card>
                                </>
                            )
                        }
                    </>
                )
            }
        </>
    );
};

interface IResumeUploadProps {
    jobId: string;
    isLoading: boolean;
    isError?: boolean;
}

export default ResumeUploadComponent;
