import Joi from 'joi';

const jobSchema = Joi.object({
    status: Joi.string().valid('active', 'expired'), // Making it optional as not every update includes a status change
    description: Joi.string().max(300).optional(), // Assuming max 300 characters for description as mentioned in the model
    payRange: Joi.object({
        currency: Joi.string().required().valid("USD", "INR", "EUR"), // Assuming currency is required when payRange is provided
        min: Joi.number().required().min(0),
        max: Joi.number().greater(Joi.ref('min')).required(),
    }).optional(),
    requirements: Joi.array().items(Joi.string()).max(3).optional(),
}).min(1);

export default jobSchema;
