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
        const jobId = searchParams.get('jobId') as string;

        const blob = await put(filename, request.body, {
            access: 'public',
        });

        const application = new Application({
            jobId,
            resumeUrl: blob.url
        })

        await application.save();

        return NextResponse.json({ message: "Application Successful" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Server Error' }, { status: 500 });
    }
}
