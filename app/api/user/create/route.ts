import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/user/user.model";
import { MongooseError } from "mongoose";
import dbConnect from "@/libs/mongodb";

/**
 * 
 * @param request 
 * @returns 
 * @description creates a new user with default values in the system. This is stage 1.
 */

export async function POST(request: NextRequest) {

    if (request.method === 'POST') {
        await dbConnect();
        try {
            // TODO: Get every data from the token as got from the session cookie and the Firebase API from middleware
            const data = {
                email: "sagarmoy-jobAPI@test.com",
                authProviderIdentifier: 'test-account-1'
            };

            const userData = {
                email: data.email,
                authProviderIdentifier: data.authProviderIdentifier
            }
            const newUser = new User(userData);
            await newUser.save();
            return NextResponse.json(newUser, { status: 201, statusText: "User created Successfully" });
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