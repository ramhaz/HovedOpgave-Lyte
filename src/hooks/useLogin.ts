// US 2.2 – useLogin hook: håndterer login-logik og tilstand.
// Custom hook der adskiller forretningslogik fra UI (LoginScreen).
// Returnerer state og funktioner som LoginScreen bruger direkte.

import { useState } from 'react';
import { loginUser } from '../services/authService';

export default function useLogin(onSuccess: () => void) {
  // State til formularfelter og UI-feedback
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Håndter login: kald authService og opdater state baseret på resultat
  const handleLogin = async () => {
    setError('');       // nulstil fejlbesked
    setLoading(true);   // vis loading-indikator

    const result = await loginUser(email, password);

    if (result.success) {
      onSuccess(); // callback til parent (AuthContext opdateres automatisk via Supabase listener)
    } else {
      setError(result.error || 'Ukendt fejl.');
    }

    setLoading(false);
  };

  // Returnér alt som LoginScreen har brug for
  return { email, setEmail, password, setPassword, loading, error, handleLogin };
}