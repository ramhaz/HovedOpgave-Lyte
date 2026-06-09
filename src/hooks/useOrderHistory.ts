// US 5.6.3 – Henter brugerens ordrehistorik sorteret nyeste først
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
    if (!session?.access_token) return;

    getOrderHistory(session.access_token)
      .then(setOrders)
      .catch(() => setError('Kunne ikke hente ordrehistorik.'))
      .finally(() => setLoading(false));
  }, [session]);

  return { orders, loading, error };
}
