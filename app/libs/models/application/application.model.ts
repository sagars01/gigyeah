import mongoose, { Schema } from 'mongoose';
import Job from '@/app/libs/models/job/jobs.model';


enum CandidateInterviewJourneyStatus {
    applied = "applied",
    shortlisted = "shortlisted",
    interview = "interview",
    rejected = "rejected",
    hired = "hired"
}

export interface IApplication {
    jobId: mongoose.Schema.Types.ObjectId;
    ownerId: mongoose.Schema.Types.ObjectId;
    email: string;
    applicantName: string;
    shortIntro: string;
    resumeUrl: string;
    applicationsReceived: number;
    status: string;
    notes: string;
}

const ApplicationsSchema = new Schema<IApplication>({
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    email: { type: String, required: true },
    applicantName: { type: String, required: true },
    shortIntro: { type: String, required: true },
    resumeUrl: { type: String, required: true },
    status: {
        type: String,
        default: CandidateInterviewJourneyStatus.applied
    },
    applicationsReceived: {
        type: Number,
        default: 0
    },
    notes: {
        type: String,
        required: false
    }
});

// Post-save hook to increment application count in the Job model
ApplicationsSchema.post('save', function (doc) {
    // This function is called after an application document is saved
    Job.findByIdAndUpdate(
        doc.jobId,
        { $inc: { applicationCount: 1 } }, // Increment the applicationCount by 1
        { new: true } // Return the modified document
    ).then(updatedJob => {
        console.log('Updated job application count:', updatedJob);
    }).catch(err => {
        console.error('Error updating job application count:', err);
    });
});

export default mongoose.models.Applications || mongoose.model<IApplication>('Applications', ApplicationsSchema);
