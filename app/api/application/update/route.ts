import { NextRequest, NextResponse } from "next/server";
import ApplicationsController from "@/app/libs/controllers/applications/applications.controller";
import { ISessionInformation, getSessionInformation } from "@/app/utils/auth/getUserSessionData";
import ValidationSchema from "./requestValidator";
import logger from "@/app/utils/logging/logger";

// TODO: Check if the application Id and the JobId matches

export async function PUT(request: NextRequest) {
    const userDetails: ISessionInformation = await getSessionInformation(request);
    const userIdFromSession = userDetails?.userId;

    try {
        const body = await request.json();
        const { status, applicantId } = body;

        const { error } = await ValidationSchema.validate(body)

        if (error) {
            const errResponse = {
                errors: error.details.map((detail: { message: any; path: any }) => ({
                    message: detail.message,
                    path: detail.path,
                })),
            };
            return NextResponse.json({ error: { ...errResponse } }, { status: 419, statusText: "Validation Failed!" });
        }


        const updatedApplication = await ApplicationsController.updateApplicationStatus(applicantId, status, userIdFromSession);

        if (!updatedApplication) {
            return NextResponse.json({ error: 'Failed to update application status' }, { status: 500 });
        }

        return NextResponse.json({ ...updatedApplication }, { status: 200 });
    } catch (error) {
        logger.error(error);
        return NextResponse.json({ error: 'Failed to update application status' }, { status: 500 });
    }
}