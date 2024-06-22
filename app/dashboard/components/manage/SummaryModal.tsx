import React from 'react';
import { Modal } from 'antd';
import Title from 'antd/es/typography/Title';

interface SummaryModalProps {
    visible: boolean;
    summary: any;
    onClose: () => void;
}

const SummaryModal: React.FC<SummaryModalProps> = ({ visible, summary, onClose }) => {

    const Display: React.FC<DisplayProps> = ({ data }) => {
        return (
            <div className="max-w-4xl mx-auto">
                {Object.entries(data).map(([category, details]) => (
                    <div key={category} className="mb-6">
                        <Title level={4} className="text-lg font-bold mb-2">{category}</Title>
                        <ul className="list-disc pl-5">
                            {Object.entries(details).map(([key, value]) => (
                                <li key={key} className=" mb-1">{value}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <Modal
            title={
                <Title level={3}>Analysis of Candidate Resume</Title>
            }
            centered={true}
            open={visible}
            onCancel={onClose}
            footer={null}
        >
            <Display data={summary} />
        </Modal>
    );
};

export default SummaryModal;


// Define interfaces for the details and the overall data structure
interface EvaluationDetails {
    [key: string]: string;
}

interface EvaluationData {
    [category: string]: EvaluationDetails;
}

interface DisplayProps {
    data: EvaluationData;
}