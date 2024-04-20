import Joi from 'joi';

const JobApplicationValidatorSchema = Joi.object({
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
    file: Joi.object({
        type: Joi.string().valid('application/pdf').required().messages({
            'string.valid': 'Only PDF files are allowed',
            'any.required': 'Resume file is required'
        }),
        size: Joi.number().max(5242880).required().messages({ // 5MB limit
            'number.max': 'File must be less than 5MB',
            'any.required': 'Resume file is required'
        })
    }).unknown(true)
});

export default JobApplicationValidatorSchema