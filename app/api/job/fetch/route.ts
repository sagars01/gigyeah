import dbConnect from "@/libs/mongodb";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import jobsModel from "@/app/models/job/jobs.model";

export async function GET(request: NextRequest) {

    await dbConnect();

    try {
        if (request.method !== 'GET') {
            NextResponse.json({ error: 'Method Not Allowed' }, { status: 409 });
        }
        // Check if the ID is a valid ObjectId
        const jobId: any = request.nextUrl.searchParams.get("jobId");
        if (!mongoose.Types.ObjectId.isValid(jobId)) {
            return NextResponse.json({ message: 'Invalid job ID' }, { status: 400 });
        }

        const job = await jobsModel.findById(jobId);

        if (!job) {
            return NextResponse.json({ message: 'Job not found' }, { status: 404 });
        }

        return NextResponse.json(job)

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
};

