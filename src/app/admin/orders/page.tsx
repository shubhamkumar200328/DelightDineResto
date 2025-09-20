// app/admin/orders/page.tsx
import AdminOrderCard from '@/components/AdminOrderCard';
import { getOrdersFromDb } from '@/lib/orders';
import { Order } from '../../../../types/order';

export default async function AdminOrders() {
  const orders: Order[] = await getOrdersFromDb();

  return (
    <div className="p-6">
      <h1 className="font-bold text-xl mb-4">All Orders</h1>
      {orders.length === 0 && <p>No orders yet</p>}
      {orders.map((o) => (
        <AdminOrderCard key={o._id} order={o} />
      ))}
    </div>
  );
}
