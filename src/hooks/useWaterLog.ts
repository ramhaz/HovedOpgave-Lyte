// US 3.3 – useWaterLog hook: håndterer logning af vandindtag.
// Bruges af WaterLogInput-komponenten til at sende ml til API'et.

import { useState } from 'react';
import { addWaterIntake } from '../services/hydrationService';

export default function useWaterLog(planId: number, dayNumber: number, onLogged: () => void) {
  const [customMl, setCustomMl] = useState('');     // brugerens indtastede ml
  const [feedback, setFeedback] = useState('');      // succesbeskeder ("+ 250 ml tilføjet!")
  const [loading, setLoading] = useState(false);

  // Log en bestemt mængde ml (bruges af quick-buttons og custom input)
  const logAmount = async (amount: number) => {
    setLoading(true);
    setFeedback('');

    const result = await addWaterIntake(planId, dayNumber, amount);

    if (result.success) {
      setFeedback(`+${amount} ml tilføjet!`);
      onLogged(); // callback der refresher dagens data (progress bar opdateres)
      setTimeout(() => setFeedback(''), 2000); // fjern feedback efter 2 sek
    } else {
      setFeedback(result.error || 'Fejl');
    }

    setLoading(false);
  };

  // Håndter custom input: parse tekst til tal og log det
  const handleCustomLog = () => {
    const amount = parseInt(customMl);
    if (amount > 0) {
      logAmount(amount);
      setCustomMl(''); // nulstil inputfeltet
    }
  };

  return { customMl, setCustomMl, feedback, loading, logAmount, handleCustomLog };
}