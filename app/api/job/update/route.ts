import { NextRequest, NextResponse } from 'next/server';
import JobController from '@/app/libs/controllers/jobs/jobs.controller';
import jobValidator from './requestValidator';
import { getSessionInformation } from '@/app/utils/auth/getUserSessionData';

export async function PUT(request: NextRequest) {
    try {
        if (request.method !== "PUT") {
            return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
        }

        const jobId = request.nextUrl.searchParams.get("jobId") as string;
        if (!jobId) {
            return NextResponse.json({ error: 'No Job Id' }, { status: 400, statusText: "Invalid Request" });
        }

        const requestBody = await request.json();
        const { error, value } = jobValidator.validate(requestBody);
        if (error) {
            return NextResponse.json({ error: error.details[0].message }, { status: 400 });
        }

        const sessionInfo = await getSessionInformation(request);
        const job = await JobController.getJobsById(jobId);

        // Check if job exists and if user is authorized to update it
        if (!job) {
            return NextResponse.json({ error: 'Job not found' }, { status: 404 });
        }

        if (job.createdBy.id !== sessionInfo.userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        const updatedJobStatus = await JobController.updateJob(jobId, value);
        return NextResponse.json({ message: "Status Updated", job: updatedJobStatus }, { status: 200, statusText: "Success" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
