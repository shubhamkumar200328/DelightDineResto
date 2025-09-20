// src/lib/data.ts
import 'server-only'; // Ensures this code only runs on the server
import clientPromise from '@/lib/mongodb';

export async function getOrderById(orderId: string) {
  try {
    const client = await clientPromise;
    const db = client.db();

    const order = await db.collection('orders').findOne({ orderId: orderId });

    if (!order) {
      return null;
    }

    // You must convert the MongoDB _id and any Date objects to strings
    // so they are serializable and can be passed from a Server to Client Component.
    return JSON.parse(JSON.stringify(order));
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch order.');
  }
}
