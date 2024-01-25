import mongoose, { Schema, Document } from 'mongoose';

type SubscriptionLevel = 1 | 2 | 3;

export interface IUserModel extends Document {
    name: string;
    title: string;
    email: string;
    intro: string;
    company: {
        name: string;
        description: string;
    };
    subscriptionLevel: SubscriptionLevel
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
    subscriptionLevel: {
        type: Number,
        required: true,
        default: 1
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.User || mongoose.model<IUserModel>('User', UserSchema);
