import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { getAuth } from '@clerk/nextjs/server';
import { updateOrderStatus } from '@/lib/orders';

export async function GET(req: NextRequest) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db();

    const orders = await db
      .collection('orders')
      .find({ userId: userId })
      .sort({ createdAt: -1 }) // Sort by most recent
      .toArray();

    return NextResponse.json(orders);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { orderId: string } },
) {
  try {
    const { orderId } = params;
    const { status } = await request.json();

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 },
      );
    }

    if (!status) {
      return NextResponse.json(
        { error: 'A new status is required' },
        { status: 400 },
      );
    }

    await updateOrderStatus(orderId, status);

    return NextResponse.json({ message: 'Order status updated successfully.' });
  } catch (error) {
    console.error('[API_ORDER_PATCH_ERROR]', error);
    return NextResponse.json(
      { error: 'Internal server error while updating the order.' },
      { status: 500 },
    );
  }
}
