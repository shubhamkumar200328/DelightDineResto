'use client';
import { Food } from '../../types/food';
import { useCartStore } from '@/store/cartStore';
import { toast } from 'react-toastify';

export default function FoodCard({ food }: { food: Food }) {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart(food);
    toast.success(`"${food.title}" added to cart!`);
  };

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
          onClick={handleAddToCart}
          className="mt-2 w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
