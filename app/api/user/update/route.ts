/**
 * @description updates user profile after the user has logged in using Google Auth.
 */

import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/user/user.model";
import { UpdateUserValidatorSchema } from "./validator";
import dbConnect from "@/libs/mongodb";

export async function POST(request: NextRequest) {

    if (request.method === 'POST') {
        await dbConnect();

        // TODO: Write middleware.
        try {
            const email = 'sagarmoysengupta@owner.com';
            const body = await request.json();
            const { error, value: data } = await UpdateUserValidatorSchema.validate(body);
            if (error) {
                return NextResponse.json({ error }, { status: 422, statusText: 'Validation Error' });
            }
            const updateUser = await User.findOneAndUpdate({ email: email }, { ...data });

            if (!updateUser) {
                return NextResponse.json({ error: 'User not found or update failed' }, { status: 404 });
            }

            return NextResponse.json(
                { status: "OK", statusText: "User updated Successfully" },
                { status: 201, statusText: "User profile updated!" }
            );

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