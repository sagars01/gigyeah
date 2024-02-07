import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/libs/mongodb';
import jobsModel from '@/app/models/job/jobs.model';
import jobSchema from './requestValidator';

export async function POST(request: NextRequest) {
    try {
        if (request.method !== "POST") {
            return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
        }

        await dbConnect();

        const body = await request.json();

        //TODO: Get rid of hard coded stuff

        const createdBy = "65c30b602c41727f4abfd5fb"; // getvalues from session 
        const companyData = {
            name: "Tech Innovation",
            description: "Nothing Much to talk about this"
        } // get from profile and session


        const jobData = { ...body, createdBy, company: companyData } // Get CreatedBy From Token and Session

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
