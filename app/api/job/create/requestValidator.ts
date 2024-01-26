import Joi from 'joi';

export const jobSchema = Joi.object({
    createdBy: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().max(300).required(),
    requirements: Joi.array().items(Joi.string()).max(3).required(),
    company: Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required()
    }).required(),
});
