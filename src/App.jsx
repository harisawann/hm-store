import { Route, Routes, useLocation } from "react-router";
import { Suspense, lazy, useEffect, useState } from "react";
import Navbar from "./Navbar";
import Slide from "./Slide";
import Footer from "./Footer";
import { CartProvider } from "./context/CartContext";

// Route-level code splitting: each page ships its own chunk, so the first
// load only pays for Home instead of the whole site.
const Home = lazy(() => import("./Home"));
const About = lazy(() => import("./About"));
const Listing = lazy(() => import("./Listing"));
const Help = lazy(() => import("./Help"));
const Buy = lazy(() => import("./Buy"));
const Contact = lazy(() => import("./Contact"));
const Cart = lazy(() => import("./Cart"));
const NotFound = lazy(() => import("./NotFound"));

function App() {

  const [mobile, setMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let frame = null;
    const handleResize = () => {
      // rAF-throttled: avoids running the layout check on every pixel of a drag-resize
      if (frame) return;
      frame = requestAnimationFrame(() => {
        setMobile(window.innerWidth < 768);
        frame = null;
      });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const Menu = mobile ? Slide : Navbar;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <CartProvider>
      <Menu />
      <Suspense fallback={<div className="mt-[120px] text-center text-muted">Loading…</div>}>
        <div key={location.pathname} className="page-enter">
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/listing" element={<><Listing /><Footer /></>} />
            <Route path="/about" element={<><About /><Footer /></>} />
            <Route path="/contact" element={<><Contact /><Footer /></>} />
            <Route path="/help" element={<><Help /><Footer /></>} />
            <Route path="/cart" element={<><Cart /><Footer /></>} />
            <Route path="/buy" element={<><Buy /><Footer /></>} />
            <Route path="*" element={<><NotFound /><Footer /></>} />
          </Routes>
        </div>
      </Suspense>
    </CartProvider>
  );
}

export default App;
