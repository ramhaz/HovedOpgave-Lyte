// US 5.6.3 – useOrderHistory hook: henter brugerens købshistorik.
// Kræver auth-session for at sende JWT-token til API'et.
// Bruger .then/.catch/.finally chain i stedet for async/await.

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getOrderHistory } from '../services/orderService';
import { Order } from '../types/index';

export function useOrderHistory() {
  const { session } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Vent med at hente ordrer til vi har en gyldig session med token
    if (!session?.access_token) return;

    // Hent ordrehistorik og gem i state
    getOrderHistory(session.access_token)
      .then(setOrders)                                        // gem ordrer
      .catch(() => setError('Kunne ikke hente ordrehistorik.')) // vis fejl
      .finally(() => setLoading(false));                       // stop loading
  }, [session]);

  return { orders, loading, error };
}
