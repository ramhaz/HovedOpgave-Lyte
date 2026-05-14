export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
};

export type Ingredient = {
  id: number;
  name: string;
  amount: number;
  unit: string;
  type: string;
  productId: number;
};

export type Review = {
  id: number;
  rating: number;
  name: string;
  text: string;
  date: string;
};