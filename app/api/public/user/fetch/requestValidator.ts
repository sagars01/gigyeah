import Joi from "joi";
import validator from "validator";

export const RequestValidationSchema = Joi.object({
    userId: Joi.string().required().custom((value, helpers) => {
        const sanitizedValue = validator.escape(value);
        if (sanitizedValue !== value) {
            return helpers.error("string.escape", { value });
        }
        return sanitizedValue; // If validation passes, return the sanitized value
    }).messages({
        "string.base": "userId must be a string",
        "any.required": "userId is required",
        "string.escape": "userId contains disallowed characters and has been escaped"
    }),
});
