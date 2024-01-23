import { body, ValidationChain, validationResult } from 'express-validator';
import { NextRequest } from 'next/server';

export const jobApplicationValidator: ValidationChain[] = [
    body('email').isEmail().withMessage('Invalid email address'),
    body('jobId').isMongoId().withMessage('Invalid job ID'),
    body('name').notEmpty().withMessage('Name is required'),
    body('shortIntro').notEmpty().withMessage('Short introduction is required'),
    body('file').custom((value, { req }) => {
        if (!req.file) {
            throw new Error('File is required');
        }
        return true;
    }),
];

export const runValidation = async (request: NextRequest) => {
    await Promise.all(jobApplicationValidator.map((validation) => validation.run(request)));
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return { errors: errors.array() }
    }

    return false;
}
