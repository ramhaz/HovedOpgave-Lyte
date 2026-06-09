import { useState } from 'react';
import { addRunIntake } from '../services/runningService';

export default function useRunLog(planId: number, dayNumber: number, onLogged: () => void) {
  const [customKm, setCustomKm] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  const logAmount = async (amount: number) => {
    setLoading(true);
    setFeedback('');

    const result = await addRunIntake(planId, dayNumber, amount);

    if (result.success) {
      setFeedback(`+${amount} km tilføjet!`);
      onLogged();
      setTimeout(() => setFeedback(''), 2000);
    } else {
      setFeedback(result.error || 'Fejl');
    }

    setLoading(false);
  };

  const handleCustomLog = () => {
    const amount = parseFloat(customKm);
    if (amount > 0) {
      logAmount(amount);
      setCustomKm('');
    }
  };

  return { customKm, setCustomKm, feedback, loading, logAmount, handleCustomLog };
}
