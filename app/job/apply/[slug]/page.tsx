'use client';

import type { PutBlobResult } from '@vercel/blob';
import { useState, useRef } from 'react';
import ResumeUploadForm from './resumeUploader';
import ResumeUploadComponent from './resumeUploader.v2';

export default function AvatarUploadPage({ params }: { params: { slug: string } }) {

    return (
        <>
            <ResumeUploadForm jobId={params.slug} />
            {/* <ResumeUploadComponent jobId={params.slug} /> */}
        </>
    );
}