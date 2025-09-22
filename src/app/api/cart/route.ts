// // app/api/cart/route.ts

// import { NextRequest, NextResponse } from 'next/server';
// import clientPromise from '@/lib/mongodb';
// import Cart from '@/models/Cart';
// import { auth } from '@clerk/nextjs/server';

// export async function GET(req: NextRequest) {
//   await clientPromise;

//   const { userId } = await auth();
//   if (!userId)
//     return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

//   const cart = await Cart.findOne({ userId });
//   return NextResponse.json(cart || { items: [] });
// }

// export async function POST(req: NextRequest) {
//   await clientPromise;

//   const { userId } = await auth();
//   if (!userId)
//     return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

//   const { items } = await req.json();
//   if (!items || !Array.isArray(items)) {
//     return NextResponse.json({ error: 'Invalid items array' }, { status: 400 });
//   }

//   const updatedCart = await Cart.findOneAndUpdate(
//     { userId },
//     { items },
//     { new: true, upsert: true },
//   );

//   return NextResponse.json(updatedCart);
// }

// export async function DELETE(req: NextRequest) {
//   await clientPromise;

//   const { userId } = await auth();
//   if (!userId)
//     return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

//   await Cart.findOneAndDelete({ userId });
//   return new NextResponse(null, { status: 204 });
// }

import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Cart from '@/models/Cart';
import { auth } from '@clerk/nextjs/server';

// --- Database Connection Helper ---
// This ensures we reuse the database connection across requests.
async function connectToDatabase() {
  // Check if we have a connection to the database
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  // If not, create a new connection
  return mongoose.connect(process.env.MONGODB_URI as string, {
    // These options are recommended for modern Mongoose connections
    serverSelectionTimeoutMS: 10000, // Keep trying to send operations for 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  });
}

// --- GET: Fetch the user's cart ---
export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const cart = await Cart.findOne({ userId });
    // If no cart, return a new one to avoid errors on the frontend
    return NextResponse.json(cart || { userId, items: [] });
  } catch (error) {
    console.error('[GET /api/cart]', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

// --- POST: Update or create the user's cart ---
export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { items } = await req.json();
    if (!items || !Array.isArray(items)) {
      return NextResponse.json(
        { error: 'Invalid items array' },
        { status: 400 },
      );
    }

    const updatedCart = await Cart.findOneAndUpdate(
      { userId },
      { items },
      { new: true, upsert: true }, // upsert: true creates the document if it doesn't exist
    );

    return NextResponse.json(updatedCart);
  } catch (error) {
    console.error('[POST /api/cart]', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

// --- DELETE: Clear the user's cart ---
export async function DELETE(req: NextRequest) {
  try {
    await connectToDatabase();
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    await Cart.findOneAndDelete({ userId });
    return new NextResponse(null, { status: 204 }); // 204 No Content is standard for successful delete
  } catch (error) {
    console.error('[DELETE /api/cart]', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
