/**
 * @description This route is only for LOGGED IN USER
 * 
 */

export const dynamic = 'force-dynamic';

// TODO: Write the middleware to validate if the email and the userId from the cookie matches. This will prevent tampering of the data

import dbConnect from "@/libs/mongodb";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import jobsModel from "@/app/models/job/jobs.model";
import { getCookies } from "@/utils/auth/getCookies";

export async function GET(request: NextRequest) {

    await dbConnect();

    try {
        if (request.method !== 'GET') {
            NextResponse.json({ error: 'Method Not Allowed' }, { status: 409 });
        }

        const userData = getCookies(request);
        if (!userData) {
            return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
        }


        // Check if the ID is a valid ObjectId
        const jobId = request.nextUrl.searchParams.get("jobId") as string;
        if (jobId && !mongoose.Types.ObjectId.isValid(jobId)) {
            return NextResponse.json({ message: 'Invalid job ID' }, { status: 400 });
        }

        // If there is no jobId return every job the user has created
        if (!jobId) {
            const jobs = await jobsModel.find({ createdBy: userData.userId });
            return NextResponse.json(jobs, { status: 200, statusText: "OK" })
        }

        // Fetch the specific job
        const job = await jobsModel.findOne({ _id: jobId, createdBy: userData.userId }).sort({ postedAt: 1 });

        if (!job) {
            return NextResponse.json({ message: 'Job not found' }, { status: 404 });
        }

        return NextResponse.json(job, { status: 200, statusText: "OK" })

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
};