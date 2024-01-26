import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/libs/mongodb';
import jobsModel from '@/app/models/job/jobs.model';
import { jobSchema } from './requestValidator';

export async function POST(request: NextRequest) {
    try {
        if (request.method !== "POST") {
            return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
        }

        await dbConnect();

        const body = await request.json();

        const { error, value: jobDetailsValue } = jobSchema.validate(body);

        if (error) {
            return NextResponse.json({ error: error.details[0].message }, { status: 400 });
        }

        const newJob = new jobsModel(jobDetailsValue);

        await newJob.save();

        return NextResponse.json({ message: 'Job created successfully', jobId: newJob._id }, { status: 201 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
