import { put } from '@vercel/blob';
import dbConnect from '@/libs/mongodb';
import Application from '@/app/models/job/application.model';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        if (req.method !== "POST") {
            NextResponse.json({ error: 'Method Not Allowed' }, { status: 409 });
        }

        await dbConnect();

        const formData = await req.formData();
        const file = formData.get('file') as File;
        const jobId = formData.get('jobId') as string;
        const name = formData.get('name') as string;
        const shortIntro = formData.get('shortIntro') as string;
        const filename = file.name;

        const blob = await put(filename, file, {
            access: 'public',
        });

        const newApplication = new Application({
            jobId: new mongoose.Types.ObjectId(jobId), // Convert jobId to ObjectId
            applicantName: name,
            shortIntro: shortIntro,
            resumeUrl: blob.url,
            status: 'applied' // Default status
        });

        await newApplication.save();
        return NextResponse.json({ message: "Application Successful" }, { status: 200 });

    } catch (error) {
        // TODO: Handle errors by removing the blob
        console.error(error);
        return NextResponse.json({ error: 'Server Error' }, { status: 500 });
    }
};
