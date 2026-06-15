// US 3.1 – useHydrationPlan hook: håndterer hydreringsplanens tilstand.
// Henter aktiv plan ved login, og giver funktioner til at starte/genstarte planen.
// Bruger useAuth() til at få brugerens ID fra Supabase-sessionen.

import { useEffect, useState } from 'react';
import { checkActivePlan, startPlan,restartPlan } from '../services/hydrationService';
import { useAuth } from '../context/AuthContext';

export default function useHydrationPlan() {
  const { session } = useAuth();
  const userId = session?.user?.id; // hent bruger-ID fra session

  const [plan, setPlan] = useState<any>(null);       // den aktive plan (eller null)
  const [loading, setLoading] = useState(true);       // loading ved første hentning
  const [starting, setStarting] = useState(false);    // loading når plan startes
  const [error, setError] = useState('');

  // Hent aktiv plan fra API
  const fetchPlan = async () => {
    if (!userId) return;
    setLoading(true);
    const activePlan = await checkActivePlan(userId);
    setPlan(activePlan);
    setLoading(false);
  };

  // Kør fetchPlan når userId er tilgængelig (efter login)
  useEffect(() => {
    fetchPlan();
  }, [userId]);

  // Start en ny 30-dages plan
  const handleStartPlan = async () => {
    if (!userId) return;
    setStarting(true);
    setError('');

    const result = await startPlan(userId);

    if (result.success) {
      setPlan(result.plan); // gem den nye plan i state
    } else if (result.error?.includes('allerede en aktiv plan')) {
      await fetchPlan(); // planen fandtes allerede — hent den i stedet
    } else {
      setError(result.error || 'Noget gik galt.');
    }

    setStarting(false);
  };

  // Genstart planen (slet gammel + opret ny)
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
