import { useState } from 'react';
import { addWaterIntake } from '../services/hydrationService';

// US 3.3
export default function useWaterLog(planId: number, dayNumber: number, onLogged: () => void) {
  const [customMl, setCustomMl] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  const logAmount = async (amount: number) => {
    setLoading(true);
    setFeedback('');

    const result = await addWaterIntake(planId, dayNumber, amount);

    if (result.success) {
      setFeedback(`+${amount} ml tilføjet!`);
      onLogged();
      setTimeout(() => setFeedback(''), 2000);
    } else {
      setFeedback(result.error || 'Fejl');
    }

    setLoading(false);
  };

  const handleCustomLog = () => {
    const amount = parseInt(customMl);
    if (amount > 0) {
      logAmount(amount);
      setCustomMl('');
    }
  };

  return { customMl, setCustomMl, feedback, loading, logAmount, handleCustomLog };
}