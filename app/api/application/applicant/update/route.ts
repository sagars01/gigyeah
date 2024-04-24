import ApplicationsController from "@/app/libs/controllers/applications/applications.controller";
import { ISessionInformation, getSessionInformation } from "@/app/utils/auth/getUserSessionData";
import logger from "@/app/utils/logging/logger";
import { request } from "http";
import { NextRequest, NextResponse } from "next/server";
import ValidationSchema from './requestValidator'
import ApplicantController from "@/app/libs/controllers/applicant/applicant.controller";
import { handleError } from "@/app/utils/logging/errorHandler";

export async function POST(request: NextRequest) {
    const userDetails: ISessionInformation = await getSessionInformation(request);
    // const userIdFromSession = userDetails?.userId;

    try {
        const body = await request.json();
        const applicantId = request.nextUrl.searchParams.get("applicantId") as string;
        if (!applicantId) {
            return NextResponse.json({
                error: true,
                message: 'missing applicantId'
            }, {
                status: 419
            })
        }

        // const { error, value } = await ValidationSchema.validate(body)

        // if (error) {
        //     const errResponse = {
        //         errors: error.details.map((detail: { message: any; path: any }) => ({
        //             message: detail.message,
        //             path: detail.path,
        //         })),
        //     };
        //     return NextResponse.json({ error: { ...errResponse } }, { status: 419, statusText: "Validation Failed!" });
        // }

        // TODO : Validate if the userId is the owner of the applicant id

        const updatedApplication = await ApplicantController.UpdateApplicantData(applicantId, body)

        return NextResponse.json({ ...updatedApplication }, { status: 200 });
    } catch (error: any) {
        logger.error(error);
        const errorModel = handleError(error)
        return NextResponse.json({ error: true, message: errorModel.statusText }, { status: errorModel.status, statusText: errorModel.statusText });
    }
}