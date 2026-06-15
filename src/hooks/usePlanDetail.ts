// US 3.2, 3.4, 3.5 – usePlanDetail hook: henter både dagens log OG alle logs.
// Bruges på roadmap-skærmen der viser dagens mål + 30-dages oversigt.
// Promise.all henter begge dele parallelt for hurtigere load.

import { useEffect, useState, useCallback } from 'react';
import { getTodayLog, getAllLogs } from '../services/hydrationService';

export default function usePlanDetail(planId: number | null) {
  const [todayLog, setTodayLog] = useState<any>(null); // dagens log
  const [allLogs, setAllLogs] = useState<any[]>([]);    // alle 30 dages logs
  const [loading, setLoading] = useState(false);

  // Hent dagens log + alle logs parallelt
  const fetchLogs = useCallback(async () => {
    if (!planId) return;
    setLoading(true);
    const [today, all] = await Promise.all([
      getTodayLog(planId),
      getAllLogs(planId),
    ]);
    setTodayLog(today);
    setAllLogs(all);
    setLoading(false);
  }, [planId]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  // refetch bruges efter logning for at opdatere progress
  return { todayLog, allLogs, loading, refetch: fetchLogs };
}
