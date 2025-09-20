// src/lib/foods.ts
import clientPromise from './mongodb';
import { Food } from '../../types/food';

export async function getAllFoods(): Promise<Food[]> {
  const client = await clientPromise;
  const db = client.db();
  const rawFoods = await db.collection('foodItems').find().toArray();

  return rawFoods.map((item) => ({
    id: item._id.toString(), // ✅ normalize here
    title: item.title,
    subtitle: item.subtitle,
    imageUrl: item.imageUrl,
    price: item.price,
    discount: item.discount,
    quantity: item.quantity,
  }));
}
