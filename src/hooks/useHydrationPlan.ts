import { useEffect, useState } from 'react';
import { checkActivePlan, startPlan,restartPlan } from '../services/hydrationService';
import { useAuth } from '../context/AuthContext';


// US 3.1
export default function useHydrationPlan() {
  const { session } = useAuth();
  const userId = session?.user?.id;

  const [plan, setPlan] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState('');

  const fetchPlan = async () => {
    if (!userId) return;
    setLoading(true);
    const activePlan = await checkActivePlan(userId);
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

    const result = await startPlan(userId);

    if (result.success) {
      setPlan(result.plan);
    } else {
      setError(result.error || 'Noget gik galt.');
    }

    setStarting(false);
  };

  const handleRestartPlan = async () => {
    if (!userId) return;
    setStarting(true);
    setError('');

    const result = await restartPlan(userId);

    if (result.success) {
      setPlan(result.plan);
    } else {
      setError(result.error || 'Kunne ikke genstarte plan.');
    }

    setStarting(false);
  };

  return { plan, loading, starting, error,handleRestartPlan, handleStartPlan, refetch: fetchPlan };
}