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
export interface Retailer {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

// US 5.5 – Datamodel for kurv (5.5.2)
export type CartItem = {
  productId: number;
  productName: string;
  unitPrice: number;
  quantity: number;
};

// US 5.6 – Datamodel for ordre og ordrevarer
export type OrderItem = {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
};

export type Order = {
  id: number;
  totalPrice: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
};