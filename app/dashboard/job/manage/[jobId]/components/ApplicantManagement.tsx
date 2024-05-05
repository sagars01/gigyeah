"use client"

import NonStrictDndProvider from "@/app/utils/ui/StrictModeProvider"
import DragAndDropColumns from "./DnD"

const ApplicantManagement: React.FC<Props> = () => {
    return (
        <>
            <NonStrictDndProvider>
                <DragAndDropColumns />
            </NonStrictDndProvider>
        </>
    )
}

export default ApplicantManagement

interface Props {

}