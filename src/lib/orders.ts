// // lib/orders.ts
// import clientPromise from '@/lib/mongodb';
// import { Order } from '../../types/order';

// export async function getOrdersFromDb(): Promise<Order[]> {
//   const client = await clientPromise;
//   const db = client.db();
//   const orders = await db.collection('orders').find().toArray();

//   const serializedOrders: Order[] = orders.map((order) => ({
//     _id: order._id.toString(),
//     orderId: order.orderId,
//     items: order.items,
//     status: order.status,
//     createdAt: new Date(order.createdAt).toLocaleString('en-US', {
//       timeZone: 'UTC', // You can change this
//     }),
//     // createdAt: order.createdAt?.toISOString(), // Convert Date to string
//   }));

//   return serializedOrders;
// }
import clientPromise from '@/lib/mongodb';
import { Order } from '../../types/order';
import { ObjectId } from 'mongodb';
import { auth } from '@clerk/nextjs/server';

// Helper function to connect to the database and get the orders collection
async function getOrdersCollection() {
  const client = await clientPromise;
  const db = client.db();
  return db.collection('orders');
}

// Helper to serialize an order document from MongoDB
const serializeOrder = (order: any): Order => {
  return {
    ...order,
    _id: order._id.toString(),
    createdAt: new Date(order.createdAt).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
  } as Order;
};

/**
 * Fetches all orders for the currently authenticated user.
 */
export async function getOrdersForUser(): Promise<Order[]> {
  const { userId } = await auth();
  if (!userId) {
    return [];
  }
  const ordersCollection = await getOrdersCollection();
  const orders = await ordersCollection
    .find({ userId })
    .sort({ createdAt: -1 })
    .toArray();
  return orders.map(serializeOrder);
}

/**
 * Fetches all orders from all users, intended for admin use.
 */
export async function getAllOrdersForAdmin(): Promise<Order[]> {
  const ordersCollection = await getOrdersCollection();
  const orders = await ordersCollection
    .find({})
    .sort({ createdAt: -1 })
    .toArray();
  return orders.map(serializeOrder);
}

/**
 * Fetches a single order by its unique orderId.
 */
export async function getOrderById(orderId: string): Promise<Order | null> {
  const ordersCollection = await getOrdersCollection();
  const order = await ordersCollection.findOne({ orderId });
  if (!order) {
    return null;
  }
  return serializeOrder(order);
}

/**
 * Updates the status of a specific order.
 */
export async function updateOrderStatus(
  orderId: string,
  status: string,
): Promise<void> {
  const ordersCollection = await getOrdersCollection();
  await ordersCollection.updateOne({ orderId }, { $set: { status } });
}
