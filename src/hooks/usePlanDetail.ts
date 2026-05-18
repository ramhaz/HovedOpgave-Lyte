import { useEffect, useState, useCallback } from 'react';
import { getTodayLog, getAllLogs } from '../services/hydrationService';

// US 3.2, 3.4, 3.5
export default function usePlanDetail(planId: number | null) {
  const [todayLog, setTodayLog] = useState<any>(null);
  const [allLogs, setAllLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

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

  return { todayLog, allLogs, loading, refetch: fetchLogs };
}
