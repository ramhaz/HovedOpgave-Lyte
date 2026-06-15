// Order service — API-kald for at oprette ordrer og hente købshistorik.
// Kræver JWT-token i Authorization-headeren for at identificere brugeren.

import api from '../config/api';
import { CartItem, Order } from '../types/index';

// US 5.5.5 – Opret en ny ordre: sender kurvens varer til backend
export async function createOrder(items: CartItem[], token: string): Promise<{ success: boolean; order?: Order; error?: string }> {
  try {
    // Byg payload med kun de nødvendige felter fra kurvvarerne
    const payload = {
      items: items.map((i) => ({
        productId: i.productId,
        productName: i.productName,
        quantity: i.quantity,
        unitPrice: i.unitPrice,
      })),
    };

    // POST til /order med JWT-token så backend ved hvem der køber
    const res = await api.post('/order', payload, {
      headers: { Authorization: `Bearer ${token}` },
      timeout: 8000,
    });

    return { success: true, order: res.data };
  } catch (err: any) {
    // US 5.7 – Fejlhåndtering: tjek om det er netværksfejl eller serverfejl
    if (!err.response) {
      return { success: false, error: 'Ingen netværksforbindelse. Prøv igen.' };
    }
    const message = err.response?.data?.message || 'Ordren kunne ikke gennemføres.';
    return { success: false, error: message };
  }
}

// US 5.6.1 – Hent brugerens købshistorik (sorteret nyeste først af backend)
export async function getOrderHistory(token: string): Promise<Order[]> {
  try {
    const res = await api.get('/order', {
      headers: { Authorization: `Bearer ${token}` },
      timeout: 8000,
    });
    return res.data; // array af Order-objekter
  } catch (err: any) {
    console.log('Fejl ved hentning af ordrehistorik:', err);
    return []; // returnér tomt array ved fejl
  }
}
