import mongoose, { Schema, Document } from 'mongoose';

type SubscriptionLevel = 1 | 2 | 3;

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
    subscriptionLevel: 1 | 2 | 3;
    jobsCreated: number;
    createdAt: Date;
}

const UserSchema = new Schema<IUserModel>({
    name: {
        type: String,
        required: true,
        default: 'John Doe'
    },
    title: {
        type: String,
        required: true,
        default: 'Founder'
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    intro: {
        type: String,
        default: 'Looking to build something great!'
    },
    company: {
        name: {
            type: String,
            required: true,
            default: 'Acme Co.'
        },
        description: {
            type: String,
            required: true,
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
});

export default mongoose.models.User || mongoose.model<IUserModel>('User', UserSchema);
