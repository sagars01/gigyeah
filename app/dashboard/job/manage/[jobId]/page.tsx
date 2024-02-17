import JobController from "@/controllers/jobs/jobs.controller";
import { getSessionInformation } from "@/utils/auth/getUserSessionData";
import Loading from "@/libs/components/reusables/loading";
import Unauthorized from "@/libs/components/reusables/unauthorized";
import { Layout } from "antd";
import { NextRequest } from "next/server";
import { Suspense } from "react";


async function JobDetails({ id, jobId }: { id: string, jobId: string }) {
    const jobDetails = await JobController.getJobsById(jobId);
    if (jobDetails?.createdBy.id !== id) {
        return (
            <>
                <Unauthorized />
            </>
        )
    } else {
        return (
            <>
                <Layout />
            </>
        )
    }
    return true;
}

export default async function Page({ params: { jobId } }: { params: { jobId: string } }, request: NextRequest) {
    const userDetails = await getSessionInformation();
    return (
        <>

            <Suspense fallback={<Loading />}>
                <JobDetails id={userDetails.userId} jobId={jobId} />
            </Suspense>
        </>
    )
}

// TODO : Test the negative condition
/**
 * @description Create a new user and create a new job and try to use the latest jobId with another user in the UI 
 * 
 */