// types/order.ts
import { Food } from './food';

export interface Order {
  _id?: string;
  orderId: string;
  items: Food[];
  status: 'Pending' | 'Preparing' | 'Out for Delivery' | 'Delivered';
  createdAt: string; // ✅ Serializable ISO string
  // createdAt: Date; // ❌ Not serializable
}
