import { useEffect, useState, useCallback } from 'react';
import { getTodayLog } from '../services/hydrationService';

// US 3.2
export default function useTodayLog(planId: number | null) {
  const [todayLog, setTodayLog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchTodayLog = useCallback(async () => {
    if (!planId) return;
    setLoading(true);
    const log = await getTodayLog(planId);
    setTodayLog(log);
    setLoading(false);
  }, [planId]);

  useEffect(() => {
    fetchTodayLog();
  }, [fetchTodayLog]);

  return { todayLog, loading, refetch: fetchTodayLog };
}