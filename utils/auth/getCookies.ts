import { NextRequest } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { currentUser } from '@clerk/nextjs';

export const getSessionInformation = async (request: NextRequest) => {

    const authSessionData = getAuth(request);
    const user = await currentUser();
    const { userId } = authSessionData;
    if (!userId) return false;

    return {
        userId: userId,
        accessToken: '',
        idToken: '',
        email: user?.emailAddresses[0].emailAddress,
        authProviderIdentifier: userId
    }
}

// TODO: Show modal to users to create profile before creating jobs