import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Menu as MenuIcon, X, ShoppingBag } from "lucide-react";
import { useCart } from "./context/useCart";

const NAV_ITEMS = [
  { label: "Home", link: "/home" },
  { label: "Products", link: "/listing" },
  { label: "About", link: "/about" },
  { label: "Contact", link: "/contact" },
  { label: "Help", link: "/help" },
];

const Slide = () => {
  const { count } = useCart();
  const [show, setShow] = useState(false);

  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [show]);

  useEffect(() => {
    if (!show) return;
    const onKey = (e) => {
      if (e.key === "Escape") setShow(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [show, setShow]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-[72px] border-b border-line bg-paper/95 backdrop-blur-sm">
        <div className="flex h-full items-center justify-between px-4">
          <button
            type="button"
            onClick={() => setShow(!show)}
            aria-expanded={show}
            aria-controls="mobile-menu"
            aria-label={show ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-paper-dim"
          >
            {show ? <X className="h-6 w-6" strokeWidth={1.75} /> : <MenuIcon className="h-6 w-6" strokeWidth={1.75} />}
          </button>

          <Link to="/home" className="flex items-center gap-2" aria-label="HM Store, go to home">
            <img
              className="h-10 w-10 rounded-full object-cover"
              src="https://i.pinimg.com/736x/1d/15/5b/1d155b07cb2ad9daf581f5f559f7ac4a.jpg"
              alt=""
              width="40"
              height="40"
              decoding="async"
            />
            <span className="font-display text-lg font-semibold text-ink">HM Store</span>
          </Link>

          <Link
            to="/cart"
            aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`}
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-paper-dim"
          >
            <ShoppingBag className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
            {count > 0 && (
              <span
                key={count}
                className="badge-bump absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-bronze px-1 text-[11px] font-semibold text-white"
              >
                {count}
              </span>
            )}
          </Link>
        </div>
      </header>

      {/* Overlay */}
      <div
        onClick={() => setShow(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-ink/40 transition-opacity duration-300 ${
          show ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Slide Menu */}
      <nav
        id="mobile-menu"
        aria-label="Mobile"
        className={`fixed top-[72px] left-0 right-0 z-40 h-[calc(100vh-72px)] transform bg-paper transition-transform duration-500 ease-out ${
          show ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <ul>
          {NAV_ITEMS.map((item) => (
            <li key={item.link} className="border-b border-line">
              <Link
                to={item.link}
                onClick={() => setShow(false)}
                className="flex h-16 items-center px-6 text-xl font-medium text-ink transition-colors hover:bg-paper-dim"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Slide;
