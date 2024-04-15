import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/app/libs/mongodb';
import jobsModel, { CreatedByType } from '@/app/libs/models/job/jobs.model';
import jobSchema from './requestValidator';
import { getSessionInformation } from '@/app/utils/auth/getUserSessionData';

export async function POST(request: NextRequest) {
    try {
        if (request.method !== "POST") {
            return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
        }

        await dbConnect();

        const body = await request.json();

        const { profileImg, userId, customerCache: {
            name,
            company
        } }: any = await getSessionInformation(request);

        const createdBy: CreatedByType = {
            id: userId,
            name,
            company,
            profileImg
        }

        const jobData = {
            ...body, createdBy
        }

        const { error, value: jobDetailsValue } = jobSchema.validate(jobData);

        if (error) {
            console.error(error);
            return NextResponse.json({ error: error.details[0].message }, { status: 419, statusText: "Validation Failed!" });
        }

        // TODO: Move the code to Jobs Controller

        const newJob = new jobsModel(jobDetailsValue);

        await newJob.save();

        return NextResponse.json({ message: 'Job created successfully', jobId: newJob._id }, { status: 201, statusText: "OK" });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
