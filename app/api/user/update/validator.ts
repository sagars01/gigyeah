import Joi from 'joi';

export const UpdateUserValidatorSchema = Joi.object({
    name: Joi.string().trim().min(2).optional(),
    title: Joi.string().trim().optional(),
    intro: Joi.string().trim().optional(),
    company: Joi.object({
        name: Joi.string().trim().optional(),
        description: Joi.string().trim().optional()
    }).optional()
});
