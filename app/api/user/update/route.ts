import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/job/user.model";
import { runValidation } from "./validator";
import { MongooseError } from "mongoose";
import dbConnect from "@/libs/mongodb";

export async function POST(request: NextRequest) {

    if (request.method === 'POST') {
        await dbConnect();

        /**
         * Use the firebase admin to validate the token
         * After validation use the token and the email address to get the id.
         * Use the authProviderId to find and update the user.
         * 
         * Should I depend on external id to update the values. Never.
         * 
         */

        // TODO: Write middleware.
        try {
            const email = 'get-email-from-token';
            const { data, errors } = await runValidation(request);
            if (!data) {
                return NextResponse.json({ error: errors }, { status: 400, statusText: 'Validation Error' });
            }

            const userData = {
                name: data.name,
                title: data.title,
                intro: data.intro,
                company: {
                    name: data.company.name,
                    description: data.company.description,
                }
            };

            const updateUser = await User.findOneAndUpdate({ email: email }, userData, { new: true });

            // TODO: Remove sensitive information from the response.

            if (!updateUser) {
                return NextResponse.json({ error: 'User not found or update failed' }, { status: 404 });
            }

            return NextResponse.json({ user: updateUser }, { status: 200, statusText: "User updated Successfully" });
        } catch (error) {
            console.error(error);
            return NextResponse.json({ error: 'Unexpected Server Error' }, { status: 500 });
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