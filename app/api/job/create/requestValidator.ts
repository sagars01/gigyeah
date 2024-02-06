import Joi from 'joi';

const jobSchema = Joi.object({
    createdBy: Joi.string().hex().length(24).required(),
    title: Joi.string().required(),
    description: Joi.string().required().max(300),
    requirements: Joi.array().items(
        Joi.string().required()
    ).max(3),
    company: Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
    }).required(),
    location: Joi.object({
        city: Joi.string().max(20),
        country: Joi.string().max(40),
    }).required(),
    remote: Joi.boolean(),
    status: Joi.string().default("active").valid('active', 'expired'),
});

export default jobSchema;
