import dbConnect from "@/libs/mongodb";
import jobsModel from "@/app/models/job/jobs.model";

class JobController {
    static async getJobsByUser(userId: string, jobId?: string) {
        await dbConnect();
        try {
            // If no jobId is provided, fetch all jobs created by the user
            if (!jobId) {
                return await jobsModel.find({ "createdBy.id": userId }).sort({ postedAt: -1 });
            }
            // Fetch a specific job by jobId for the logged-in user
            return await jobsModel.findOne({ _id: jobId, "createdBy.id": userId });
        } catch (error) {
            console.error('Error fetching jobs:', error);
            throw new Error('Failed to fetch jobs');
        }
    }
}

export default JobController;
