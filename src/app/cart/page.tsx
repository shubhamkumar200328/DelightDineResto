'use client';
import { useEffect, useState } from 'react';
import { useUser, useAuth } from '@clerk/nextjs';
import { useCartStore } from '@/store/cartStore';
import CartItem from '@/components/CartItem';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { isLoaded, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const { cart, clearCart, fetchCartFromDB, syncCartToDB } = useCartStore();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // --- UPDATED: Fetches cart with token on load ---
  useEffect(() => {
    const loadCart = async () => {
      if (isLoaded && isSignedIn) {
        const token = await getToken();
        if (token) {
          await fetchCartFromDB(token);
        }
      }
      setLoading(false);
    };
    loadCart();
  }, [isLoaded, isSignedIn, getToken, fetchCartFromDB]);

  // --- UPDATED: Syncs cart with token when it changes ---
  useEffect(() => {
    // Avoid syncing on initial load before cart is fetched
    if (loading) return;

    const syncCart = async () => {
      if (isSignedIn) {
        const token = await getToken();
        if (token) {
          await syncCartToDB(token);
        }
      }
    };
    syncCart();
  }, [cart, loading, isSignedIn, getToken, syncCartToDB]);

  if (!isLoaded) return <p className="text-center p-6">Loading...</p>;
  if (!isSignedIn)
    return <p className="text-center p-6">Please sign in to view your cart.</p>;

  const total = cart.reduce((sum, f) => sum + f.price * f.quantity, 0);

  const handlePlaceOrder = async () => {
    try {
      const token = await getToken();
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ items: cart }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to place order');
      }

      const orderId = data.orderId;
      clearCart();
      router.push(`/order/${orderId}`);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  if (loading) return <p className="text-center p-6">Loading cart...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
      )}

      {cart.length > 0 && (
        <div className="mt-6 pt-4 border-t">
          <p className="text-xl font-semibold text-right">
            Total: ₹{total.toFixed(2)}
          </p>
          <div className="flex justify-end mt-4">
            <button
              onClick={handlePlaceOrder}
              className="bg-green-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-green-700"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
