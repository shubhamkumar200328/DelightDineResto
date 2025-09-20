// app/menu/page.tsx
import { getAllFoods } from '@/lib/foods';
import FoodCard from '@/components/FoodCard';

export default async function MenuPage() {
  const foods = await getAllFoods();

  return (
    <div className="grid grid-cols-2 gap-4 p-6">
      {foods.map((food) => (
        <FoodCard key={food.id} food={food} />
      ))}
    </div>
  );
}
