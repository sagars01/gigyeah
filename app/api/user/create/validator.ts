import { ValidationChain, body, validationResult } from 'express-validator';
import { NextRequest } from 'next/server';

export const validateUserChain: ValidationChain[] = [
    // Name validation
    body('name')
        .trim()
        .isLength({ min: 1 }).withMessage('Name is required'),

    // Title validation
    body('title')
        .trim()
        .isLength({ min: 1 }).withMessage('Title is required'),

    // Email validation
    body('email')
        .isEmail().withMessage('Invalid email address')
        .normalizeEmail(),

    // Intro validation (optional field)
    body('intro')
        .optional({ checkFalsy: true })
        .trim(),

    // Company name validation
    body('company.name')
        .trim()
        .isLength({ min: 1 }).withMessage('Company name is required'),

    // Company description validation
    body('company.description')
        .trim()
        .isLength({ min: 1 }).withMessage('Company description is required')
];

export const runValidation = async (request: NextRequest) => {
    const res = await request.json();
    await Promise.all(validateUserChain.map((validation) => validation.run(res)));
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return { data: null, errors: errors.array() }
    }

    return { data: res, errors: null };
}
