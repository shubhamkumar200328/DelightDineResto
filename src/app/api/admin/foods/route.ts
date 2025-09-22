// import { NextRequest, NextResponse } from 'next/server';
// import cloudinary from '@/lib/cloudinary';
// import clientPromise from '@/lib/mongodb';

// export async function POST(req: NextRequest) {
//   try {
//     const formData = await req.formData();

//     const title = formData.get('title') as string;
//     const subtitle = formData.get('subtitle') as string;
//     const discount = Number(formData.get('discount')) || 0;
//     const price = Number(formData.get('price')) || 0;
//     const quantity = Number(formData.get('quantity')) || 0;
//     const file = formData.get('image') as File | null;

//     if (!file) {
//       return NextResponse.json(
//         { error: 'Image file is required' },
//         { status: 400 },
//       );
//     }

//     const buffer = Buffer.from(await file.arrayBuffer());

//     const result = await new Promise<any>((resolve, reject) => {
//       const stream = cloudinary.uploader.upload_stream(
//         { folder: 'foodItems' },
//         (error, result) => {
//           if (error) reject(error);
//           else resolve(result);
//         },
//       );
//       stream.end(buffer);
//     });

//     const client = await clientPromise;
//     const db = client.db();
//     const foodItem = {
//       imageUrl: result.secure_url,
//       title,
//       subtitle,
//       discount,
//       price,
//       quantity,
//       createdAt: new Date(),
//     };

//     const inserted = await db.collection('foodItems').insertOne(foodItem);

//     return NextResponse.json({
//       message: 'Food item added',
//       foodItem: { ...foodItem, _id: inserted.insertedId },
//     });
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// export async function GET() {
//   try {
//     const client = await clientPromise;
//     const db = client.db();
//     const foods = await db.collection('foodItems').find().toArray();
//     return NextResponse.json(foods);
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// --- POST: Add a new food item ---
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

    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await new Promise<any>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'foodItems' },
        (error, result) => (error ? reject(error) : resolve(result)),
      );
      stream.end(buffer);
    });

    const client = await clientPromise;
    const db = client.db();
    const foodItem = {
      imageUrl: result.secure_url,
      cloudinaryPublicId: result.public_id, // Store public_id to delete from Cloudinary later
      title,
      subtitle,
      discount,
      price,
      quantity,
      createdAt: new Date(),
    };

    const inserted = await db.collection('foodItems').insertOne(foodItem);
    return NextResponse.json(
      {
        message: 'Food item added successfully',
        foodItem: { ...foodItem, _id: inserted.insertedId },
      },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// --- GET: Fetch all food items ---
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const foods = await db
      .collection('foodItems')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    return NextResponse.json(foods);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// --- PUT: Update a food item ---
export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Valid food item ID is required' },
        { status: 400 },
      );
    }

    const formData = await req.formData();
    const client = await clientPromise;
    const db = client.db();

    const existingFoodItem = await db
      .collection('foodItems')
      .findOne({ _id: new ObjectId(id) });
    if (!existingFoodItem) {
      return NextResponse.json(
        { error: 'Food item not found' },
        { status: 404 },
      );
    }

    const updateData: any = {
      title: formData.get('title') as string,
      subtitle: formData.get('subtitle') as string,
      discount: Number(formData.get('discount')),
      price: Number(formData.get('price')),
      quantity: Number(formData.get('quantity')),
    };

    const file = formData.get('image') as File | null;
    if (file) {
      // If a new image is uploaded, delete the old one from Cloudinary and upload the new one.
      if (existingFoodItem.cloudinaryPublicId) {
        await cloudinary.uploader.destroy(existingFoodItem.cloudinaryPublicId);
      }
      const buffer = Buffer.from(await file.arrayBuffer());
      const result = await new Promise<any>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'foodItems' },
          (err, res) => (err ? reject(err) : resolve(res)),
        );
        stream.end(buffer);
      });
      updateData.imageUrl = result.secure_url;
      updateData.cloudinaryPublicId = result.public_id;
    }

    await db
      .collection('foodItems')
      .updateOne({ _id: new ObjectId(id) }, { $set: updateData });

    return NextResponse.json({ message: 'Food item updated successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// --- DELETE: Remove a food item ---
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Valid food item ID is required' },
        { status: 400 },
      );
    }

    const client = await clientPromise;
    const db = client.db();

    const foodItemToDelete = await db
      .collection('foodItems')
      .findOne({ _id: new ObjectId(id) });
    if (!foodItemToDelete) {
      return NextResponse.json(
        { error: 'Food item not found' },
        { status: 404 },
      );
    }

    // Delete image from Cloudinary
    if (foodItemToDelete.cloudinaryPublicId) {
      await cloudinary.uploader.destroy(foodItemToDelete.cloudinaryPublicId);
    }

    // Delete item from MongoDB
    await db.collection('foodItems').deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ message: 'Food item deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
