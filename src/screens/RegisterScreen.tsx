import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import useRegister from '../hooks/useRegister';
import { useFonts, Montserrat_700Bold_Italic } from '@expo-google-fonts/montserrat';
import { neu, C } from '../config/neu';

type Props = {
  onRegisterSuccess: () => void;
  onGoToLogin: () => void;
};

export default function RegisterScreen({ onRegisterSuccess, onGoToLogin }: Props) {
  const { email, setEmail, password, setPassword, loading, error, handleRegister } =
    useRegister(onRegisterSuccess);
  const [fontsLoaded] = useFonts({ Montserrat_700Bold_Italic });
  if (!fontsLoaded) return null;

  return (
    <ImageBackground
      source={require('../../assets/images/dropletslyte.png')}
      style={styles.bg}
      imageStyle={{ opacity: 0.4 }}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        style={styles.inner}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.logoArea}>
          <Text style={styles.logo}>LYTE+</Text>
          <Text style={styles.tagline}>Start din hydreringsrejse</Text>
        </View>

        <View style={[neu.card, styles.form]}>
          <Text style={styles.title}>Opret konto</Text>
          <Text style={styles.subtitle}>Kom i gang med LYTE</Text>

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
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={C.bg} />
            ) : (
              <Text style={styles.btnText}>Opret konto</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={onGoToLogin} style={styles.linkBtn}>
            <Text style={styles.linkText}>Har du allerede en konto? Log ind</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
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
