import { useCallback, useEffect, useMemo, useState } from "react";
import { parsePrice } from "./cartUtils";
import { CartContext } from "./cartContextObject";

const STORAGE_KEY = "hmstore.cart.v1";

/** Same product identity the rest of the app already uses: the name. */
function idFor(product) {
  return product.id ?? product.name;
}

function readInitialCart() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    // Corrupt or blocked storage shouldn't crash the app — just start empty.
    return [];
  }
}

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(readInitialCart);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage can fail (private browsing, quota); the cart still works in-memory.
    }
  }, [items]);

  const addItem = useCallback((product, qty = 1) => {
    setItems((prev) => {
      const id = idFor(product);
      const existing = prev.find((item) => item.id === id);
      if (existing) {
        return prev.map((item) => (item.id === id ? { ...item, qty: item.qty + qty } : item));
      }
      return [
        ...prev,
        {
          id,
          name: product.name,
          price: product.price,
          img: product.img,
          qty,
        },
      ];
    });
  }, []);

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const increment = useCallback((id) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, qty: item.qty + 1 } : item)));
  }, []);

  const decrement = useCallback((id) => {
    setItems((prev) =>
      prev.flatMap((item) => {
        if (item.id !== id) return [item];
        if (item.qty <= 1) return []; // decrementing a lone item removes it
        return [{ ...item, qty: item.qty - 1 }];
      })
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const count = useMemo(() => items.reduce((sum, item) => sum + item.qty, 0), [items]);
  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + parsePrice(item.price) * item.qty, 0),
    [items]
  );

  const value = useMemo(
    () => ({ items, count, subtotal, addItem, removeItem, increment, decrement, clearCart }),
    [items, count, subtotal, addItem, removeItem, increment, decrement, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
