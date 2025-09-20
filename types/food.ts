// types/food.ts
export interface Food {
  id: string;
  imageUrl: string;
  title: string;
  subtitle: string;
  discount: number; // percentage
  price: number;
  quantity: number;
}
