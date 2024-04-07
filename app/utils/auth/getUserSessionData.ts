import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { auth, currentUser } from "@clerk/nextjs";
import UserController from "@/app/controllers/users/users.controller";

// Define the structure for company object
interface ICompany {
    name: string;
    description: string;
}

// Define the structure for the session information
export interface ISessionInformation {
    userId: string;
    accessToken: string;
    idToken: string;
    email: string;
    profileImg: string;
    authProviderIdentifier: string;
    customerCache: {
        name: string;
        company: ICompany; // Reference the ICompany interface here
    };
}

export const getSessionInformation = async (request?: NextRequest, lean?: boolean): Promise<ISessionInformation | any> => {

    const authSessionData: any = request ? getAuth(request) : auth();

    const { sessionClaims: { email, profileImg, userId } } = authSessionData;
    if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401, statusText: "Unauthorized" });

    try {
        const userProfileData = await UserController.getUserDetails(email, undefined, lean);
        const { id, company, name } = userProfileData;
        return {
            userId: id,
            accessToken: '',
            idToken: '',
            email: email,
            profileImg,
            authProviderIdentifier: userId,
            customerCache: {
                name,
                company: { ...company },
                ...userProfileData
            }
        };
    } catch (error) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401, statusText: "Unauthorized" });
    }
};
