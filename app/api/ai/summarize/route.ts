import AISummarize from "@/app/libs/controllers/ai/summarize.controller";
import { getSessionInformation } from "@/app/utils/auth/getUserSessionData";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const userInformation = await getSessionInformation(request);
        if (userInformation.subscriptionLevel === 0) {
            return NextResponse.json({
                message: "FAILED",
                reason: "User is not a premium user"
            })
        }
        const {
            resumeUrl,
            jobDescription
        } = await request.json();

        if (!resumeUrl || !jobDescription) {
            return NextResponse.json({
                message: "FAILED",
                reason: "Missing required parameters"
            }, {
                status: 400,
                statusText: "Invalid_Request"
            })
        }

        if (resumeUrl && !resumeUrl.startsWith("https://")) {
            return NextResponse.json({
                message: "FAILED",
                reason: "Invalid resume URL"
            }, {
                status: 400,
                statusText: "Invalid_Request"
            })
        }

        const summary = await AISummarize.getSummary(resumeUrl, jobDescription);
        return NextResponse.json({
            ...summary
        })
    } catch (error: any) {
        return NextResponse.json({
            message: "FAIL",
            reason: error
        }, {
            status: 500,
            statusText: error || "Internal Server Error"
        })
    }
};
