import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/libs/mongodb';
import jobsModel from '@/app/models/job/jobs.model';
import jobSchema from './requestValidator';
import { getSessionInformation } from '@/utils/auth/getCookies';

export async function POST(request: NextRequest) {
    try {
        if (request.method !== "POST") {
            return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
        }

        await dbConnect();

        const body = await request.json();

        // TODO : Priority 1 - Call Create New User after signup in Clerk 
        // Get the userId from Clerk

        // TODO: The entire middleware work now
        const userData: any = await getSessionInformation(request);
        const createdBy = userData.userId;

        const jobData = { ...body, createdBy }

        const { error, value: jobDetailsValue } = jobSchema.validate(jobData);

        if (error) {
            return NextResponse.json({ error: error.details[0].message }, { status: 419, statusText: "Validation Failed!" });
        }

        const newJob = new jobsModel(jobDetailsValue);

        await newJob.save();

        return NextResponse.json({ message: 'Job created successfully', jobId: newJob._id }, { status: 201, statusText: "OK" });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
