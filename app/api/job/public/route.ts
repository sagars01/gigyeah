/**
 * @description This route is only for PUBLIC USER
 */

export const dynamic = 'force-dynamic';

// TODO: Write the middleware to validate if the email and the userId from the cookie matches. This will prevent tampering of the data

import dbConnect from "@/libs/mongodb";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import jobsModel from "@/app/models/job/jobs.model";
import { getCookies } from "@/utils/auth/getCookies";
import userModel from "@/app/models/user/user.model";


const getJobWithCreator = async (jobId: string) => {
    await dbConnect();
    const job = await jobsModel.findById(jobId)
        .populate({
            path: 'createdBy',
            model: userModel,
            select: 'name company -_id'
        })
        .lean();
    return job;
};

export async function GET(request: NextRequest) {

    await dbConnect();

    try {
        if (request.method !== 'GET') {
            NextResponse.json({ error: 'Method Not Allowed' }, { status: 409 });
        }

        // Check if the ID is a valid ObjectId
        const jobId = request.nextUrl.searchParams.get("jobId") as string;
        if (jobId && !mongoose.Types.ObjectId.isValid(jobId)) {
            return NextResponse.json({ message: 'Invalid job ID' }, { status: 400 });
        }

        // Fetch the specific job
        const job = await getJobWithCreator(jobId as string);

        if (!job) {
            return NextResponse.json({ message: 'Job not found' }, { status: 404 });
        }

        return NextResponse.json(job, { status: 200, statusText: "OK" })

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
};