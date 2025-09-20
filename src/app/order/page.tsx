// app/order/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  _id: string;
  orderId: string;
  status: string;
  createdAt: string;
  items: OrderItem[];
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch('/api/order', { cache: 'no-store' });
        const text = await res.text();
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${text}`);
        }
        const data = JSON.parse(text);
        // optional: validate data
        if (!Array.isArray(data)) {
          throw new Error('Response is not an array');
        }
        setOrders(data);
      } catch (err: any) {
        console.error('Error fetching orders:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="p-6">Loading orders...</div>;
  }

  if (error) {
    return (
      <div className="p-6 text-red-500">Failed to load orders: {error}</div>
    );
  }

  if (!orders || orders.length === 0) {
    return <div className="p-6">No orders have been placed yet.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Orders</h1>
      {orders.map((order) => (
        <div
          key={order._id}
          className="border border-gray-300 p-4 mb-4 rounded-md shadow-sm"
        >
          <div className="mb-2">
            <span className="font-semibold">Order ID:</span>{' '}
            <Link
              href={`/order/${order.orderId}`}
              className="text-blue-600 hover:underline"
            >
              {order.orderId}
            </Link>
          </div>
          <div className="mb-2">
            <span className="font-semibold">Status:</span> {order.status}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Placed on:</span>{' '}
            {new Date(order.createdAt).toLocaleString()}
          </div>
          <div>
            <span className="font-semibold">Items:</span>
            <ul className="ml-4 list-disc">
              {order.items.map((item) => (
                <li key={item.id}>
                  {item.name} — ₹{item.price} × {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
