// useRunningPlan hook: håndterer løbeplanens tilstand.
// Samme mønster som useHydrationPlan — hent aktiv plan, start ny, genstart.

import { useEffect, useState } from 'react';
import { checkActiveRunPlan, startRunPlan, restartRunPlan } from '../services/runningService';
import { useAuth } from '../context/AuthContext';

export default function useRunningPlan() {
  const { session } = useAuth();
  const userId = session?.user?.id;

  const [plan, setPlan] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState('');

  const fetchPlan = async () => {
    if (!userId) return;
    setLoading(true);
    const activePlan = await checkActiveRunPlan(userId);
    setPlan(activePlan);
    setLoading(false);
  };

  useEffect(() => {
    fetchPlan();
  }, [userId]);

  const handleStartPlan = async () => {
    if (!userId) return;
    setStarting(true);
    setError('');

    const result = await startRunPlan(userId);

    if (result.success) {
      setPlan(result.plan);
    } else if (result.error?.includes('allerede en aktiv')) {
      await fetchPlan();
    } else {
      setError(result.error || 'Noget gik galt.');
    }

    setStarting(false);
  };

  const handleRestartPlan = async () => {
    if (!userId) return;
    setStarting(true);
    setError('');

    const result = await restartRunPlan(userId);

    if (result.success) {
      setPlan(result.plan);
    } else {
      setError(result.error || 'Kunne ikke genstarte løbeplan.');
    }

    setStarting(false);
  };

  return { plan, loading, starting, error, handleRestartPlan, handleStartPlan, refetch: fetchPlan };
}
