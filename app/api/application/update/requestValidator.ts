import Joi from 'joi';

const updateApplicationStatusValidationSchema = Joi.object({
    status: Joi.string()
        .valid('applied', 'rejected', 'interview', 'shortlisted', 'hired')
        .required()
        .messages({
            'any.required': 'Status is required',
            'any.only': 'Incorrect Status',
        }),
    applicantId: Joi.string()
        .required()
        .messages({
            'any.required': 'ApplicantId is required',
            'any.only': 'applicantId must be an uuid "',
        }),
});

export default updateApplicationStatusValidationSchema;
