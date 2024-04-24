import applicationModel, { IApplication } from '@/app/libs/models/application/application.model';
import dbConnect from '../../mongodb';
import { handleError } from '@/app/utils/logging/errorHandler';
import logger from '@/app/utils/logging/logger';
class ApplicantController {

    /**
     * @description Update applicant Notes
     */
    static async UpdateApplicantData(id: string, updates: IApplication) {
        try {

            await dbConnect();
            const updatedApplication = await applicationModel.findByIdAndUpdate(id, {
                $set: updates,
            }, {
                new: true
            }).lean();

            return updatedApplication;
        } catch (error: any) {
            logger.error(error);
            return handleError(error)
        }
    }
}

export default ApplicantController