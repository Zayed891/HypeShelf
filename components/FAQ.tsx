"use client";
import { useState } from "react";

const faqs = [
    {
        question: "What kind of things can I recommend?",
        answer: "Anything you're hyped about! Movies, TV shows, books, video games, software, podcasts, or even that specific mechanical keyboard switch you love."
    },
    {
        question: "Is HypeShelf free to use?",
        answer: "100% free. We believe sharing great taste shouldn't cost a dime."
    },
    {
        question: "How do I become a Staff Picker?",
        answer: "Be active, share high-quality recommendations, and be helpful in the community. Our admins keep an eye out for tastemakers."
    },
    {
        question: "Can I organize my recommendations?",
        answer: "Currently we feature a unified feed, but collections and personalized shelves are coming in the next update."
    },
    {
        question: "How is this different from IMDB or Goodreads?",
        answer: "HypeShelf is cross-category. We don't silo your taste. It's one place for everything you love, curated by real people, not algorithms."
    }
];

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-24 bg-neutral-100 text-black">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row gap-12">

                    {/* Header */}
                    <div className="md:w-1/3">
                        <h2 className="text-4xl xs:text-5xl font-bold tracking-tight text-neutral-900 leading-tight">
                            Frequently asked questions
                        </h2>
                    </div>

                    {/* Accordion */}
                    <div className="md:w-2/3">
                        <div className="border-t border-neutral-200">
                            {faqs.map((faq, index) => (
                                <div key={index} className="border-b border-neutral-200">
                                    <button
                                        className="w-full py-6 flex items-center justify-between text-left focus:outline-none"
                                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    >
                                        <div className="flex items-center gap-6">
                                            <span className="text-xs font-medium text-neutral-400 w-6">0{index + 1}</span>
                                            <span className="text-lg font-medium text-neutral-900">{faq.question}</span>
                                        </div>
                                        <span className={`transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                                            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </span>
                                    </button>
                                    <div
                                        className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-40 opacity-100 pb-6' : 'max-h-0 opacity-0'
                                            }`}
                                    >
                                        <p className="text-neutral-600 pl-12 pr-4 leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
