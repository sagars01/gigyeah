// app/pricing/page.tsx
"use client";

import React from 'react';

interface PlanFeature {
    text: string;
    included?: boolean; // Optional to mark a feature as included or not
}

interface PricingPlan {
    title: string;
    description: string;
    price: string;
    features: PlanFeature[];
    isPopular?: boolean;
}

const plans: PricingPlan[] = [
    {
        title: 'Simple Pricing',
        description: 'A plan that suites every solopreneur',
        price: '$39/month',
        features: [
            { text: 'Unlimited Job Posts', included: true },
            { text: 'Unlimited Applications', included: true },
            { text: 'Analytics', included: true },
            { text: 'Candidate Archive', included: true },
            { text: '24-hour support response time', included: true },
            { text: 'Future Updates', included: true },
        ],
        isPopular: true,
    }
];

export default function PricingPage() {
    return (
        <div className="bg-gray-50 py-16 flex items-center justify-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Pricing</h2>
                    <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                        Focus on hiring the right candidate rather than deciding the pricing plan
                    </p>
                </div>

                {/* Pricing Plan Card (Now Centered) */}
                <div className="mt-12"> {/* Removed the grid, as we only have one card */}
                    {plans.map((plan) => (
                        <div
                            key={plan.title}
                            className={`bg-white rounded-lg shadow-md p-8 ${plan.isPopular ? 'relative ring-2 ring-indigo-500' : ''}`}
                        >
                            {plan.isPopular && (
                                <div className="absolute top-0 right-0 -mt-3 px-4 py-1 bg-indigo-500 text-xs text-white rounded-full">
                                    Sale Price
                                </div>
                            )}
                            <h3 className="text-lg leading-6 font-medium text-gray-900">{plan.title}</h3>
                            <p className="mt-2 text-sm text-gray-500">{plan.description}</p>
                            <div className="flex items-baseline mt-5">
                                <p className="text-3xl font-extrabold text-gray-900">{plan.price}</p>
                                <p className="ml-1 text-xs text-gray-400">(Billed yearly)</p>
                            </div>

                            <ul role="list" className="mt-6 space-y-4">
                                {plan.features.map((feature) => (
                                    <li key={feature.text} className="flex items-start">
                                        <div className="flex-shrink-0">
                                            {feature.included === false ? (
                                                <svg className="h-5 w-5 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                                                </svg>
                                            ) : (
                                                <svg className="flex-shrink-0 h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </div>
                                        <p className="ml-3 text-base text-gray-500">{feature.text}</p>
                                    </li>
                                ))}
                            </ul>
                            <button
                                type="button"
                                className={`mt-8 block w-full rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${!plan.isPopular ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={!plan.isPopular} // Disable button if not the popular plan
                            >
                                Buy Plan
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
