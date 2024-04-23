import { Button, Card, Col, Row, Space, Spin } from "antd";
import DetailedJob from "./DetailedJobs";
import { ArrowRightOutlined, LoadingOutlined, PlusOutlined, RightOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import CreateJobDrawer from "../job/createJob";
import URL from "@/app/utils/constants/url/url";

import OverviewSection from "./Overview";
import { apiService } from "@/app/libs/request/apiservice";


const MainAdminDashboard = () => {
    const [shouldFetchJobs, setFetchJob] = useState(false);
    const [openJobs, setOpenJobs] = useState([]);
    const [closedJobs, setClosedJobs] = useState([]);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [allJobsData, setAllJobsData] = useState([]);
    const showDrawer = () => {
        setOpenDrawer(true)
    }

    const [loading, setLoading] = useState(false);



    const getOpenJobs = async () => {
        try {
            setLoading(true)
            const response: any = await apiService.get(URL.api.private.jobs.fetch);
            const jobs: any = response.jobs; // Assuming this is how you get jobs from your api response
            setAllJobsData(jobs);
            const closedJob: any = [];
            const openJobs: any = [];
            jobs.forEach((job: any) => {
                if (job.status === 'expired') {
                    closedJob.push(job);
                } else if (job.status === 'active') {
                    const openJob = {
                        key: job._id,
                        jobTitle: job.title,
                        numOfApplicants: job.applicationCount || 0, // Assuming you have this data or calculate it
                        dateOfPosition: new Date(job.postedAt).toLocaleDateString(),
                        manage: job.status
                    }
                    openJobs.push(openJob)
                }
            });
            setOpenJobs(openJobs);
            setClosedJobs(closedJob);
        } catch (error) {
            setOpenJobs([]);
            setClosedJobs([]);
            console.error("Failed to fetch jobs:", error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getOpenJobs();
    }, [shouldFetchJobs])


    const onDrawerClose = () => {
        setOpenDrawer(false)
    }

    const onJobCreatedSuccessfully = (response: any) => {
        setFetchJob(true);
        setOpenDrawer(false);
    }


    const CreateNewJob = () => {
        return (
            <>

                <div className="flex justify-end mb-4"> {/* Utilizing flexbox for alignment */}
                    <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
                        Create New Job
                    </Button>
                </div>
            </>
        )
    }

    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
    return (
        <>
            <div className="container mx-auto">
                {
                    loading ? (
                        <div className="flex justify-center items-center h-screen">
                            <Spin indicator={antIcon} />
                        </div>
                    ) : (
                        <>
                            <CreateJobDrawer jobCreatedEvt={onJobCreatedSuccessfully} openDrawer={openDrawer} onDrawerClose={onDrawerClose} />

                            <CreateNewJob />
                            <OverviewSection openJobs={openJobs} closedJobs={closedJobs} />
                            <DetailedJob openJobs={openJobs} allJobsData={allJobsData} />
                        </>
                    )
                }
            </div>

        </>
    )

}
export default MainAdminDashboard;