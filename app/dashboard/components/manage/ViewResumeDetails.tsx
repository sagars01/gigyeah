import { Modal } from "antd"
import { useState } from "react"

const ViewResumeDetails = ({ viewResume, onCloseModal }) => {

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
            open={!!viewResume}
            onCancel={() => {
                onCloseModal()
            }}
            destroyOnClose={true}


        >
            {
                viewResume &&
                <iframe
                    className="w-full h-full"
                    src={viewResume}>

                </iframe>
            }

        </Modal>
    )
}

export default ViewResumeDetails