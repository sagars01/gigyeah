import { Modal } from "antd"

const ViewExpandedCandidate: React.FC<ViewProps> = ({ visible, resumeLink, onCandidateModalClose }) => {

    const onClose = () => {
        onCandidateModalClose(!visible)
    }
    return (
        <Modal
            centered={true}
            styles={{
                header: {
                    padding: '1rem',
                    backgroundColor: '#f0f2f5',
                },
                body: {
                    padding: '1rem',
                    height: '80vh',
                },
                footer: {
                    padding: '10px',
                    backgroundColor: '#f0f2f5',
                },
                mask: {
                    backgroundColor: 'rgba(0,0,0,0.5)'
                }
            }}
            footer={null}
            onCancel={onClose}
            open={visible}
            destroyOnClose={true}


        >
            {
                visible &&
                <iframe
                    className="w-full h-full"
                    src={resumeLink}>

                </iframe>
            }

        </Modal>
    )
}

export default ViewExpandedCandidate

interface ViewProps {
    visible: boolean;
    resumeLink: string;
    onCandidateModalClose: (visible: boolean) => void
}