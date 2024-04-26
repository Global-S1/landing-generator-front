'use client';

import { useState } from "react";
import { FaqSectionProps } from "../../../interfaces";

export const FaqDynamic = ({ title, faqData }: FaqSectionProps) => {

    return (
        <section id="faq" className="container max-w-7xl m-auto py-[100px] px-4">
            <h2 className="text-4xl font-bold mb-4">{title}</h2>
            <div className="divide-y divide-gray-200">
                {faqData.map((faq, index) => (
                    <FaqItem key={index} {...faq} />
                ))}
            </div>
        </section>
    );
};

const FaqItem = ({ question, answer }: { question: string; answer: string }) => {
    const [showAnswer, setShowAnswer] = useState('none');

    const toggleFaq = () => {
        if (showAnswer === 'none') {
            setShowAnswer('block')
        } else {
            setShowAnswer('none')
        }
    };

    return (
        <div className="py-4">
            <button
                onClick={() => toggleFaq()}
                className="flex justify-between w-full items-center"
            >
                <span className="font-medium">{question}</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-6 w-6 ${showAnswer === 'block' ? "transform rotate-180" : ""
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
            <p className="text-gray-600 mt-2" style={{ display: showAnswer }} >{answer}</p>
        </div>
    )
}