import { del, put } from '@vercel/blob';
import dbConnect from '@/libs/mongodb';
import Application from '@/app/models/job/application.model';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';
import { runValidation } from './requestValidator';

// TODO: Express Validator to validate the data.

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

        // const validationCheck = await runValidation(req);
        // if (validationCheck) {
        //     return NextResponse.json({ errors: validationCheck.errors },
        //         { status: 409, statusText: "Request Validation Failed" });
        // }

        const blob = await put(filename, file, {
            access: 'public',
        });

        blobUrl = blob.url;

        await dbConnect();

        const newApplication = new Application({
            jobId: new mongoose.Types.ObjectId(jobId),
            email: email,
            applicantName: name,
            shortIntro: shortIntro,
            resumeUrl: blob.url,
            status: 'applied' // Default status
        });

        await newApplication.save();
        return NextResponse.json({ message: "Application Successful" }, { status: 200 });

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
