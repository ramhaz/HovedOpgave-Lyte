// US 5.5 + 5.7 – CartContext: global kurv-tilstand for hele appen.
// Bruger React Context til at dele kurv-data mellem alle komponenter.
// Alle ændringer (tilføj, slet, opdater antal) sker her, og total beregnes automatisk.

import { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem } from '../types/index';

// Type-definition for hvad CartContext stiller til rådighed
type CartContextType = {
  items: CartItem[];                                            // alle varer i kurven
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;        // tilføj vare
  updateQuantity: (productId: number, quantity: number) => void; // ændr antal
  removeItem: (productId: number) => void;                      // fjern vare
  clearCart: () => void;                                        // tøm kurven
  total: number;                                                // samlet pris
  itemCount: number;                                            // samlet antal varer
};

// Default-værdier for context (bruges hvis ingen Provider wrapper)
const CartContext = createContext<CartContextType>({
  items: [],
  addToCart: () => {},
  updateQuantity: () => {},
  removeItem: () => {},
  clearCart: () => {},
  total: 0,
  itemCount: 0,
});

// CartProvider wrapper appen og giver alle komponenter adgang til kurven via useCart()
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Tilføj vare til kurven — hvis varen allerede findes, øg antal med 1
  const addToCart = (newItem: Omit<CartItem, 'quantity'>) => {
    setItems((prev) => {
      // Tjek om varen allerede er i kurven
      const existing = prev.find((i) => i.productId === newItem.productId);
      if (existing) {
        // Varen findes: opdater antal (+1) for den pågældende vare
        return prev.map((i) =>
          i.productId === newItem.productId
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      // Ny vare: tilføj med quantity 1
      return [...prev, { ...newItem, quantity: 1 }];
    });
  };

  // Opdater antal for en vare — fjern varen hvis antal går til 0 eller under
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.productId === productId ? { ...i, quantity } : i))
    );
  };

  // US 5.7 – Fjern vare fra kurven med filter (beholder alt undtagen den fjernede)
  const removeItem = (productId: number) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  };

  // Tøm hele kurven (bruges efter gennemført køb)
  const clearCart = () => setItems([]);

  // Beregn total og antal — kører ved hver render (react beregner automatisk når items ændres)
  const total = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addToCart, updateQuantity, removeItem, clearCart, total, itemCount }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom hook — brug kurven i enhver komponent: const { items, addToCart } = useCart()
export function useCart() {
  return useContext(CartContext);
}
