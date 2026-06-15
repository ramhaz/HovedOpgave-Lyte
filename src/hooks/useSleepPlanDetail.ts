// useSleepPlanDetail hook: henter dagens søvn-log + alle søvn-logs.
// Samme mønster som usePlanDetail/useRunPlanDetail.

import { useEffect, useState, useCallback } from 'react';
import { getTodaySleepLog, getAllSleepLogs } from '../services/sleepService';

export default function useSleepPlanDetail(planId: number | null) {
  const [todayLog, setTodayLog] = useState<any>(null);
  const [allLogs, setAllLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchLogs = useCallback(async () => {
    if (!planId) return;
    setLoading(true);
    const [today, all] = await Promise.all([
      getTodaySleepLog(planId),
      getAllSleepLogs(planId),
    ]);
    setTodayLog(today);
    setAllLogs(all);
    setLoading(false);
  }, [planId]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  return { todayLog, allLogs, loading, refetch: fetchLogs };
}
