import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQS = [
    {
        id: 1,
        question: 'How do I place an order?',
        answer:
            'Browse products, add them to your cart, and proceed to checkout. Enter your delivery details and choose cash on delivery or bank transfer to confirm.',
    },
    {
        id: 2,
        question: 'What payment methods are accepted?',
        answer:
            'We currently accept cash on delivery (COD) and bank transfer. Bank details are shared after your order is confirmed.',
    },
    {
        id: 3,
        question: 'Shipping & delivery',
        answer:
            'Standard delivery takes 2–3 working days and is free across Pakistan.',
    },
    {
        id: 4,
        question: 'Returns & refunds',
        answer:
            'You can return items within 7 days of delivery if they are unused and in original packaging, and request a refund.',
    },
];

const Help = () => {
    const [openId, setOpenId] = useState(null);

    return (
        <div className="mx-auto max-w-2xl px-4 pb-20 sm:px-6">
            <div className="pt-20 text-center sm:pt-24">
                <h1 className="font-display text-[clamp(2.25rem,6vw,3.5rem)] font-semibold text-ink">Help</h1>
                <p className="mx-auto mt-3 max-w-md text-muted">Answers to the questions we hear most often.</p>
            </div>

            <div className="mt-10 divide-y divide-line rounded-xl border border-line bg-white">
                {FAQS.map((faq) => {
                    const isOpen = openId === faq.id;
                    const panelId = `faq-panel-${faq.id}`;
                    const buttonId = `faq-button-${faq.id}`;
                    return (
                        <div key={faq.id}>
                            <h2>
                                <button
                                    id={buttonId}
                                    type="button"
                                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                                    aria-expanded={isOpen}
                                    aria-controls={panelId}
                                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-medium text-ink transition-colors hover:text-bronze-dark"
                                >
                                    {faq.question}
                                    <ChevronDown
                                        className={`h-5 w-5 flex-shrink-0 text-muted transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                                        strokeWidth={1.75}
                                        aria-hidden="true"
                                    />
                                </button>
                            </h2>
                            <div
                                id={panelId}
                                role="region"
                                aria-labelledby={buttonId}
                                className="grid transition-[grid-template-rows] duration-300 ease-out"
                                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                            >
                                <div className="overflow-hidden">
                                    <p className="px-5 pb-4 text-sm leading-6 text-muted">{faq.answer}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Help;
