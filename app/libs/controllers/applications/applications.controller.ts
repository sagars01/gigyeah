import { ObjectId } from 'mongodb';
import dbConnect from '@/app/libs/mongodb';
import applicationModel, { IApplication } from '@/app/libs/models/application/application.model';

class ApplicationsController {
    static async createApplication(application: IApplication) {
        throw new Error("Method not implemented.");
    }

    static async getApplicationById(applicationId: string) {
        await dbConnect();
        try {
            const application = await this.Application.findById(applicationId).lean();
            if (!application) {
                throw new Error('Application not found');
            }
            return application;
        }
        catch {
            throw new Error('Failed to fetch application');
        }
    }

    static Application = applicationModel;
    static async getAllApplicationsByJobId(jobId: string) {
        await dbConnect();
        try {
            const applications = await this.Application.find({ jobId: jobId });
            return applications;
        } catch (error) {
            console.error('Error fetching applications for jobId:', jobId, error);
            throw new Error('Failed to fetch applications for jobId');
        }
    }


    static async updateApplicationStatus(
        applicationId: string,
        status: 'shortlisted' | 'rejected',
        userId: string
    ) {
        await dbConnect();

        try {
            const application = await this.Application.findOne({
                _id: new ObjectId(applicationId),
                ownerId: new ObjectId(userId),
            });

            if (!application) {
                throw new Error('Application not found or unauthorized');
            }

            // Update the application status
            const updatedApplication = await this.Application.findByIdAndUpdate(
                applicationId,
                { status },
                { new: true }
            );

            return updatedApplication;
        } catch (error) {
            console.error('Error updating application status:', applicationId, error);
            throw new Error('Failed to update application status');
        }
    }
}

export default ApplicationsController;
