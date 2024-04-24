import Joi from 'joi';

const updateApplicantDataValidationSchema = Joi.object({
    status: Joi.string()
        .valid('applied', 'rejected', 'interview', 'shortlisted', 'hired')
        .optional()
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

export default updateApplicantDataValidationSchema;
