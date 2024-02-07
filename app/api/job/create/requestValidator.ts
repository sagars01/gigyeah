import Joi from 'joi';

const jobSchema = Joi.object({
    createdBy: Joi.string().hex().length(24).required(),
    title: Joi.string().required(),
    description: Joi.string().required().max(300),
    requirements: Joi.array().items(
        Joi.string().required()
    ).max(3),
    location: Joi.object({
        city: Joi.string().max(20),
        country: Joi.string().max(40),
    }).required(),
    payRange: Joi.object({
        min: Joi.number().required(),
        max: Joi.number().required(),
        currency: Joi.string().default("USD").valid("USD", "INR", "EUR")
    }),
    remote: Joi.boolean(),
    status: Joi.string().default("active").valid('active', 'expired'),
});

export default jobSchema;
