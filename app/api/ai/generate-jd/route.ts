import AIJDGenerate from "@/app/libs/controllers/ai/generate_jd.controller";

import logger, { LogLevel } from "@/app/utils/logging/logger";
import { AxiosRequestConfig } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const LOG_LEVEL = process.env.LOG_LEVEL;
    try {

        logger.log(LogLevel.INFO, "API AI Generate JD: Request Received")
        const bearerToken = request.cookies.get('__session')?.value;
        const {
            job_title,
            mandatory_skills
        } = await request.json();

        if (!job_title || !mandatory_skills) {
            return NextResponse.json({
                message: "FAILED",
                reason: "Missing required parameters"
            }, {
                status: 400,
                statusText: "Invalid_Request"
            })
        }


        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${bearerToken}`
            }
        }
        if (LOG_LEVEL === "debug") {
            logger.log(LogLevel.INFO, config.headers?.Authorization)
        }
        logger.log(LogLevel.INFO, "API AI Summarize: Sent to AI Engine")
        const summary = await AIJDGenerate.getJobDescription(job_title,
            mandatory_skills, config);
        return NextResponse.json(summary)
    } catch (error: any) {
        logger.error(LogLevel.FATAL, `Failed to generate response : ${error}`)
        return NextResponse.json({
            message: "FAIL",
            reason: error
        }, {
            status: error?.status || 500,
            statusText: error || "Internal Server Error"
        })
    }
};
