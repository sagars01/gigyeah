import dbConnect from "@/app/libs/mongodb";
import jobsModel, { IJob } from "@/app/models/job/jobs.model";

class JobController {
    static async getJobsByUser(userId: string, jobId?: string) {
        await dbConnect();
        try {
            if (!jobId) {
                return await jobsModel.find({ "createdBy.id": userId }).sort({ postedAt: -1 });
            }
            return await jobsModel.findOne({ _id: jobId, "createdBy.id": userId });
        } catch (error) {
            console.error('Error fetching jobs:', error);
            throw new Error('Failed to fetch jobs');
        }
    }

    static async getJobsById(jobId?: string): Promise<IJob | null> {
        await dbConnect();
        try {
            return await jobsModel.findOne({ _id: jobId });
        } catch (error) {
            console.error('Error fetching jobs:', error);
            throw new Error('Failed to fetch jobs');
        }
    }

    static async updateJob(jobId: string, updateData: {
        description?: string,
        payRange?: {
            currency: string,
            min: number,
            max: number
        },
        requirements?: string[],
        status?: 'active' | 'expired'
    }) {
        await dbConnect();
        try {

            const updatedJob = await jobsModel.findOneAndUpdate(
                { _id: jobId },
                { $set: updateData },
                { new: true, runValidators: true }
            );

            return updatedJob;
        } catch (error) {
            console.error('Error updating job:', error);
            throw new Error('Failed to update job');
        }
    }

}

export default JobController;
