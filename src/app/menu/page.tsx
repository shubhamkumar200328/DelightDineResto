import { getAllFoods } from '@/lib/foods';
import Link from 'next/link';
import FoodCard from '@/components/FoodCard';
import shareIcon from '@/assets/share.png';
import Image from 'next/image';

export default async function MenuPage() {
  const foods = await getAllFoods();

  return (
    <div className=" p-3">
      <div className="grid grid-cols-4 gap-1 p-6">
        {foods.map((food) => (
          <FoodCard key={food.id} food={food} />
        ))}
      </div>
      <p className="border border-slate-900 rounded-md text-3xl my-3 py-2 flex flex-row justify-center">
        <span className="mx-2  flex flex-col justify-center">
          Forget not to Share meals with your favourite ones
        </span>
        <Link
          href="/menu/share_meals"
          className="text-4x cursor-pointer flex flex-col justify-center"
        >
          <Image
            src={shareIcon}
            alt="shareIcon"
            width={35}
            height={35}
            className="  border border-slate-900 hover:bg-orange-400 rounded-md p-1"
          />
        </Link>
      </p>
    </div>
  );
}
