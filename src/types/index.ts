// TypeScript types der beskriver datastrukturen for hele appen.
// Bruges til at sikre typesikkerhed når data hentes fra API eller sendes til backend.

// Produkt-type — repræsenterer et produkt fra webshoppen
export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
};

// Ingrediens-type — indholdsdeklaration for et produkt (fx elektrolytter)
export type Ingredient = {
  id: number;
  name: string;
  amount: number;
  unit: string;
  type: string;
  productId: number; // hvilken produkt ingrediensen hører til
};

// Anmeldelse-type — brugeranmeldelse af et produkt
export type Review = {
  id: number;
  rating: number;
  name: string;
  text: string;
  date: string;
};

// Forhandler-type — fysisk butik der sælger produktet
export interface Retailer {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

// US 5.5 – Kurvvare: en vare i brugerens indkøbskurv
export type CartItem = {
  productId: number;
  productName: string;
  unitPrice: number;
  quantity: number;
};

// US 5.6 – Ordrevare: en enkelt varelinje i en gennemført ordre
export type OrderItem = {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
};

// US 5.6 – Ordre: en samlet ordre med alle varer, totalpris og status
export type Order = {
  id: number;
  totalPrice: number;
  status: string;
  createdAt: string;
  items: OrderItem[]; // alle varer i ordren
};