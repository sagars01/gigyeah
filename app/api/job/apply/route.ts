import { put } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/libs/mongodb';
import Application from '@/app/models/job/application.model';

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        if (request.method !== "POST") {
            NextResponse.json({ error: 'Method Not Allowed' }, { status: 409 });
        }

        await dbConnect()

        const { searchParams } = new URL(request.url);
        const filename = searchParams.get('filename') as string;


        const formData = await request.formData();
        const file = formData.get('file') as File;
        const jobId = formData.get('jobId') as string;
        const name = formData.get('name') as string;
        const shortIntro = formData.get('shortIntro') as string;

        const blob = await put(filename, file, {
            access: 'public',
        });

        const existingApplication = await Application.findOne({ jobId });
        if (existingApplication) {

            existingApplication.applications.push({
                name,
                shortIntro,
                resumeUrl: blob.url
            });

            await existingApplication.save();
            return NextResponse.json({ message: "Application Successful" }, { status: 200 });

        } else {
            return NextResponse.json({}, { status: 409, statusText: 'Job not found' });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Server Error' }, { status: 500 });
    }
}
