import OrderStatus from '@/components/OrderStatus';
import { getOrderById } from '@/lib/data';

export default async function OrderPage({
  params,
}: {
  params: { orderId: string };
}) {
  const { orderId } = params;

  const order = await getOrderById(orderId);

  if (!order) {
    return <div className="p-6 text-red-500">Order not found.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Order Tracking</h1>
      <p className="mt-2">Order ID: {order.orderId}</p>
      <OrderStatus status={order.status} />
    </div>
  );
}
