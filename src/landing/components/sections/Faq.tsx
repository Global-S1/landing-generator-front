'use client';

import { useState } from "react";
import { FaqSectionProps } from "../../interfaces";

interface FaqItem {
    question: string;
    answer: string;
}

export const FaqSection = ({ title, faqData }: FaqSectionProps) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);


    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="container max-w-7xl m-auto py-[200px] px-4">
            <h2 className="text-4xl font-bold mb-4">{title}</h2>
            <div className="divide-y divide-gray-200">
                {faqData.map((faq, index) => (
                    <div key={index} className="py-4">
                        <button
                            onClick={() => toggleFaq(index)}
                            className="flex justify-between w-full items-center"
                        >
                            <span className="font-medium">{faq.question}</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-6 w-6 ${openIndex === index ? "transform rotate-180" : ""
                                    }`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>
                        {openIndex === index && (
                            <p className="text-gray-600 mt-2">{faq.answer}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
