import { useState } from "react";
import { Link, useLocation } from "react-router";
import { CheckCircle2, ShoppingBag } from "lucide-react";
import { useCart } from "./context/useCart";
import { formatPrice, parsePrice } from "./context/cartUtils";

const FALLBACK_IMG =
    "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%23f2ede4'/%3E%3C/svg%3E";

/** Accepts 03XXXXXXXXX, 0092/+92 3XXXXXXXXX, with optional spaces or a dash after the prefix. */
function isValidPakPhone(raw) {
    const digits = raw.replace(/[\s-]/g, "");
    return /^(\+92|0092|0)3\d{9}$/.test(digits);
}

function FieldError({ message }) {
    if (!message) return null;
    return (
        <p className="mt-1 text-xs text-error" role="alert">
            {message}
        </p>
    );
}

const inputBase =
    "w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-ink placeholder:text-muted/70 transition-colors focus:outline-none";

const Buy = () => {
    const location = useLocation();
    const { product } = location.state || {};
    const { items, subtotal, clearCart } = useCart();

    // A "Buy now" click carries its own product; otherwise checkout reflects
    // whatever is already in the cart.
    const isQuickBuy = Boolean(product);
    const orderItems = isQuickBuy ? [{ ...product, qty: 1 }] : items;
    const orderTotal = isQuickBuy ? parsePrice(product.price) : subtotal;
    const hasOrder = orderItems.length > 0;

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        address: "",
        apartment: "",
        city: "",
        postalCode: "",
        phone: "",
        country: "Pakistan",
    });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [orderId, setOrderId] = useState(null);

    const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

    const validate = () => {
        const next = {};
        if (!form.firstName.trim()) next.firstName = "First name is required.";
        if (!form.lastName.trim()) next.lastName = "Last name is required.";
        if (!form.address.trim()) next.address = "Address is required.";
        if (!form.city.trim()) next.city = "City is required.";
        if (!form.phone.trim()) {
            next.phone = "Phone number is required.";
        } else if (!isValidPakPhone(form.phone)) {
            next.phone = "Enter a valid Pakistani number, e.g. 0300‑1234567.";
        }
        if (form.postalCode.trim() && !/^\d{5}$/.test(form.postalCode.trim())) {
            next.postalCode = "Postal code should be 5 digits.";
        }
        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!hasOrder || !validate()) return;

        // No backend exists yet — this stores the order locally so the demo
        // flow has somewhere real to "land", instead of only logging it.
        const id = `HM${Date.now().toString().slice(-8)}`;
        const order = { id, ...form, items: orderItems, total: orderTotal, placedAt: new Date().toISOString() };
        try {
            const existing = JSON.parse(window.localStorage.getItem("hmstore.orders") || "[]");
            window.localStorage.setItem("hmstore.orders", JSON.stringify([...existing, order]));
        } catch {
            // Local storage being unavailable shouldn't block showing the confirmation.
        }

        if (!isQuickBuy) clearCart();
        setOrderId(id);
        setSubmitted(true);
    };

    const summaryItems = orderItems;

    if (submitted) {
        return (
            <div className="mx-auto flex max-w-xl flex-col items-center px-6 py-28 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success-bg text-success">
                    <CheckCircle2 className="h-8 w-8" strokeWidth={1.5} />
                </div>
                <h1 className="mt-6 font-display text-3xl font-semibold text-ink">Order received</h1>
                <p className="mt-2 text-muted">
                    Order <span className="font-medium text-ink">{orderId}</span> has been saved on this device.
                    This is a frontend demo — no payment gateway or live order system is connected yet, and our
                    team will follow up by phone to confirm cash‑on‑delivery details.
                </p>
                <Link
                    to="/listing"
                    className="mt-8 inline-flex items-center rounded-full bg-ink px-7 py-3 text-sm font-medium tracking-wide text-white transition-colors hover:bg-bronze-dark"
                >
                    Continue shopping
                </Link>
            </div>
        );
    }

    if (!hasOrder) {
        return (
            <div className="mx-auto flex max-w-xl flex-col items-center px-6 py-28 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-paper-dim text-bronze-dark">
                    <ShoppingBag className="h-7 w-7" strokeWidth={1.5} />
                </div>
                <h1 className="mt-6 font-display text-3xl font-semibold text-ink">No product selected</h1>
                <p className="mt-2 text-muted">
                    Pick a product from the shop first, then come back here to check out.
                </p>
                <Link
                    to="/listing"
                    className="mt-8 inline-flex items-center rounded-full bg-ink px-7 py-3 text-sm font-medium tracking-wide text-white transition-colors hover:bg-bronze-dark"
                >
                    Browse products
                </Link>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-5xl px-4 pb-20 pt-24 sm:px-6">
            <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">Checkout</h1>

            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
                <form onSubmit={handleSubmit} noValidate className="space-y-8">
                    <section>
                        <h2 className="text-lg font-semibold text-ink">Delivery address</h2>
                        <div className="mt-4 space-y-4">
                            <div>
                                <label htmlFor="country" className="mb-1 block text-sm font-medium text-ink-soft">Country</label>
                                <select
                                    id="country"
                                    className={`${inputBase} border-line-strong focus:border-bronze`}
                                    value={form.country}
                                    onChange={update("country")}
                                >
                                    <option>Pakistan</option>
                                </select>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="firstName" className="mb-1 block text-sm font-medium text-ink-soft">First name</label>
                                    <input
                                        id="firstName"
                                        className={`${inputBase} ${errors.firstName ? "border-error" : "border-line-strong focus:border-bronze"}`}
                                        type="text"
                                        value={form.firstName}
                                        onChange={update("firstName")}
                                        aria-invalid={Boolean(errors.firstName)}
                                        required
                                    />
                                    <FieldError message={errors.firstName} />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="mb-1 block text-sm font-medium text-ink-soft">Last name</label>
                                    <input
                                        id="lastName"
                                        className={`${inputBase} ${errors.lastName ? "border-error" : "border-line-strong focus:border-bronze"}`}
                                        type="text"
                                        value={form.lastName}
                                        onChange={update("lastName")}
                                        aria-invalid={Boolean(errors.lastName)}
                                        required
                                    />
                                    <FieldError message={errors.lastName} />
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="address" className="mb-1 block text-sm font-medium text-ink-soft">Address</label>
                                    <input
                                        id="address"
                                        className={`${inputBase} ${errors.address ? "border-error" : "border-line-strong focus:border-bronze"}`}
                                        type="text"
                                        value={form.address}
                                        onChange={update("address")}
                                        aria-invalid={Boolean(errors.address)}
                                        required
                                    />
                                    <FieldError message={errors.address} />
                                </div>
                                <div>
                                    <label htmlFor="apartment" className="mb-1 block text-sm font-medium text-ink-soft">Apartment (optional)</label>
                                    <input
                                        id="apartment"
                                        className={`${inputBase} border-line-strong focus:border-bronze`}
                                        type="text"
                                        value={form.apartment}
                                        onChange={update("apartment")}
                                    />
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="city" className="mb-1 block text-sm font-medium text-ink-soft">City</label>
                                    <input
                                        id="city"
                                        className={`${inputBase} ${errors.city ? "border-error" : "border-line-strong focus:border-bronze"}`}
                                        type="text"
                                        value={form.city}
                                        onChange={update("city")}
                                        aria-invalid={Boolean(errors.city)}
                                        required
                                    />
                                    <FieldError message={errors.city} />
                                </div>
                                <div>
                                    <label htmlFor="postalCode" className="mb-1 block text-sm font-medium text-ink-soft">Postal code (optional)</label>
                                    <input
                                        id="postalCode"
                                        className={`${inputBase} ${errors.postalCode ? "border-error" : "border-line-strong focus:border-bronze"}`}
                                        type="text"
                                        inputMode="numeric"
                                        value={form.postalCode}
                                        onChange={update("postalCode")}
                                        aria-invalid={Boolean(errors.postalCode)}
                                    />
                                    <FieldError message={errors.postalCode} />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="phone" className="mb-1 block text-sm font-medium text-ink-soft">Phone</label>
                                <input
                                    id="phone"
                                    className={`${inputBase} ${errors.phone ? "border-error" : "border-line-strong focus:border-bronze"}`}
                                    type="tel"
                                    placeholder="0300-1234567"
                                    value={form.phone}
                                    onChange={update("phone")}
                                    aria-invalid={Boolean(errors.phone)}
                                    required
                                />
                                <FieldError message={errors.phone} />
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-ink">Shipping method</h2>
                        <div className="mt-4 flex items-center justify-between rounded-lg border border-bronze bg-paper-dim px-4 py-3 text-sm">
                            <span className="font-medium text-ink">Standard delivery</span>
                            <span className="text-ink-soft">Free</span>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-ink">Payment</h2>
                        <p className="mt-1 text-xs text-muted">Demo checkout — no live payment processing is connected.</p>
                        <div className="mt-4 space-y-3 text-sm">
                            <div className="flex items-center justify-between rounded-lg border border-bronze bg-paper-dim px-4 py-3">
                                <span className="font-medium text-ink">Cash on delivery (COD)</span>
                            </div>
                            <div className="flex items-center justify-between rounded-lg border border-line-strong px-4 py-3">
                                <span className="font-medium text-ink">Bank transfer</span>
                                <span className="text-xs text-muted">Details shared after order confirmation</span>
                            </div>
                        </div>
                    </section>

                    <button
                        type="submit"
                        className="w-full rounded-full bg-ink py-3.5 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-bronze-dark"
                    >
                        Complete order
                    </button>
                </form>

                {/* Order summary */}
                <aside className="h-fit rounded-xl border border-line bg-paper-dim p-6 lg:sticky lg:top-24">
                    <h2 className="text-lg font-semibold text-ink">Order summary</h2>
                    <div className="mt-4 space-y-4">
                        {summaryItems.map((item) => (
                            <div key={item.id ?? item.name} className="flex gap-3">
                                <img
                                    src={item.img}
                                    alt={item.name}
                                    onError={(e) => { e.currentTarget.src = FALLBACK_IMG; }}
                                    className="h-16 w-16 flex-shrink-0 rounded-lg object-cover"
                                    width="64"
                                    height="64"
                                />
                                <div className="flex flex-1 flex-col justify-center">
                                    <p className="text-sm font-medium text-ink">{item.name}</p>
                                    <p className="text-xs text-muted">Qty {item.qty ?? 1}</p>
                                </div>
                                <span className="text-sm font-semibold text-ink">
                                    {formatPrice(parsePrice(item.price) * (item.qty ?? 1))}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-5 flex justify-between border-t border-line-strong pt-4 text-base font-semibold text-ink">
                        <span>Total</span>
                        <span>{formatPrice(orderTotal)}</span>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default Buy;
