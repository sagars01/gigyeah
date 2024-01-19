'use client';

import type { PutBlobResult } from '@vercel/blob';
import { useState, useRef } from 'react';
import ResumeUploadForm from './resumeUploader';

export default function AvatarUploadPage() {
    const jobId = '12345';
    return (
        <>
            <ResumeUploadForm jobId={jobId} />
        </>
    );
}