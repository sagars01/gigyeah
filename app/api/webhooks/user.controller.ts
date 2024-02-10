// UserController.ts
import userModel from "@/app/models/user/user.model";
import dbConnect from "@/libs/mongodb";

type WebhookUserPayload = {
    id: string;
    email_addresses: Array<{
        email_address: string;
        id: string;
        linked_to: string[];
        object: string;
        verification: {
            status: string;
            strategy: string;
        };
    }>;
    first_name: string;
    last_name: string;
    created_at: number;
};

export const handleUserCreated = async (payload: WebhookUserPayload) => {
    try {
        await dbConnect();
        const User = userModel;
        const userDoc = {
            authProviderIdentifier: payload.id,
            name: `${payload.first_name} ${payload.last_name}`,
            email: payload.email_addresses[0]?.email_address || '',
            createdAt: new Date(payload.created_at),
            authProviderMetaData: payload,
        };

        const newUser = new User(userDoc);
        await newUser.save();
        console.log('User created successfully');
    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Failed to create user');
    }
};

export const handleUserUpdated = async (payload: WebhookUserPayload) => {
    try {
        await dbConnect();
        const User = userModel;
        const updateDoc = {
            name: `${payload.first_name} ${payload.last_name}`,
            email: payload.email_addresses[0]?.email_address || '',
            authProviderMetaData: payload,
        };

        await User.findOneAndUpdate({ authProviderIdentifier: payload.id }, updateDoc);
        console.log('User updated successfully');
    } catch (error) {
        console.error('Error updating user:', error);
        throw new Error('Failed to update user');
    }
};

export const handleUserDeleted = async (id: string) => {
    try {
        await dbConnect();
        const User = userModel;
        await User.findOneAndDelete({ authProviderIdentifier: id });
        console.log('User deleted successfully');
    } catch (error) {
        console.error('Error deleting user:', error);
        throw new Error('Failed to delete user');
    }
};
