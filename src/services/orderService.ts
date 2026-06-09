// US 5.5.5 – POST /api/order: opret ordre
// US 5.6.1 – GET /api/order: hent brugerens købshistorik
// US 5.7 – Fejlhåndtering: netværk, tom kurv, ugyldig ordre
import api from '../config/api';
import { CartItem, Order } from '../types/index';

export async function createOrder(items: CartItem[], token: string): Promise<{ success: boolean; order?: Order; error?: string }> {
  try {
    const payload = {
      items: items.map((i) => ({
        productId: i.productId,
        productName: i.productName,
        quantity: i.quantity,
        unitPrice: i.unitPrice,
      })),
    };

    const res = await api.post('/order', payload, {
      headers: { Authorization: `Bearer ${token}` },
      timeout: 8000,
    });

    return { success: true, order: res.data };
  } catch (err: any) {
    if (!err.response) {
      return { success: false, error: 'Ingen netværksforbindelse. Prøv igen.' };
    }
    const message = err.response?.data?.message || 'Ordren kunne ikke gennemføres.';
    return { success: false, error: message };
  }
}

export async function getOrderHistory(token: string): Promise<Order[]> {
  try {
    const res = await api.get('/order', {
      headers: { Authorization: `Bearer ${token}` },
      timeout: 8000,
    });
    return res.data;
  } catch (err: any) {
    console.log('Fejl ved hentning af ordrehistorik:', err);
    return [];
  }
}
