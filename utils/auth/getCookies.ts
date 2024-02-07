import { NextRequest } from "next/server";

export const getCookies = (request: NextRequest) => {
    return {
        userId: '65c30b602c41727f4abfd5fb',
        accessToken: '',
        idToken: '',
        email: 'sagarmoy-jobAPI@test.com',
        authProviderIdentifier: 'test-accounts'
    }
}