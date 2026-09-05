import { Link } from "react-router";

const YEAR = new Date().getFullYear();

const Footer = () => {
    return (
        <footer className="mt-16 border-t border-line bg-ink text-white/80">
            <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <span className="font-display text-xl font-semibold text-white">HM Store</span>
                        <p className="mt-3 max-w-xs text-sm leading-6 text-white/60">
                            Watches and leather straps, delivered across Pakistan with cash on delivery.
                        </p>
                    </div>

                    <div>
                        <p className="text-sm font-semibold uppercase tracking-wide text-white/50">Shop</p>
                        <ul className="mt-4 space-y-2.5 text-sm">
                            <li><Link to="/home" className="transition-colors hover:text-white">Home</Link></li>
                            <li><Link to="/listing" className="transition-colors hover:text-white">Products</Link></li>
                            <li><Link to="/cart" className="transition-colors hover:text-white">Cart</Link></li>
                        </ul>
                    </div>

                    <div>
                        <p className="text-sm font-semibold uppercase tracking-wide text-white/50">Support</p>
                        <ul className="mt-4 space-y-2.5 text-sm">
                            <li><Link to="/help" className="transition-colors hover:text-white">Help &amp; FAQ</Link></li>
                            <li><Link to="/about" className="transition-colors hover:text-white">About us</Link></li>
                            <li><Link to="/contact" className="transition-colors hover:text-white">Contact us</Link></li>
                        </ul>
                    </div>

                    <div>
                        <p className="text-sm font-semibold uppercase tracking-wide text-white/50">Get in touch</p>
                        <ul className="mt-4 space-y-2.5 text-sm">
                            <li><a href="tel:+923255910645" className="transition-colors hover:text-white">0325‑5910645</a></li>
                            <li><a href="mailto:hmstore@gmail.com" className="transition-colors hover:text-white">hmstore@gmail.com</a></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-white/50">
                    © {YEAR} HM Store. All rights reserved.
                </div>
            </div>
        </footer>
    )
}

export default Footer
