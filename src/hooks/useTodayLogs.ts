// US 3.2 – useTodayLog hook: henter dagens hydreringslog.
// useCallback sikrer at fetchTodayLog kun genskabes når planId ændres.

import { useEffect, useState, useCallback } from 'react';
import { getTodayLog } from '../services/hydrationService';

export default function useTodayLog(planId: number | null) {
  const [todayLog, setTodayLog] = useState<any>(null); // dagens log-data
  const [loading, setLoading] = useState(true);

  // Hent dagens log fra API — useCallback forhindrer unødige re-renders
  const fetchTodayLog = useCallback(async () => {
    if (!planId) return;
    setLoading(true);
    const log = await getTodayLog(planId);
    setTodayLog(log);
    setLoading(false);
  }, [planId]);

  // Kør fetch når planId er tilgængelig
  useEffect(() => {
    fetchTodayLog();
  }, [fetchTodayLog]);

  // refetch bruges til at opdatere data efter en ny logning
  return { todayLog, loading, refetch: fetchTodayLog };
}