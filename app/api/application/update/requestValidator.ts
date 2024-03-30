import Joi from 'joi';

const updateApplicationStatusValidationSchema = Joi.object({
    status: Joi.string()
        .valid('shortlisted', 'rejected')
        .required()
        .messages({
            'any.required': 'Status is required',
            'any.only': 'Status must be either "shortlisted" or "rejected"',
        }),
    applicantId: Joi.string()
        .required()
        .messages({
            'any.required': 'ApplicantId is required',
            'any.only': 'applicantId must be an uuid "',
        }),
});

export default updateApplicationStatusValidationSchema;
