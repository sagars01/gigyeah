import React from 'react';
import { Modal, Button } from 'antd';

interface SummaryModalProps {
    visible: boolean;
    summary: string;
    onClose: () => void;
}
function cleanHTMLForReact(htmlString: string) {
    // Create a new DOM parser instance
    const parser = new DOMParser();

    // Parse the HTML string into a new DOM Document
    const doc = parser.parseFromString(htmlString, 'text/html');

    // Access the <body> element's content
    const bodyContent = doc.body.innerHTML;

    // Return the cleaned HTML content
    return bodyContent;
}
const SummaryModal: React.FC<SummaryModalProps> = ({ visible, summary, onClose }) => {
    const cleanHTML = cleanHTMLForReact(summary);
    return (
        <Modal
            title="Resume Summary"
            open={visible}
            onCancel={onClose}
            footer={<Button onClick={onClose}>Close</Button>}
        >
            <div>{summary}</div>
        </Modal>
    );
};

export default SummaryModal;
