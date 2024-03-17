import mongoose, { Schema, Document } from 'mongoose';

export interface IApplication {
    jobId: mongoose.Schema.Types.ObjectId;
    ownerId: mongoose.Schema.Types.ObjectId;
    email: string;
    applicantName: string;
    shortIntro: string;
    resumeUrl: string;
    applicationsReceived: number;
    status: 'applied' | 'shortlisted' | 'rejected';
}

const ApplicationsSchema = new Schema<IApplication>({
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    email: { type: String, required: true, unique: true },
    applicantName: { type: String, required: true },
    shortIntro: { type: String, required: true },
    resumeUrl: { type: String, required: true },
    status: {
        type: String,
        enum: ['applied', 'shortlisted', 'rejected'],
        default: 'applied'
    },
    applicationsReceived: {
        type: Number,
        default: 0
    }
});

export default mongoose.models.Applications || mongoose.model<IApplication>('Applications', ApplicationsSchema);
