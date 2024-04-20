import jobsModel from "@/app/libs/models/job/jobs.model";
import dbConnect from "@/app/libs/mongodb";
import { ErrorHandler, handleError } from "@/app/utils/logging/errorHandler";
import logger, { LogLevel } from "@/app/utils/logging/logger";
import Application from "@/app/libs/models/application/application.model";


class PublicJobsController {
    static async getJobDetails(jobId: string) {
        await dbConnect();
        const job = await jobsModel.findById(jobId).lean();
        return job;
    }

    static async getJobDetailsForVerification(jobId: string): Promise<any> {
        await dbConnect();
        try {
            const job = await jobsModel.findById(jobId).lean();
            if (!job) {
                logger.log(LogLevel.INFO, `No job found with ID: ${jobId}`);
                throw new ErrorHandler(404, 'Job not found');
            }
            logger.log(LogLevel.INFO, `Job details retrieved for ID: ${jobId}`);
            return job;
        } catch (error: any) {
            throw handleError(error);
        }
    }

    static async handleJobApplication(applicationData: ApplicationData): Promise<{ success: boolean; message: string; }> {
        await dbConnect();

        try {
            const { jobId, email } = applicationData;

            // Log the attempt to find existing applications
            logger.log(LogLevel.DEBUG, `Checking existing applications for job ID: ${jobId} and email: ${email}`);

            const existingApplication = await Application.findOne({
                jobId,
                email: email
            });

            if (existingApplication) {
                logger.log(LogLevel.WARN, `User ${email} has already applied for job ID: ${jobId}`);
                return {
                    success: false,
                    message: "You have already applied for this job."
                };
            }

            // Log that no existing application was found
            logger.log(LogLevel.INFO, `No existing application found for ${email} on job ID: ${jobId}, proceeding to create a new application`);

            const newApplication = new Application({
                jobId: applicationData.jobId,
                ownerId: applicationData.ownerId,
                email: applicationData.email,
                applicantName: applicationData.applicantName,
                shortIntro: applicationData.shortIntro,
                resumeUrl: applicationData.resumeUrl,
                status: 'applied'
            });

            await newApplication.save();
            logger.log(LogLevel.INFO, `New application created successfully for ${email} on job ID: ${jobId}`);

            return {
                success: true,
                message: "Application submitted successfully."
            };

        } catch (error: any) {
            logger.log(LogLevel.ERROR, `Error processing job application for ${applicationData.email}: ${error.message}`);
            throw new ErrorHandler(500, 'Failed to process your application due to a server error', error.message);
        }
    }
}

export default PublicJobsController;

interface ApplicationData {
    jobId: string;
    ownerId: string;
    email: string;
    applicantName: string;
    shortIntro: string;
    resumeUrl: string;
}