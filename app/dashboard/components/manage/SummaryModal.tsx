import React from 'react';
import { Modal, Button } from 'antd';

interface SummaryModalProps {
    visible: boolean;
    summary: string;
    onClose: () => void;
}

const SummaryModal: React.FC<SummaryModalProps> = ({ visible, summary, onClose }) => {
    return (
        <Modal
            title="Resume Summary"
            open={visible}
            onCancel={onClose}
            footer={<Button onClick={onClose}>Close</Button>}
        >
            <p>{summary}</p>
        </Modal>
    );
};

export default SummaryModal;
