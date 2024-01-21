import React, { useState, useRef } from 'react';

interface ResumeUploadFormProps {
    jobId: string;
}

const ResumeUploadForm: React.FC<ResumeUploadFormProps> = ({ jobId }) => {
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [uploadStatus, setUploadStatus] = useState<string | null>(null);

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setUploadStatus('');

        if (!inputFileRef.current?.files?.[0]) {
            setUploadStatus('Please select a file to upload.');
            return;
        }

        const file = inputFileRef.current.files[0];

        const formData = new FormData();
        formData.append('jobId', jobId);
        formData.append('name', 'Applicant Name 1'); // Replace with the desired name
        formData.append('shortIntro', 'My name is applicant'); // Replace with the desired shortIntro
        formData.append('file', file);

        try {
            const response = await fetch(`/api/job/apply?filename=${encodeURIComponent(file.name)}&jobId=${jobId}`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            console.log(data)
            setUploadStatus(`Job Applied Successfully!`);
        } catch (error) {
            setUploadStatus('Failed to upload the file.');
            console.error(error);
        }
    };

    return (
        <>

            <form onSubmit={handleFormSubmit}>
                <h2>Upload Resume for Job ID: {jobId}</h2>
                <input type="file" ref={inputFileRef} required />
                <button type="submit">Upload Resume</button>
                {uploadStatus && <p>{uploadStatus}</p>}
            </form>

        </>
    );
};

export default ResumeUploadForm;
