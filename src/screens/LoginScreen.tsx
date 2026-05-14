import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import useLogin from '../hooks/useLogin';
import { useFonts, Montserrat_700Bold_Italic } from '@expo-google-fonts/montserrat';

type Props = {
  onLoginSuccess: () => void;
  onGoToRegister: () => void;
};

export default function LoginScreen({ onLoginSuccess, onGoToRegister }: Props) {
  const { email, setEmail, password, setPassword, loading, error, handleLogin } =
    useLogin(onLoginSuccess);
    const [fontsLoaded] = useFonts({
    Montserrat_700Bold_Italic,
  });
  
  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>LYTE+</Text>
      <Text style={styles.title}>Log ind</Text>
      <Text style={styles.subtitle}>Velkommen tilbage</Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#A09A8A"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Adgangskode"
        placeholderTextColor="#A09A8A"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#F5F0E1" />
        ) : (
          <Text style={styles.buttonText}>Log ind</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={onGoToRegister} style={styles.linkButton}>
        <Text style={styles.linkText}>
          Har du ikke en konto? Opret konto
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F0E1',
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  logo: {
    fontSize: 44,
    fontFamily: 'Montserrat_700Bold_Italic',
    color: '#1A1A1A',
    letterSpacing: 6,
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  subtitle: {
    fontSize: 16,
    color: '#7A7568',
    marginTop: 4,
    marginBottom: 28,
  },
  error: {
    fontSize: 14,
    color: '#C44040',
    backgroundColor: '#F5E6E6',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    fontSize: 16,
    color: '#1A1A1A',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E8E3D4',
  },
  button: {
    backgroundColor: '#1A1A1A',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F5F0E1',
  },
  linkButton: {
    alignItems: 'center',
    marginTop: 20,
  },
  linkText: {
    fontSize: 14,
    color: '#7A7568',
  },
});