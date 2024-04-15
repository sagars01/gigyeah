import UserController from "@/app/libs/controllers/users/users.controller";
import dbConnect from "@/app/libs/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { RequestValidationSchema } from "./requestValidator";
import logger, { LogLevel } from "@/app/utils/logging/logger";

export async function GET(request: NextRequest) {
    const userId = request.nextUrl.searchParams.get("userId") as string;

    if (!userId) {
        return NextResponse.json({
            message: 'No userId found'
        }, {
            status: 400,
            statusText: 'Bad Request'
        })
    }

    await dbConnect();
    try {

        const { error } = RequestValidationSchema.validate({
            userId
        });

        if (error) {
            return NextResponse.json({ error: error.details[0].message }, { status: 419, statusText: "Validation Failed!" });
        }

        logger.log(LogLevel.INFO, 'profile fetch request received')
        const userData = await UserController.getUserDetailsPublic(userId);
        logger.log(LogLevel.INFO, 'profile fetch success!')
        return NextResponse.json({
            ...userData
        }, {
            status: 200,
            statusText: "OK"
        })
    } catch (error: any) {
        logger.log(LogLevel.ERROR, 'profile fetch request failed: ' + error)
        return NextResponse.json({
            message: error?.message || "Internal Server Error",
            data: error?.data || null
        }, {
            status: error?.status || 500,
            statusText: error?.statusText || 'Internal Server Error'
        })

    }
}