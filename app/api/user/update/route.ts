/**
 * @description updates user profile after the user has logged in using Google Auth.
 */

import { NextRequest, NextResponse } from "next/server";
import User from "@/app/libs/models/user/user.model";
import { UpdateUserValidatorSchema } from "./validator";
import dbConnect from "@/app/libs/mongodb";
import { ISessionInformation, getSessionInformation } from "@/app/utils/auth/getUserSessionData";
import UserController from "@/app/libs/controllers/users/users.controller";

export async function POST(request: NextRequest) {

    // TODO: Fix the user Profile update so that the image doesn't get updated on Input change

    /**
     * @description Allow Users to update there First Name Last Name and the social links in the application
     * 
     */
    if (request.method === 'POST') {
        await dbConnect();
        try {

            const userDetail: ISessionInformation = await getSessionInformation(request);

            const body = await request.json();
            const { error, value: sanitizedData } = await UpdateUserValidatorSchema.validate(body);
            if (error) {
                return NextResponse.json({ error }, { status: 422, statusText: 'Validation Error' });
            }

            const updateUser = await UserController.handleUserProfileUpdateFromUI(userDetail.userId, sanitizedData)

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