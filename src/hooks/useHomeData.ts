// useHomeData hook: henter alle data til forsiden (produkter, ingredienser, anmeldelser).
// Bruger Promise.all til at hente alle tre endpoints parallelt for hurtigere load.

import { useEffect, useState } from 'react';
import api from '../config/api';
import { Product, Ingredient, Review } from '../types/index';

export default function useHomeData() {
  const [products, setProducts] = useState<Product[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  // useEffect kører én gang ved mount (tomt dependency array [])
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Hent produkter, ingredienser og anmeldelser parallelt med Promise.all
        const [prodRes, ingRes, revRes] = await Promise.all([
          api.get('/product', { timeout: 3000 }),
          api.get('/ingredient', { timeout: 3000 }),
          api.get('/review', { timeout: 3000 }),
        ]);
        // Gem data i state
        setProducts(prodRes.data);
        setIngredients(ingRes.data);
        setReviews(revRes.data);
      } catch (err) {
        console.log('Fejl ved hentning af data:', err);
      } finally {
        setLoading(false); // loading slut uanset succes eller fejl
      }
    };
    fetchData();
  }, []);

  return { products, ingredients, reviews, loading };
}