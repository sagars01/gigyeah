import Joi from 'joi';

const jobSchema = Joi.object({
    title: Joi.string().required(),
    status: Joi.string().valid('active', 'expired'), // Making it optional as not every update includes a status change
    description: Joi.string().max(1000).required(), // Assuming max 300 characters for description as mentioned in the model
    payRange: Joi.object({
        currency: Joi.string().required().valid("USD", "INR", "EUR"), // Assuming currency is required when payRange is provided
        min: Joi.number().required().min(0),
        max: Joi.number().greater(Joi.ref('min')).required(),
    }).optional(),
    requirements: Joi.array().items(Joi.string()).max(3).required(),
}).min(1);

export default jobSchema;
