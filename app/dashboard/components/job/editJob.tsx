import React, { useEffect, useState } from 'react';
import { Button, Col, Drawer, Form, Input, InputNumber, Row, Select, Space, message } from 'antd';
import { LoadingOutlined, MinusCircleOutlined, PlusOutlined, RightSquareOutlined } from '@ant-design/icons';
import { apiService } from '@/app/libs/request/apiservice';
import URL from '@/app/utils/constants/url/url';


const EditJobDrawer: React.FC<EditJobSiderProps> = ({ openDrawer, jobDetails, onDrawerClose, jobUpdatedEvt }) => {
    const [visible, setVisible] = useState(openDrawer);
    const [form] = Form.useForm();

    const [loading, setLoading] = useState(false)

    const convertSkillsFormObject = (skillsArray: string[]) => {
        return skillsArray.map(skill => ({ skill }));
    };

    useEffect(() => {
        if (jobDetails) {
            const skillsArray = convertSkillsFormObject(jobDetails.requirements);

            form.setFieldsValue({
                title: jobDetails.title,
                description: jobDetails?.description,
                payRange: {
                    currency: jobDetails?.payRange.currency,
                    min: jobDetails?.payRange.min,
                    max: jobDetails?.payRange.max,
                },
                requirements: skillsArray,
            });
        }
    }, [form, jobDetails]);

    useEffect(() => { setVisible(openDrawer) }, [openDrawer])

    const onClose = () => {
        onDrawerClose(false)
        setVisible(false);
    };



    const onSubmit = async (e: any) => {

        try {
            setLoading(true);
            const formData = form.getFieldsValue();
            const updatedRequirementModel = convertSkillsArray(formData.requirements);
            formData.requirements = updatedRequirementModel;

            setLoading(true)
            const response = await apiService.put(
                `${URL.api.private.jobs.update}?jobId=${jobDetails?._id}`,
                formData
            )
            message.success("Job Updated successfully!")
            // console.log(response);
            jobUpdatedEvt("Job Updated!", response.data);

            form.resetFields();
            onClose();
        } catch (error) {
            console.log(error)
            message.error("Unexpected error ocurred. Try Again!")
        } finally {
            setLoading(false)
        }

    }

    const validateMinMax = (_: any, value: any) => {
        if (!value) {
            return Promise.reject(new Error('Please enter a value'));
        }

        if (typeof value !== "number") {
            return Promise.reject(new Error("Enter a valid number"))
        }
        const minPay = form.getFieldValue(['payRange', 'min']);
        const maxPay = form.getFieldValue(['payRange', 'max']);
        if (minPay && maxPay && minPay > maxPay) {
            return Promise.reject(new Error('Max pay must be greater than min pay'));
        }
        return Promise.resolve();
    };

    return (
        <Drawer title="Edit Job Information" placement="right"
            open={visible}
            onClose={onClose} width={750}
            footer={
                <div
                    style={{
                        textAlign: 'right',
                    }}
                >
                    <Button onClick={onClose} style={{ marginRight: 8 }}>
                        Cancel
                    </Button>
                    <Button disabled={loading}
                        icon={
                            <>{
                                loading ?
                                    <LoadingOutlined />
                                    : <RightSquareOutlined />
                            }</>
                        }
                        onClick={() => form.submit()} type="primary">
                        Submit
                    </Button>
                </div>
            }
        >
            <Form form={form} layout="vertical" onFinish={onSubmit}>
                <Col span={24}>
                    <Form.Item
                        name="title"
                        label="Job Title"
                        rules={[{ required: true, message: 'Please enter job title' }]}
                    >
                        <Input placeholder="Please enter job title" />
                    </Form.Item>
                </Col>
                <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                    <Input.TextArea rows={4} placeholder="Job description" />
                </Form.Item>

                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item
                            name={['payRange', 'currency']}
                            label="Currency"
                            rules={[{ required: true, message: 'Please select a currency' }]}
                        >
                            <Select placeholder="Select currency">
                                <Select.Option value="USD">USD</Select.Option>
                                <Select.Option value="INR">INR</Select.Option>
                                <Select.Option value="EUR">EUR</Select.Option>
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


                <Form.Item label="Mandatory Skills">
                    <Form.List name="requirements">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'skill']} // Use 'skill' directly here
                                            rules={[{ required: true, message: 'Skill is required' }]}
                                        >
                                            <Input placeholder="Enter a skill" />
                                        </Form.Item>
                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                    </Space>
                                ))}
                                <Button disabled={loading} type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                                    Add Skill
                                </Button>
                            </>
                        )}
                    </Form.List>
                </Form.Item>
            </Form>
        </Drawer>
    );
};

export default EditJobDrawer;

interface JobDetails {
    _id: string;
    title: string;
    description: string;
    payRange: {
        min: number;
        max: number;
        currency: string;
    }
    requirements: string[];
}

interface EditJobSiderProps {
    jobDetails: JobDetails | null;
    openDrawer: boolean;
    onDrawerClose: (value: boolean) => void;
    jobUpdatedEvt: (message: string, updatedValue?: any) => void;
}

function convertSkillsArray(requirements: any) {
    return requirements.map((item: { skill: any; }) => item.skill);
}
