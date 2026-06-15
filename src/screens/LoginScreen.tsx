// US 2.2 – LoginScreen: login-formular med email og adgangskode.
// Bruger useLogin hook til al logik — denne komponent er kun UI.
// KeyboardAvoidingView sørger for at formularen ikke skjules af tastaturet på iOS.

import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import useLogin from '../hooks/useLogin';
import { useFonts, Montserrat_700Bold_Italic } from '@expo-google-fonts/montserrat';
import { neu, C } from '../config/neu';

type Props = {
  onLoginSuccess: () => void;
  onGoToRegister: () => void;
};

export default function LoginScreen({ onLoginSuccess, onGoToRegister }: Props) {
  // Hent state og funktioner fra useLogin hook
  const { email, setEmail, password, setPassword, loading, error, handleLogin } =
    useLogin(onLoginSuccess);
  const [fontsLoaded] = useFonts({ Montserrat_700Bold_Italic });
  if (!fontsLoaded) return null;

  return (
    <View style={styles.bg}>
      <KeyboardAvoidingView
        style={styles.inner}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.logoArea}>
          <Text style={[styles.logo, { letterSpacing: 1 }]}>LYTE+</Text>
          <Text style={styles.tagline}>Hydrer du rigtigt?</Text>
        </View>

        <View style={[neu.card, styles.form]}>
          <Text style={styles.title}>Log ind</Text>
          <Text style={styles.subtitle}>Velkommen tilbage</Text>

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <TextInput
            style={[neu.inset, styles.input]}
            placeholder="Email"
            placeholderTextColor={C.textMuted}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={[neu.inset, styles.input]}
            placeholder="Adgangskode"
            placeholderTextColor={C.textMuted}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity
            style={[neu.darkBtn, loading && styles.btnDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={C.bg} />
            ) : (
              <Text style={styles.btnText}>Log ind</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={onGoToRegister} style={styles.linkBtn}>
            <Text style={styles.linkText}>Har du ikke en konto? Opret konto</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: C.bg,
  },
  inner: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  logoArea: {
    paddingBottom: 32,
    paddingHorizontal: 4,
  },
  logo: {
    fontSize: 52,
    fontFamily: 'Montserrat_700Bold_Italic',
    color: C.text,
    letterSpacing: 6,
  },
  tagline: {
    fontSize: 16,
    color: C.textSoft,
    marginTop: 4,
  },
  form: {
    gap: 0,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: C.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: C.textSoft,
    marginBottom: 20,
  },
  error: {
    fontSize: 14,
    color: C.error,
    backgroundColor: '#F5E6E6',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  input: {
    padding: 16,
    fontSize: 16,
    color: C.text,
    marginBottom: 12,
  },
  btnDisabled: {
    opacity: 0.6,
  },
  btnText: {
    fontSize: 16,
    fontWeight: '700',
    color: C.bg,
  },
  linkBtn: {
    alignItems: 'center',
    marginTop: 16,
  },
  linkText: {
    fontSize: 14,
    color: C.textSoft,
  },
});
