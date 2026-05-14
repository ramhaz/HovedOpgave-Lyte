import { useState } from 'react';
import { registerUser } from '../services/authService';

export default function useRegister(onSuccess: () => void) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    setError('');
    setLoading(true);

    const result = await registerUser(email, password);

    if (result.success) {
      onSuccess();
    } else {
      setError(result.error || 'Ukendt fejl.');
    }

    setLoading(false);
  };

  return { email, setEmail, password, setPassword, loading, error, handleRegister };
}