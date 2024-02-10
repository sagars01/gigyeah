import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { NextResponse, NextRequest } from 'next/server'
import { handleUserCreated, handleUserDeleted, handleUserUpdated } from './user.controller'

export async function POST(req: NextRequest) {

    const WEBHOOK_SECRET = process.env.USER_EVT_WEBHOOK_SECRET

    if (!WEBHOOK_SECRET) {
        throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
    }

    // Get the headers
    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return NextResponse.json({ message: "SVIX Header Error" }, { status: 400 })
    }

    // Get the body
    const payload = await req.json()

    // Create a new Svix instance with your secret.

    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent

    try {
        const verifiedPayload: any = wh.verify(JSON.stringify(payload), {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        })
        switch (verifiedPayload.type) {
            case "user.created":
                await handleUserCreated(verifiedPayload.data);
                return NextResponse.json({ message: "User created successfully" }, { status: 200 });
            case "user.updated":
                await handleUserUpdated(verifiedPayload.data);
                return NextResponse.json({ message: "User updated successfully" }, { status: 200 });
            case "user.deleted":
                // Assuming the payload contains an 'id' for deletion
                await handleUserDeleted(verifiedPayload.data.id);
                return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
            default:
                return NextResponse.json({ message: "Event type not handled" }, { status: 200 });
        }
    } catch (err) {
        console.error('Error verifying webhook:', err);
        return NextResponse.json({ message: err }, { status: 500 })
    }
}
