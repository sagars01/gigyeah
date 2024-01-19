import mongoose, { Document, Schema } from 'mongoose';

// Interface describing a job application
interface IApplication extends Document {
    jobId: string;
    resumeUrl: string;
}

// Schema corresponding to the document interface
const ApplicationSchema = new Schema<IApplication>({
    jobId: { type: String, required: true },
    resumeUrl: { type: String, required: true },
}, {
    timestamps: true, // Adds createdAt and updatedAt timestamps
});

// Model
const Application = mongoose.models.Application || mongoose.model<IApplication>('Application', ApplicationSchema);

export default Application;
