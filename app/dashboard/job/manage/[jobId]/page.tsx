import JobController from "@/app/controllers/jobs/jobs.controller";
import { getSessionInformation } from "@/app/utils/auth/getUserSessionData";
import Loading from "@/app/libs/components/reusables/loading";
import Unauthorized from "@/app/libs/components/reusables/unauthorized";
import { NextRequest } from "next/server";
import { Suspense } from "react";
import DashboardLayout from "@/app/libs/components/reusables/dashboard.layout";
import ApplicationList from "./ApplicationList";
import ContentHeader from "./ContentHeader";
import { IJob } from "@/app/models/job/jobs.model";


async function JobDetails({ id, jobId }: { id: string, jobId: string }) {
    const jobDetails = await JobController.getJobsById(jobId);

    const { title, description } = jobDetails as IJob
    if (jobDetails?.createdBy.id !== id) {
        return (
            <>
                <Unauthorized />
            </>
        )
    } else {
        return (
            <>
                <DashboardLayout
                    header={<ContentHeader jobTitle={title} jobDesc={description} />}
                    content={<ApplicationList jobId={jobId} />} />
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