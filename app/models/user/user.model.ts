import mongoose, { Schema, Document } from 'mongoose';

type SubscriptionLevel = 1 | 2 | 3;
interface ISocialMedia {
    platform: string;
    url: string;
}

// 1 : Free 2: Founder Tier 3: Enterprise Level

export interface IUserModel extends Document {
    name: string;
    title: string;
    email: string;
    intro: string;
    company: {
        name: string;
        description: string;
    };
    socialMedia: ISocialMedia[]
    subscriptionLevel: SubscriptionLevel;
    authProviderIdentifier: string;
    jobsCreated: number;
    createdAt: Date;
    authProviderMetaData: any;
}

const SocialMediaSchema = new Schema({
    platform: String,
    url: String,
}, { _id: false });


const UserSchema = new Schema<IUserModel>({
    authProviderIdentifier: {
        type: String,
        required: true
    },
    name: {
        type: String,
        default: 'John Doe'
    },
    title: {
        type: String,
        default: 'Founder'
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    socialMedia: [SocialMediaSchema],
    intro: {
        type: String,
        default: 'Looking to build something great!'
    },
    company: {
        name: {
            type: String,
            default: 'Acme Co.'
        },
        description: {
            type: String,
            default: 'Building the next big thing'
        },
    },
    jobsCreated: {
        type: Number,
        default: 0
    },
    subscriptionLevel: {
        type: Number,
        enum: [1, 2, 3],
        default: 1,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    authProviderMetaData: mongoose.Schema.Types.Mixed
});

export default mongoose.models.User || mongoose.model<IUserModel>('User', UserSchema);
