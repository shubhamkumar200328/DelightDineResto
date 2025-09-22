'use client';
import { Food } from '../../types/food';
import { useCartStore } from '@/store/cartStore';

export default function FoodCard({ food }: { food: Food }) {
  const addToCart = useCartStore((s) => s.addToCart);
  const cart = useCartStore((s) => s.cart);

  console.log(cart);
  return (
    <div className="border border-gray-950 rounded-lg shadow-md max-w-[88%]">
      <img
        src={food.imageUrl}
        alt={food.title}
        width={320}
        height={240}
        className="object-cover rounded"
      />
      <div className="p-4">
        <h2 className="font-bold">{food.title}</h2>
        <p className="text-sm text-gray-500">{food.subtitle}</p>
        <p className="text-green-600 font-semibold">
          ₹{food.price - (food.price * food.discount) / 100}
          <span className="ml-2 line-through text-gray-400">₹{food.price}</span>
        </p>
        <button
          onClick={() => {
            addToCart(food);
          }}
          suppressHydrationWarning
          className="mt-2 w-full bg-blue-600 text-white py-1 rounded"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
