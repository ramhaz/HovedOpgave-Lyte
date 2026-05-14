import { useState } from 'react';
import { loginUser } from '../services/authService';

//userstorie 2.2
export default function useLogin(onSuccess: () => void) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    setLoading(true);

    const result = await loginUser(email, password);

    if (result.success) {
      onSuccess();
    } else {
      setError(result.error || 'Ukendt fejl.');
    }

    setLoading(false);
  };

  return { email, setEmail, password, setPassword, loading, error, handleLogin };
}