// controllers/ApplicationsController.ts
import dbConnect from '@/libs/mongodb';
import applicationModel, { IApplication } from '@/app/models/job/application.model';

class ApplicationsController {

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


    static async updateApplicationById(applicationId: string, updates: Partial<IApplication>) {
        await dbConnect();
        try {
            const updatedApplication = await this.Application.findByIdAndUpdate(
                applicationId,
                updates,
                { new: true } // Return the updated document
            );
            if (!updatedApplication) {
                throw new Error('Application not found');
            }
            return updatedApplication;
        } catch (error) {
            console.error('Error updating application:', applicationId, error);
            throw new Error('Failed to update application');
        }
    }
}

export default ApplicationsController;
