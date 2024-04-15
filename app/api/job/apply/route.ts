import { del, put } from '@vercel/blob';
import dbConnect from '@/app/libs/mongodb';
import Application from '@/app/libs/models/application/application.model';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';
import JobController from '@/app/libs/controllers/jobs/jobs.controller';

// TODO: JOI to validate data

export async function POST(req: NextRequest): Promise<NextResponse> {
    let blobUrl = null;
    try {
        if (req.method !== "POST") {
            return NextResponse.json({ error: 'Method Not Allowed' }, { status: 409 });
        }
        const formData = await req.formData();
        const file = formData.get('file') as File;
        const jobId = formData.get('jobId') as string;
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const shortIntro = formData.get('shortIntro') as string;
        const filename = file.name;



        const blob = await put(filename, file, {
            access: 'public',
        });

        blobUrl = blob.url;

        await dbConnect();

        // Get User Id from Database
        const jobDetails = await JobController.getJobsById(jobId);

        if (jobDetails?.status === 'expired') {
            return NextResponse.json({
                message: 'Job has expired',

            }, {
                status: 400,
                statusText: 'Invalid Reqeust'
            })
        }
        const ownerId = jobDetails?.createdBy.id as string;

        const dataStore = {
            jobId: new mongoose.Types.ObjectId(jobId),
            ownerId: new mongoose.Types.ObjectId(ownerId as string),
            email: email,
            applicantName: name,
            shortIntro: shortIntro,
            status: 'applied'
        }

        const newApplication = new Application({ ...dataStore, resumeUrl: blob.url });

        await newApplication.save();
        return NextResponse.json({ message: "Application Successful" }, { status: 200, statusText: "success" });

    } catch (error: any) {
        let errorMessage = "Unexpected Server Error";
        let statuscode = 500;
        if (blobUrl) await del(blobUrl);
        console.error(error);

        if (error?.code === 11000) {
            errorMessage = "Job Already Applied!"
            statuscode = 409;
        }
        return NextResponse.json({ error: errorMessage }, { status: statuscode });
    }
};
