import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { getAuth } from '@clerk/nextjs/server';

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
  req: NextRequest,
  context: { params: { orderId: string } },
) {
  const { params } = context;
  try {
    const { status } = await req.json();
    const client = await clientPromise;
    const db = client.db();

    const result = await db
      .collection('orders')
      .findOneAndUpdate(
        { orderId: params.orderId },
        { $set: { status } },
        { returnDocument: 'after' },
      );

    if (!result || !result.value) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json(result.value);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
