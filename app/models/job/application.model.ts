import mongoose, { Schema, Document } from 'mongoose';

interface IApplication extends Document {
    jobId: mongoose.Schema.Types.ObjectId;
    email: string;
    applicantName: string;
    shortIntro: string;
    resumeUrl: string;
    status: 'applied' | 'shortlisted' | 'rejected';
}

const ApplicationsSchema = new Schema({
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    email: { type: String, required: true, unique: true },
    applicantName: { type: String, required: true },
    shortIntro: { type: String, required: true },
    resumeUrl: { type: String, required: true },
    status: {
        type: String,
        enum: ['applied', 'shortlisted', 'rejected'],
        default: 'applied'
    },
});

export default mongoose.models.Applications || mongoose.model<IApplication>('Applications', ApplicationsSchema);
