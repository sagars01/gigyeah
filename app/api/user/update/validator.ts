import Joi from 'joi';

export const UpdateUserValidatorSchema = Joi.object({
    name: Joi.string().trim().min(2).optional(),
    title: Joi.string().trim().optional(),
    intro: Joi.string().trim().optional(),
    company: Joi.object({
        name: Joi.string().trim().optional(),
        description: Joi.string().trim().optional()
    }).optional(),
    socialMedia: Joi.array().items(
        Joi.object({
            platform: Joi.string().valid('Twitter', 'LinkedIn', 'Instagram').optional(),
            url: Joi.string().uri().trim().optional()
        })
    ).optional()
});
