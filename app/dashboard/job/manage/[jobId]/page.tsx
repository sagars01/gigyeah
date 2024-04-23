import JobController from "@/app/libs/controllers/jobs/jobs.controller";
import { getSessionInformation } from "@/app/utils/auth/getUserSessionData";
import Loading from "@/app/libs/components/reusables/loading";
import Unauthorized from "@/app/libs/components/reusables/unauthorized";
import { Suspense } from "react";
import DashboardLayout from "@/app/dashboard/components/common/dashboard.layout";
import ApplicationList from "../../../components/manage/ApplicationList";
import ApplicantManagement from "../../../components/manage/ApplicantManagement"
import { IJob } from "@/app/libs/models/job/jobs.model";
import DashboardHeader from "@/app/dashboard/components/common/dashboard.header";
import URL from "@/app/utils/constants/url/url";



async function JobDetails({ id, jobId }: { id: string, jobId: string }) {
    const jobDetails = await JobController.getJobsById(jobId);

    const links = [
        { title: "Dashboard", link: URL.dashboard.root, isActive: false },
        { title: "Profile", link: URL.user.profile, isActive: false },
        { title: "Manage Application", link: '', isActive: true },
    ];

    const HeaderOptions = () => (
        <div className="flex justify-end">
            <DashboardHeader links={links} />
        </div>
    )


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
                    header={<HeaderOptions />}
                    content={<ApplicantManagement jobId={jobId} />} />
            </>
        )
    }
    return true;
}

export default async function Page({ params: { jobId } }: { params: { jobId: string } }) {
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