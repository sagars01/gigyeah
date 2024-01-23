import mongoose, { Schema, Document } from 'mongoose';

interface IJob extends Document {
    createdBy: string;
    title: string;
    description: string;
    requirements: string[];
    company: {
        name: string;
        description: string;
    };
    postedAt: Date;
}

const JobSchema = new Schema({
    createdBy: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    requirements: [{ type: String, required: true }],
    company: {
        name: { type: String, required: true },
        description: { type: String, required: true },
    },
    postedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Jobs || mongoose.model<IJob>('Jobs', JobSchema);
