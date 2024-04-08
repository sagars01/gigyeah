import { NextRequest, NextResponse } from "next/server";
import { getSessionInformation } from "@/app/utils/auth/getUserSessionData";

export async function GET(request: NextRequest) {
    try {
        const userSessionInformation = await getSessionInformation(request, true);
        const { profileImg } = userSessionInformation;
        const { name, title, email, company, socialMedia, intro, _id } = userSessionInformation.customerCache;

        return NextResponse.json({
            id: _id,
            name,
            title,
            email,
            company,
            socialMedia,
            intro,
            image_url: profileImg

        }, {
            status: 200,
            statusText: "OK"
        })

    } catch (error: any) {

        return NextResponse.json({
            error: error?.message || "Internal Server Error"
        }, {
            status: error?.status || 500,
            statusText: error?.statusText || 'Internal Server Error'
        })
    }
}