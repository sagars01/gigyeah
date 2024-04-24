import JobController from "@/app/libs/controllers/jobs/jobs.controller";
import { getSessionInformation } from "@/app/utils/auth/getUserSessionData";
import Unauthorized from "@/app/libs/components/reusables/unauthorized";
import { Suspense } from "react";
import DashboardLayout from "@/app/dashboard/components/common/dashboard.layout";
import ApplicantManagement from "../../../components/manage/ApplicantManagement"
import { IJob } from "@/app/libs/models/job/jobs.model";
import DashboardHeader from "@/app/dashboard/components/common/dashboard.header";
import URL from "@/app/utils/constants/url/url";
import { Loading3QuartersOutlined } from "@ant-design/icons";



async function JobDetails({ id, jobId }: { id: string, jobId: string }) {
    const jobDetails = await JobController.getJobsById(jobId);
    const links = [
        { title: "Dashboard", link: URL.dashboard.root, isActive: false },
        { title: "Profile", link: URL.user.profile, isActive: false },
        { title: "Manage Application", link: '', isActive: true },
        { title: "Repository", link: '/repository', isActive: false },
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
                    content={<ApplicantManagement jobId={jobId} jobDesc={description} jobTitle={title} />} />
            </>
        )
    }
    return true;
}

export default async function Page({ params: { jobId } }: { params: { jobId: string } }) {
    const userDetails = await getSessionInformation();
    return (
        <>

            <Suspense fallback={<Loading3QuartersOutlined />}>
                <JobDetails id={userDetails.userId} jobId={jobId} />
            </Suspense>
        </>
    )
}