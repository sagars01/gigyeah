import { NextRequest, NextResponse } from "next/server";
import User, { IUserModel } from "@/app/models/job/user.model";
import { runValidation } from "./validator";
import { MongooseError } from "mongoose";
import dbConnect from "@/libs/mongodb";

export async function POST(request: NextRequest) {

    if (request.method === 'POST') {
        await dbConnect();
        try {
            // Parse the request body
            const { data, errors } = await runValidation(request);
            if (!data) {
                return NextResponse.json({ error: errors }, { status: 400, statusText: 'Validation Error' })
            }

            const userData = {
                name: data.name,
                title: data.title,
                email: data.email,
                intro: data.intro,
                company: data.company
            }
            const newUser = new User(userData);
            await newUser.save();
            return NextResponse.json(newUser, { status: 200, statusText: "User created Successfully" });
        } catch (error: any) {
            let message = "Unexpected Server Error";
            let status = 500;

            if (error instanceof MongooseError) {
                message = error.message;
                status = 409
            }

            if (error?.code === 11000) {
                message = "User already exists"
                status = 409;
            }
            return NextResponse.json({ error: message }, { status, statusText: message });
        }
    } else {

        const requestHeaders = new Headers(request.headers);

        const response = NextResponse.next({
            request: {
                headers: requestHeaders
            }
        })

        response.headers.set('Allow', 'POST')
        return response;
    }

}