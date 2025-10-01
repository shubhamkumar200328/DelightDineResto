// components/AdminOrderCard.tsx
'use client';

import { useState } from 'react';
import OrderStatus from './OrderStatus';
import { Order } from '../../types/order';

export default function AdminOrderCard({ order }: { order: Order }) {
  const [status, setStatus] = useState(order.status);

  const updateStatus = async (newStatus: Order['status']) => {
    try {
      const res = await fetch(`/api/order/${order.orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        throw new Error('Failed to update status');
      }

      setStatus(newStatus);
    } catch (error) {
      console.error('Error updating status:', error);
      // Optionally show error to user
    }
  };

  // const formattedDate = new Date(order.createdAt).toLocaleString();

  return (
    <div className="border p-4 rounded mb-2">
      <p className="font-bold">Order ID: {order.orderId}</p>
      <p className="text-sm text-gray-500">Created At: {order.createdAt}</p>
      {/* <p className="text-sm text-gray-500">Created At: {formattedDate}</p> */}
      <OrderStatus status={status} />
      <div className="mt-2 flex gap-2 flex-wrap">
        {['Preparing', 'Out for Delivery', 'Delivered'].map((s) => (
          <button
            key={s}
            onClick={() => updateStatus(s as Order['status'])}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
