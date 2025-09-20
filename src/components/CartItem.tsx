// components/CartItem.tsx
'use client';
import { Food } from '../../types/food';
import { useCartStore } from '@/store/cartStore';

export default function CartItem({ item }: { item: Food }) {
  const { updateQuantity, removeFromCart } = useCartStore();

  return (
    <div className="flex items-center justify-between border-b py-2">
      <div>
        <h3 className="font-bold">{item.title}</h3>
        <p className="text-sm">₹{item.price}</p>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="number"
          min={1}
          value={item.quantity}
          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
          className="w-12 border rounded text-center"
        />
        <button
          onClick={() => removeFromCart(item.id)}
          className="text-red-500"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
