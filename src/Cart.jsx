import { Link } from "react-router";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "./context/useCart";
import { formatPrice, parsePrice } from "./context/cartUtils";

const FALLBACK_IMG =
    "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%23f2ede4'/%3E%3C/svg%3E";

const CartLine = ({ item, index }) => {
    const { increment, decrement, removeItem } = useCart();
    const lineTotal = parsePrice(item.price) * item.qty;

    return (
        <div
            style={{ '--stagger': index }}
            className="card-enter flex gap-4 border-b border-line py-5 last:border-b-0"
        >
            <img
                src={item.img}
                alt={item.name}
                onError={(e) => { e.currentTarget.src = FALLBACK_IMG; }}
                className="h-24 w-24 flex-shrink-0 rounded-lg object-cover"
                width="96"
                height="96"
            />
            <div className="flex flex-1 flex-col justify-between">
                <div className="flex items-start justify-between gap-3">
                    <p className="font-medium text-ink">{item.name}</p>
                    <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remove ${item.name} from cart`}
                        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-error-bg hover:text-error"
                    >
                        <Trash2 className="h-4 w-4" strokeWidth={1.75} />
                    </button>
                </div>
                <div className="flex items-end justify-between">
                    <div className="flex items-center rounded-full border border-line-strong">
                        <button
                            type="button"
                            onClick={() => decrement(item.id)}
                            aria-label={`Decrease quantity of ${item.name}`}
                            className="flex h-8 w-8 items-center justify-center text-ink-soft transition-colors hover:text-bronze-dark"
                        >
                            <Minus className="h-3.5 w-3.5" strokeWidth={2} />
                        </button>
                        <span className="w-7 text-center text-sm font-medium" aria-live="polite">{item.qty}</span>
                        <button
                            type="button"
                            onClick={() => increment(item.id)}
                            aria-label={`Increase quantity of ${item.name}`}
                            className="flex h-8 w-8 items-center justify-center text-ink-soft transition-colors hover:text-bronze-dark"
                        >
                            <Plus className="h-3.5 w-3.5" strokeWidth={2} />
                        </button>
                    </div>
                    <span className="font-semibold text-ink">{formatPrice(lineTotal)}</span>
                </div>
            </div>
        </div>
    );
};

const Cart = () => {
    const { items, subtotal, clearCart } = useCart();

    if (items.length === 0) {
        return (
            <div className="mx-auto flex max-w-xl flex-col items-center px-6 py-28 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-paper-dim text-bronze-dark">
                    <ShoppingBag className="h-7 w-7" strokeWidth={1.5} />
                </div>
                <h1 className="mt-6 font-display text-3xl font-semibold text-ink">Your cart is empty</h1>
                <p className="mt-2 text-muted">Items you add will show up here, ready for checkout.</p>
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
        <div className="mx-auto max-w-4xl px-4 pb-20 pt-24 sm:px-6">
            <div className="mb-8 flex items-baseline justify-between">
                <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">Your cart</h1>
                <button
                    type="button"
                    onClick={clearCart}
                    className="text-sm font-medium text-muted transition-colors hover:text-error"
                >
                    Clear cart
                </button>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
                <div className="rounded-xl border border-line bg-white px-5">
                    {items.map((item, index) => (
                        <CartLine key={item.id} item={item} index={index} />
                    ))}
                </div>

                <div className="h-fit rounded-xl border border-line bg-paper-dim p-6">
                    <h2 className="text-lg font-semibold text-ink">Order summary</h2>
                    <div className="mt-4 flex justify-between text-sm text-ink-soft">
                        <span>Subtotal</span>
                        <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="mt-2 flex justify-between text-sm text-ink-soft">
                        <span>Shipping</span>
                        <span>Free</span>
                    </div>
                    <div className="mt-4 flex justify-between border-t border-line-strong pt-4 text-base font-semibold text-ink">
                        <span>Total</span>
                        <span>{formatPrice(subtotal)}</span>
                    </div>
                    <Link
                        to="/buy"
                        className="mt-6 flex items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-bronze-dark"
                    >
                        Checkout
                    </Link>
                    <Link
                        to="/listing"
                        className="mt-3 flex items-center justify-center rounded-full border border-line-strong px-6 py-3 text-sm font-medium text-ink-soft transition-colors hover:border-bronze hover:text-bronze-dark"
                    >
                        Continue shopping
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;
