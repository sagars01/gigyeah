import { NextRequest } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import UserController from "@/controllers/users/users.controller";

// TODO: Phase 2 - Cache the customer information based on session id

export const getSessionInformation = async (request: NextRequest) => {

    const authSessionData: any = getAuth(request);

    const { sessionClaims: {
        email, profileImg, userId
    } } = authSessionData;
    if (!userId) return false;

    try {
        const userProfileData = await UserController.getUserDetails(email);
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
                company: { ...company }
            }
        }
    } catch (error) {
        return {
            statusText: "Failed to generate session information",
            status: 401
        }
    }




}

// TODO: Show notifications to users to create profile before creating jobs