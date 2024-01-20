import mongoose, { Document, Schema } from 'mongoose';

// Interface describing a job application
interface IApplication extends Document {
    createdBy: string;
    jobId: string;
    applications: Array<{
        name: string;
        shortIntro: string;
        resumeUrl: string;
    }>;
}

// Schema corresponding to the document interface
const ApplicationSchema = new Schema<IApplication>({
    createdBy: { type: String, required: true },
    jobId: { type: String, required: true },
    applications: [
        {
            name: { type: String, required: true },
            shortIntro: { type: String, required: true },
            resumeUrl: { type: String, required: true },
        },
    ],
}, {
    timestamps: true, // Adds createdAt and updatedAt timestamps
});


// Model
const Application = mongoose.models.Application || mongoose.model<IApplication>('Application', ApplicationSchema);

export default Application;
