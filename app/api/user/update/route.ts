/**
 * @description updates user profile after the user has logged in using Google Auth.
 */

import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/user/user.model";
import { UpdateUserValidatorSchema } from "./validator";
import dbConnect from "@/libs/mongodb";
import { ISessionInformation, getSessionInformation } from "@/utils/auth/getUserSessionData";
import UserController from "@/controllers/users/users.controller";

export async function POST(request: NextRequest) {

    // TODO: Fix the user Profile update

    /**
     * @description Allow Users to update there First Name Last Name and the social links in the application
     * 
     */
    if (request.method === 'POST') {
        await dbConnect();
        try {

            const userDetail: ISessionInformation = await getSessionInformation(request);

            const body = await request.json();
            const { error, value: data } = await UpdateUserValidatorSchema.validate(body);
            if (error) {
                return NextResponse.json({ error }, { status: 422, statusText: 'Validation Error' });
            }

            const payload: any = {
                id: userDetail.userId,
                profileUpdates: body
            }
            const updateUser = await UserController.handleUserUpdated(payload)

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