import React, { useEffect, useState } from 'react';
import { Button, Drawer, Form, Input, InputNumber } from 'antd';


const EditJobDrawer: React.FC<EditJobSiderProps> = ({ openDrawer, jobDetails }) => {
    const [visible, setVisible] = useState(openDrawer);
    const [form] = Form.useForm();



    useEffect(() => {
        form.setFieldsValue({
            description: jobDetails?.description,
            min: jobDetails?.minPay,
            max: jobDetails?.maxPay,
            requirements: jobDetails?.requirements.join(', '),
        });
    }, [form, jobDetails]);

    useEffect(() => { setVisible(openDrawer) }, [openDrawer])

    const onClose = () => {
        setVisible(false);
    };

    const onSubmit = (values: any) => {
        console.log('Received values of form: ', values);
        onClose();
    };

    return (
        <Drawer title="Edit Job Information" placement="right"
            open={visible}
            onClose={onClose} width={350}
            footer={
                <div
                    style={{
                        textAlign: 'right',
                    }}
                >
                    <Button onClick={onClose} style={{ marginRight: 8 }}>
                        Cancel
                    </Button>
                    <Button onClick={() => form.submit()} type="primary">
                        Submit
                    </Button>
                </div>
            }
        >
            <Form form={form} layout="vertical" onFinish={onSubmit}>
                <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                    <Input.TextArea rows={4} placeholder="Job description" />
                </Form.Item>
                <Form.Item label="Pay Range" style={{ marginBottom: 0 }}>
                    <Form.Item
                        name="min"
                        rules={[{ required: true, message: 'Min pay is required!' }]}
                        style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                    >
                        <InputNumber placeholder="Min Pay" style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        name="max"
                        rules={[{ required: true, message: 'Max pay is required!' }]}
                        style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
                    >
                        <InputNumber placeholder="Max Pay" style={{ width: '100%' }} />
                    </Form.Item>
                </Form.Item>
                <Form.List name="requirements">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <Form.Item
                                    key={key}
                                    {...restField}
                                    name={[name]}
                                    label={`Requirement ${name + 1}`}
                                    rules={[{ required: true, message: 'Requirement is required' }]}
                                >
                                    <Input placeholder={`Skill ${name + 1}`} />
                                </Form.Item>
                            ))}
                        </>
                    )}
                </Form.List>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Update
                    </Button>
                </Form.Item>
            </Form>
        </Drawer>
    );
};

export default EditJobDrawer;

interface JobDetails {
    description: string;
    minPay: number;
    maxPay: number;
    requirements: string[];
}

interface EditJobSiderProps {
    jobDetails: JobDetails | null;
    openDrawer: boolean;
}