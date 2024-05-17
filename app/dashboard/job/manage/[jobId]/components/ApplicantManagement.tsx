"use client"

import NonStrictDndProvider from "@/app/utils/ui/StrictModeProvider"
import DragAndDropColumns from "./DnD"
import Title from "antd/es/typography/Title"
import Paragraph from "antd/es/typography/Paragraph"
import { useState } from "react"
import { Divider } from "antd"
import StatusCols from "./StatusCols"

const ApplicantManagement: React.FC<Props> = ({ job, userId }) => {
    const [rows, setRows] = useState(2);
    return (
        <>

            <div>
                <Title level={2} >{job.title}</Title>
                <Paragraph ellipsis={{
                    rows,
                    expandable: true,
                }}
                >{job.description}</Paragraph>
            </div>
            <Divider></Divider>
            <NonStrictDndProvider>
                {/* <DragAndDropColumns jobDetails={job} userId={userId} /> */}
                <StatusCols jobDetails={job} userId={userId} />
            </NonStrictDndProvider>
        </>
    )
}

export default ApplicantManagement

interface Props {
    job: any;
    userId: string;
}