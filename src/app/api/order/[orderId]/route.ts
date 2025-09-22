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

// The function signature has been corrected to properly handle the `request` and `params`.
export async function PATCH(
  request: NextRequest,
  { params }: { params: { orderId: string } },
) {
  try {
    // The orderId is correctly destructured from the params object.
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

    // Call the database function to update the order status.
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

// export async function PATCH(
//   req: NextRequest,
//   context: { params: { orderId: string } },
// ) {
//   const { params } = context;
//   try {
//     const { status } = await req.json();
//     const client = await clientPromise;
//     const db = client.db();

//     const result = await db
//       .collection('orders')
//       .findOneAndUpdate(
//         { orderId: params.orderId },
//         { $set: { status } },
//         { returnDocument: 'after' },
//       );

//     if (!result || !result.value) {
//       return NextResponse.json({ error: 'Order not found' }, { status: 404 });
//     }

//     return NextResponse.json(result.value);
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
