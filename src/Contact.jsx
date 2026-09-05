import { Phone, Mail, Store } from "lucide-react";

const CONTACT_ITEMS = [
    { id: 1, title: 'Trade name', value: 'HM Store', icon: Store },
    { id: 2, title: 'Phone', value: '0325-5910645', href: 'tel:+923255910645', icon: Phone },
    { id: 3, title: 'Email', value: 'hmstore@gmail.com', href: 'mailto:hmstore@gmail.com', icon: Mail },
];

const Contact = () => {
    return (
        <div className="mx-auto max-w-2xl px-4 pb-20 sm:px-6">
            <div className="pt-20 text-center sm:pt-24">
                <h1 className="font-display text-[clamp(2.25rem,6vw,3.5rem)] font-semibold text-ink">Contact</h1>
                <p className="mx-auto mt-3 max-w-md text-muted">Questions about an order or a product? Reach us directly.</p>
            </div>

            <div className="mt-10 divide-y divide-line rounded-xl border border-line bg-white">
                {CONTACT_ITEMS.map((item) => {
                    const Icon = item.icon;
                    const content = (
                        <>
                            <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-paper-dim text-bronze-dark">
                                <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                            </span>
                            <span>
                                <span className="block text-xs font-medium uppercase tracking-wide text-muted">{item.title}</span>
                                <span className="block text-base font-medium text-ink">{item.value}</span>
                            </span>
                        </>
                    );
                    return (
                        <div key={item.id} className="flex items-center gap-4 p-5">
                            {item.href ? (
                                <a href={item.href} className="flex flex-1 items-center gap-4 -m-1 rounded-lg p-1 transition-colors hover:text-bronze-dark">
                                    {content}
                                </a>
                            ) : (
                                <div className="flex flex-1 items-center gap-4">{content}</div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Contact;
