import { del, put } from '@vercel/blob';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';
import PublicJobsController from '../controllers/publicjob.controller';
import JobRequestValidatorSchema from './requestValidator'; // Ensure correct path and usage

export async function POST(req: NextRequest): Promise<NextResponse> {
    let blobUrl = null;
    try {
        if (req.method !== "POST") {
            return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
        }

        const formData = await req.formData();
        const file = formData.get('file') as File;
        const jobId = formData.get('jobId') as string;
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const shortIntro = formData.get('shortIntro') as string;

        const fileDetails = {
            type: file.type,
            size: file.size
        };

        // Validate the file and other data
        const data = {
            jobId,
            name,
            email,
            shortIntro,
            file: fileDetails
        };
        const validationResult = await JobRequestValidatorSchema.validate(data);
        if (validationResult.error) {
            return NextResponse.json({ error: validationResult.error.details[0].message }, { status: 400 });
        }

        // Fetch job details using the controller
        const jobDetails = await PublicJobsController.getJobDetailsForVerification(jobId);
        if (!jobDetails || jobDetails.status === 'expired') {
            return NextResponse.json({ error: 'Job has expired or does not exist' }, { status: 400 });
        }

        // Save the file to a blob store
        const filename = file.name;
        const blob = await put(filename, file, { access: 'public' });
        blobUrl = blob.url;

        // Construct the application data
        const applicationData = {
            jobId,
            ownerId: jobDetails.createdBy.id,
            email,
            applicantName: name,
            shortIntro,
            resumeUrl: blobUrl,
            status: 'applied'
        };

        // Use the controller to handle the application
        const applicationResponse = await PublicJobsController.handleJobApplication(applicationData);
        if (!applicationResponse.success) {
            if (blobUrl) await del(blobUrl);  // Clean up if application fails
            return NextResponse.json({ error: applicationResponse.message }, { status: 400 });
        }

        return NextResponse.json({ message: applicationResponse.message }, { status: 200 });

    } catch (error: any) {
        if (blobUrl) await del(blobUrl);  // Ensure blob cleanup on error
        console.error('Error during job application:', error);
        return NextResponse.json({ error: 'Unexpected Server Error' }, { status: 500 });
    }
};
