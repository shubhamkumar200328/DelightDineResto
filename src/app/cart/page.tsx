// app/cart/page.tsx

'use client';
import { useEffect, useState } from 'react';
import { useUser, useAuth } from '@clerk/nextjs'; // import useAuth here
import { useCartStore } from '@/store/cartStore';
import CartItem from '@/components/CartItem';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const { getToken } = useAuth(); // ⚠️ Move this here, at the top
  const { cart, clearCart, fetchCartFromDB, syncCartToDB } = useCartStore();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      fetchCartFromDB(user.id).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [fetchCartFromDB, isLoaded, isSignedIn, user]);

  useEffect(() => {
    if (!loading && isSignedIn && user) {
      syncCartToDB(user.id);
    }
  }, [cart, loading, syncCartToDB, isSignedIn, user]);

  if (!isLoaded) return <p>Loading...</p>;
  if (!isSignedIn) return <p>Please sign in to view your cart.</p>;

  const total = cart.reduce((sum, f) => sum + f.price * f.quantity, 0);

  const handlePlaceOrder = async () => {
    try {
      const token = await getToken(); // use it here
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

  if (loading) return <p>Loading cart...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Your Cart</h1>
      {cart.length === 0 && <p>No items in cart</p>}
      {cart.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
      <p className="mt-4 font-semibold">Total: ₹{total}</p>
      {cart.length > 0 && (
        <button
          onClick={handlePlaceOrder}
          className="mt-2 bg-green-600 text-white py-2 px-4 rounded"
        >
          Place Order
        </button>
      )}
    </div>
  );
}
