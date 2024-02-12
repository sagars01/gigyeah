import Joi from 'joi';

// TODO: Phase 2: User Profile where onclick on the postedBy people should be redirected to User LinkTree Page

const jobSchema = Joi.object({
    createdBy: {
        name: Joi.string().required(),
        profileImg: Joi.string().optional(),
        company: {
            name: Joi.string().required(),
            description: Joi.string().required()
        },
        id: Joi.string().required()
    },
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
