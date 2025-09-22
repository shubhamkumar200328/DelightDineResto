import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Food } from '../../types/food';

interface CartState {
  cart: (Food & { quantity: number })[];
  addToCart: (item: Food) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  fetchCartFromDB: (userId: string) => Promise<void>;
  syncCartToDB: (userId: string) => Promise<void>;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (item) =>
        set((state) => {
          const existing = state.cart.find((f) => f.id === item.id);
          if (existing) {
            return {
              cart: state.cart.map((f) =>
                f.id === item.id ? { ...f, quantity: f.quantity + 1 } : f,
              ),
            };
          }
          return { cart: [...state.cart, { ...item, quantity: 1 }] };
        }),
      removeFromCart: (id) =>
        set((state) => ({ cart: state.cart.filter((f) => f.id !== id) })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          cart: state.cart.map((f) => (f.id === id ? { ...f, quantity } : f)),
        })),
      clearCart: () => set({ cart: [] }),

      fetchCartFromDB: async (userId) => {
        try {
          const res = await fetch('/api/cart', {
            headers: { 'x-user-id': userId },
          });
          if (!res.ok) throw new Error('Failed to fetch cart');
          const data = await res.json();
          if (Array.isArray(data.items)) {
            set({ cart: data.items });
          }
        } catch (error) {
          console.error(error);
        }
      },

      syncCartToDB: async (userId) => {
        try {
          const cart = get().cart;
          await fetch('/api/cart', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-user-id': userId,
            },
            body: JSON.stringify({ items: cart }),
          });
        } catch (error) {
          console.error(error);
        }
      },
    }),
    {
      name: 'cart-storage', // localStorage key
    },
  ),
);
