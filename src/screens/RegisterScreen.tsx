import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import useRegister from '../hooks/useRegister';
import { useFonts, Montserrat_700Bold_Italic } from '@expo-google-fonts/montserrat';

type Props = {
  onRegisterSuccess: () => void;
  onGoToLogin: () => void;
};

export default function RegisterScreen({ onRegisterSuccess, onGoToLogin }: Props) {
  const { email, setEmail, password, setPassword, loading, error, handleRegister } =
    useRegister(onRegisterSuccess);
        const [fontsLoaded] = useFonts({
        Montserrat_700Bold_Italic,
      });

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>LYTE+</Text>
      <Text style={styles.title}>Opret konto</Text>
      <Text style={styles.subtitle}>Kom i gang med LYTE</Text>

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
        style={styles.button}
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#F5F0E1" />
        ) : (
          <Text style={styles.buttonText}>Opret konto</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={onGoToLogin} style={styles.linkButton}>
        <Text style={styles.linkText}>
          Har du allerede en konto? Log ind
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