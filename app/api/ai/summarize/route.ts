import AISummarize from "@/app/controllers/ai/summarize.controller";
import { getSessionInformation } from "@/app/utils/auth/getUserSessionData";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const userInformation = await getSessionInformation(request);
        if (userInformation.subscriptionLevel === 0) {
            return NextResponse.json({
                message: "FAILED",
                reason: "User is not a premium user"
            })
        }
        const applicantionId = request.nextUrl.searchParams.get("applicantionId") as string;
        const summary = await AISummarize.getSummary(applicantionId);
        return NextResponse.json({
            summary: summary
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
