import React from 'react';
import { Modal, Button } from 'antd';
import MarkdownRenderer from 'react-markdown-renderer';

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
            {/* <div>{summary}</div> */}
            <MarkdownRenderer markdown={summary} />
        </Modal>
    );
};

export default SummaryModal;
