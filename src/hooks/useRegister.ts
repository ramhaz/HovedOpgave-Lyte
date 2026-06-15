// US 2.1 – useRegister hook: håndterer registreringslogik og tilstand.
// Samme mønster som useLogin — adskiller logik fra UI (RegisterScreen).

import { useState } from 'react';
import { registerUser } from '../services/authService';

export default function useRegister(onSuccess: () => void) {
  // State til formularfelter og UI-feedback
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Håndter registrering: kald authService og opdater state
  const handleRegister = async () => {
    setError('');
    setLoading(true);

    const result = await registerUser(email, password);

    if (result.success) {
      onSuccess(); // navigér til login-skærm efter succesfuld registrering
    } else {
      setError(result.error || 'Ukendt fejl.');
    }

    setLoading(false);
  };

  return { email, setEmail, password, setPassword, loading, error, handleRegister };
}