export const dynamic = 'force-dynamic';

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

        // Extract user ID from cookies
        // TODO: Hardcoded values of the user id
        const userId = "65c30b602c41727f4abfd5fb"; // request.cookies.get('userId');
        if (!userId) {
            return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
        }


        // Check if the ID is a valid ObjectId
        const jobId: any = request.nextUrl.searchParams.get("jobId");
        if (jobId && !mongoose.Types.ObjectId.isValid(jobId)) {
            return NextResponse.json({ message: 'Invalid job ID' }, { status: 400 });
        }

        // If there is no jobId return every job the user has created
        if (!jobId) {
            const jobs = await jobsModel.find({ createdBy: userId });
            return NextResponse.json(jobs, { status: 200, statusText: "OK" })
        }

        // Fetch the specific job
        const job = await jobsModel.findOne({ _id: jobId, createdBy: userId });

        if (!job) {
            return NextResponse.json({ message: 'Job not found' }, { status: 404 });
        }

        return NextResponse.json(job, { status: 200, statusText: "OK" })

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
};