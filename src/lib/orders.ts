// lib/orders.ts
import clientPromise from '@/lib/mongodb';
import { Order } from '../../types/order';

export async function getOrdersFromDb(): Promise<Order[]> {
  const client = await clientPromise;
  const db = client.db();
  const orders = await db.collection('orders').find().toArray();

  const serializedOrders: Order[] = orders.map((order) => ({
    _id: order._id.toString(),
    orderId: order.orderId,
    items: order.items,
    status: order.status,
    createdAt: new Date(order.createdAt).toLocaleString('en-US', {
      timeZone: 'UTC', // You can change this
    }),
    // createdAt: order.createdAt?.toISOString(), // Convert Date to string
  }));

  return serializedOrders;
}
