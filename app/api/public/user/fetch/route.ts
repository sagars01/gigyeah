import UserController from "@/app/controllers/users/users.controller";
import dbConnect from "@/app/libs/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { RequestValidationSchema } from "./requestValidator";

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


        const userData = await UserController.getUserDetailsPublic(userId);
        return NextResponse.json({
            ...userData
        }, {
            status: 200,
            statusText: "OK"
        })
    } catch (error: any) {

        return NextResponse.json({
            error: error?.message || "Internal Server Error"
        }, {
            status: error?.status || 500,
            statusText: error?.statusText || 'Internal Server Error'
        })

    }
}