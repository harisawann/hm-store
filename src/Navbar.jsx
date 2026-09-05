import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { ShoppingBag } from "lucide-react";
import { useCart } from "./context/useCart";

const NAV_ITEMS = [
  { label: "Home", to: "/home" },
  { label: "Products", to: "/listing" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Help", to: "/help" },
];

const Navbar = () => {
  const { count } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-paper/95 backdrop-blur-sm transition-shadow duration-300 ${
        scrolled ? "shadow-[0_1px_0_0_var(--color-line),0_8px_20px_-16px_rgba(36,31,26,0.35)]" : "shadow-[0_1px_0_0_var(--color-line)]"
      }`}
    >
      <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 lg:px-10" aria-label="Primary">
        <NavLink to="/home" className="flex items-center gap-3" aria-label="HM Store, go to home">
          <img
            className="h-11 w-11 rounded-full object-cover"
            src="https://i.pinimg.com/736x/1d/15/5b/1d155b07cb2ad9daf581f5f559f7ac4a.jpg"
            alt=""
            width="44"
            height="44"
            decoding="async"
          />
          <span className="font-display text-xl font-semibold tracking-tight text-ink">HM Store</span>
        </NavLink>

        <ul className="hidden items-center gap-9 md:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className="group relative inline-block py-2 text-[15px] font-medium text-ink-soft transition-colors hover:text-ink"
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    <span
                      className={`absolute left-0 -bottom-0.5 h-[2px] rounded-full bg-bronze transition-all duration-300 ease-out ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <NavLink
          to="/cart"
          aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`}
          className="relative flex h-11 w-11 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-paper-dim hover:text-ink"
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
        </NavLink>
      </nav>
    </header>
  );
};
export default Navbar;
