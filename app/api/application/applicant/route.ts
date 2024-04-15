import { NextRequest, NextResponse } from "next/server";
import ApplicationsController from "@/app/libs/controllers/applications/applications.controller";
import { ISessionInformation, getSessionInformation } from "@/app/utils/auth/getUserSessionData";


export async function GET(request: NextRequest) {


    const url = new URL(request.url);
    const applicationId = url.searchParams.get("applicationId")
    if (!applicationId) {
        return NextResponse.json({ applicants: null, error: "Invalid Application Id" }, { status: 400, statusText: "Bad Request" })
    }

    try {
        const userDetails: ISessionInformation = await getSessionInformation(request);

        const userIdFromSession = userDetails?.userId;

        const applicationDetails: any = await ApplicationsController.getApplicationById(applicationId as string);

        if (applicationDetails.ownerId.toString() !== userIdFromSession) {
            return NextResponse.json({ applicants: null, error: "Unauthorized" }, { status: 401, statusText: "Unauthorized" })
        } else {
            return NextResponse.json({ applicationDetails, error: null }, { status: 200, statusText: "OK" })

        }

    } catch (error) {
        return NextResponse.json({ applicants: null, error: error }, { status: 500, statusText: "FAIL" })
    }


}