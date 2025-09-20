import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import clientPromise from '@/lib/mongodb';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const title = formData.get('title') as string;
    const subtitle = formData.get('subtitle') as string;
    const discount = Number(formData.get('discount')) || 0;
    const price = Number(formData.get('price')) || 0;
    const quantity = Number(formData.get('quantity')) || 0;
    const file = formData.get('image') as File | null;

    if (!file) {
      return NextResponse.json(
        { error: 'Image file is required' },
        { status: 400 },
      );
    }

    // Convert File → Buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload to Cloudinary
    const result = await new Promise<any>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'foodItems' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      );
      stream.end(buffer);
    });

    // Insert into MongoDB
    const client = await clientPromise;
    const db = client.db();
    const foodItem = {
      imageUrl: result.secure_url,
      title,
      subtitle,
      discount,
      price,
      quantity,
      createdAt: new Date(),
    };

    const inserted = await db.collection('foodItems').insertOne(foodItem);

    return NextResponse.json({
      message: 'Food item added',
      foodItem: { ...foodItem, _id: inserted.insertedId },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const foods = await db.collection('foodItems').find().toArray();
    return NextResponse.json(foods);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
