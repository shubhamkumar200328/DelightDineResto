// app/api/cart/route.ts

import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import Cart from '@/models/Cart';
import { auth } from '@clerk/nextjs/server';

export async function GET(req: NextRequest) {
  await clientPromise;

  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

  const cart = await Cart.findOne({ userId });
  return NextResponse.json(cart || { items: [] });
}

export async function POST(req: NextRequest) {
  await clientPromise;

  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

  const { items } = await req.json();
  if (!items || !Array.isArray(items)) {
    return NextResponse.json({ error: 'Invalid items array' }, { status: 400 });
  }

  const updatedCart = await Cart.findOneAndUpdate(
    { userId },
    { items },
    { new: true, upsert: true },
  );

  return NextResponse.json(updatedCart);
}

export async function DELETE(req: NextRequest) {
  await clientPromise;

  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

  await Cart.findOneAndDelete({ userId });
  return new NextResponse(null, { status: 204 });
}
