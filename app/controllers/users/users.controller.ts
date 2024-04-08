import userModel, { IUserModel } from "@/app/models/user/user.model";
import jobsModel from "@/app/models/job/jobs.model";
import dbConnect from "@/app/libs/mongodb";
import mongoose from "mongoose";

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

class UserController {

    static async getUserDetails(email?: string, userId?: string, lean?: boolean): Promise<any> {
        await dbConnect();
        try {
            let query = {};
            if (email) query = { ...query, email: email };
            if (userId) query = { ...query, _id: new mongoose.Types.ObjectId(userId) };

            let user;
            if (lean) {
                user = await userModel.findOne(query).lean();
            } else {
                user = await userModel.findOne(query);
            }
            if (!user) {
                console.log('User not found');
                return null;
            }
            console.log('User details retrieved successfully');
            return user;
        } catch (error) {
            console.error('Error retrieving user details:', error);
            throw new Error('Failed to retrieve user details');
        }
    }
    static async getUserDetailsPublic(userId?: string): Promise<any> {
        await dbConnect();
        try {
            let query = {};
            if (userId) query = { _id: new mongoose.Types.ObjectId(userId) };

            const user: any = await userModel.findOne(query).select('-authProviderIdentifier').lean();
            const userImageUrl = user.authProviderMetaData.image_url;
            delete user.authProviderMetaData;
            const leanUpdatedUser = {
                ...user,
                image_url: userImageUrl
            }
            if (!user) {
                console.log('User not found');
                return null;
            }

            // Fetch all jobs created by this user
            const jobs = await jobsModel.find({ "createdBy.id": userId }).lean();

            const jobDetails = {
                active: jobs.filter(job => job.status === 'active'),
                expired: jobs.filter(job => job.status === 'expired')
            };

            console.log('User details and job details retrieved successfully');
            return { userDetails: leanUpdatedUser, jobDetails: jobDetails };
        } catch (error) {
            console.error('Error retrieving user and job details:', error);
            throw new Error('Failed to retrieve user and job details');
        }
    }


    static async handleUserCreated(payload: WebhookUserPayload): Promise<void> {
        await dbConnect();
        try {
            const userDoc = {
                authProviderIdentifier: payload.id,
                name: `${payload.first_name} ${payload.last_name}`,
                email: payload.email_addresses[0]?.email_address || '',
                createdAt: new Date(payload.created_at),
                authProviderMetaData: payload,
            };
            const newUser = new userModel(userDoc);
            await newUser.save();
            console.log('User created successfully');
        } catch (error) {
            console.error('Error creating user:', error);
            throw new Error('Failed to create user');
        }
    }

    static async handleUserUpdated(payload: WebhookUserPayload): Promise<IUserModel> {
        await dbConnect();
        try {
            const updateDoc = {
                name: `${payload.first_name} ${payload.last_name}`,
                email: payload.email_addresses[0]?.email_address || '',
                authProviderMetaData: payload,
            };
            const updateModel = await userModel.findOneAndUpdate({ authProviderIdentifier: payload.id }, updateDoc, { new: true });
            console.log('User updated successfully');
            return updateModel;
        } catch (error) {
            console.error('Error updating user:', error);
            throw new Error('Failed to update user');
        }
    }

    static async handleUserDeleted(id: string): Promise<void> {
        await dbConnect();
        try {
            await userModel.findOneAndDelete({ authProviderIdentifier: id });
            console.log('User deleted successfully');
        } catch (error) {
            console.error('Error deleting user:', error);
            throw new Error('Failed to delete user');
        }
    }
}

export default UserController;
