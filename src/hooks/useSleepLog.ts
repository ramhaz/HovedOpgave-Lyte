import { useState } from 'react';
import { addSleepEntry } from '../services/sleepService';

export default function useSleepLog(planId: number, dayNumber: number, onLogged: () => void) {
  const [customHours, setCustomHours] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  const logAmount = async (hours: number) => {
    setLoading(true);
    setFeedback('');

    const result = await addSleepEntry(planId, dayNumber, hours);

    if (result.success) {
      setFeedback(`${hours} timer registreret!`);
      onLogged();
      setTimeout(() => setFeedback(''), 2000);
    } else {
      setFeedback(result.error || 'Fejl');
    }

    setLoading(false);
  };

  const handleCustomLog = () => {
    const hours = parseFloat(customHours);
    if (hours > 0) {
      logAmount(hours);
      setCustomHours('');
    }
  };

  return { customHours, setCustomHours, feedback, loading, logAmount, handleCustomLog };
}
