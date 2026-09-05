import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { ShoppingBag, Check } from "lucide-react";
import { useCart } from "./context/useCart";

// Hoisted out of the component so it isn't rebuilt on every render.
const PRODUCTS = [
    {
        name: 'Arabic Aura Watch',
        price: 'RS.3,950',
        img: 'https://dnstore.pk/cdn/shop/files/37CF3CEE-2315-42B2-9153-E22C66C2F310.jpg?v=1742674819&width=533'
    },
    {
        name: 'SABR Armless Watch',
        price: 'RS.3,290',
        img: 'https://dnstore.pk/cdn/shop/files/63401A3E-B145-42B4-A66F-2DFB22F99D2B.jpg?v=1742672187&width=533'
    },
    {
        name: 'PP Square Leather Straps',
        price: 'RS.5,000',
        img: 'https://dnstore.pk/cdn/shop/files/7A197A23-BEE4-4764-9D11-314E300CD634.jpg?v=1754406861&width=533'
    },
    {
        name: 'PP Leather straps ',
        price: 'RS.4,950',
        img: 'https://dnstore.pk/cdn/shop/files/83E2AAB1-C5A7-406D-A4FD-16BD010BF92B.jpg?v=1754486118&width=533'
    },
    {
        name: 'Metallic Arabic Aura',
        price: 'RS.7,550',
        img: 'https://dnstore.pk/cdn/shop/files/C6E67528-F13D-4699-ABBD-62DB71B1280F.jpg?v=1752100533&width=533'
    },
    {
        name: 'Patek Philippe Stone Dial',
        price: 'RS.5,900',
        img: 'https://dnstore.pk/cdn/shop/files/C1F74DF4-CDEC-442D-AECB-BA17775EDA1F.jpg?v=1750584916&width=533'
    },
]

const FALLBACK_IMG =
    "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect width='400' height='400' fill='%23f2ede4'/%3E%3Ctext x='50%25' y='50%25' font-family='sans-serif' font-size='18' fill='%2385796c' text-anchor='middle' dominant-baseline='middle'%3EImage unavailable%3C/text%3E%3C/svg%3E";

const ProductCard = ({ product, index }) => {
    const { addItem } = useCart();
    const [imgSrc, setImgSrc] = useState(product.img);
    const [added, setAdded] = useState(false);
    const resetTimer = useRef(null);

    useEffect(() => () => window.clearTimeout(resetTimer.current), []);

    const handleAdd = () => {
        addItem(product, 1);
        setAdded(true);
        window.clearTimeout(resetTimer.current);
        resetTimer.current = window.setTimeout(() => setAdded(false), 1600);
    };

    return (
        <div
            style={{ '--stagger': index }}
            className="card-enter group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white transition-shadow duration-300 hover:shadow-[0_10px_30px_-18px_rgba(36,31,26,0.35)]"
        >
            <div className="aspect-square overflow-hidden bg-paper-dim">
                <img
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    src={imgSrc}
                    alt={product.name}
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="400"
                    onError={() => setImgSrc(FALLBACK_IMG)}
                />
            </div>
            <div className="flex flex-1 flex-col p-4">
                <p className="font-medium text-ink line-clamp-2">{product.name}</p>
                <div className="mt-auto flex items-center justify-between pt-4">
                    <span className="text-lg font-semibold text-ink">{product.price}</span>
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={handleAdd}
                            aria-label={`Add ${product.name} to cart`}
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-line-strong text-ink-soft transition-colors duration-200 hover:border-bronze hover:text-bronze-dark"
                        >
                            {added ? <Check className="h-4 w-4" strokeWidth={2} /> : <ShoppingBag className="h-4 w-4" strokeWidth={1.75} />}
                        </button>
                        <Link
                            to="/buy"
                            state={{ product }}
                            className="rounded-full bg-ink px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition-colors duration-200 hover:bg-bronze-dark"
                        >
                            Buy now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Listing = () => {
    return (
        <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-10">
            <div className="pt-20 text-center sm:pt-24">
                <h1 className="font-display text-[clamp(2.25rem,6vw,3.5rem)] font-semibold text-ink">Products</h1>
                <p className="mx-auto mt-3 max-w-md text-muted">Watches and leather straps, picked for everyday wear.</p>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
                {PRODUCTS.map((product, index) => (
                    <ProductCard key={product.name} product={product} index={index} />
                ))}
            </div>
        </div>
    )
}

export default Listing
