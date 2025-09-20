// src/models/Cart.ts
import mongoose, { Document, Model, Schema } from 'mongoose';
// import { Food } from '../../types/food';

interface CartItem {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  discount: number;
  quantity: number;
}

export interface ICart extends Document {
  userId: string;
  items: CartItem[];
}

const CartSchema = new Schema<ICart>({
  userId: { type: String, required: true, unique: true },
  items: [
    {
      id: String,
      title: String,
      imageUrl: String,
      price: Number,
      discount: Number,
      quantity: Number,
    },
  ],
});

const Cart: Model<ICart> =
  mongoose.models.Cart || mongoose.model('Cart', CartSchema);

export default Cart;
