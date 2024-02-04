import Joi from 'joi';
import { NextRequest } from 'next/server';

const jobApplicationSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Invalid email address',
        'any.required': 'Email is required',
    }),
    jobId: Joi.string().hex().length(24).required().messages({
        'string.hex': 'Invalid job ID',
        'string.length': 'Invalid job ID',
        'any.required': 'Job ID is required',
    }),
    name: Joi.string().min(1).required().messages({
        'string.empty': 'Name is required',
        'any.required': 'Name is required',
    }),
    shortIntro: Joi.string().min(1).required().messages({
        'string.empty': 'Short introduction is required',
        'any.required': 'Short introduction is required',
    }),
    // Assuming you handle file validation separately, as Joi cannot validate file objects directly
});

export const runValidation = async (request: NextRequest) => {
    try {
        const data = await request.json(); // Assuming you're extracting JSON body from the NextRequest
        await jobApplicationSchema.validateAsync(data, { abortEarly: false });
        return false; // Indicate no errors
    } catch (error: any) {
        return { errors: error.details.map((detail: { message: any; path: any; }) => ({ message: detail.message, path: detail.path })) };
    }
}
