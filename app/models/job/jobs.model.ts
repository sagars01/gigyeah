import mongoose, { Schema, Document } from 'mongoose';

interface IJob extends Document {
    createdBy: mongoose.Schema.Types.ObjectId;
    title: string;
    description: string; // RTF data as HTML
    requirements: string[]; // Array with a maximum of 3 items
    company: {
        name: string;
        description: string;
    };
    postedAt: Date;
    status: 'active' | 'expired';
}

const JobSchema = new Schema<IJob>({
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true, maxlength: 300 }, // Max 300 characters
    requirements: {
        type: [{ type: String, required: true }],
        validate: [arrayLimit, 'Requirements exceeds the limit of 3'] // Custom validator
    },
    company: {
        name: { type: String, required: true },
        description: { type: String, required: true },
    },
    postedAt: { type: Date, default: Date.now },
    status: { type: String, required: true, default: 'active' }
});

// Helper function to validate the array length
function arrayLimit(val: string[]) {
    return val.length <= 3;
}

export default mongoose.models.Job || mongoose.model<IJob>('Job', JobSchema);
