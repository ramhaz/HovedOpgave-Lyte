import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../../src/context/AuthContext';
import { useFonts, Montserrat_700Bold_Italic } from '@expo-google-fonts/montserrat';
import { C } from '../config/neu';

export default function HeroSection() {
  const { logout } = useAuth();
  const [fontsLoaded] = useFonts({ Montserrat_700Bold_Italic });
  if (!fontsLoaded) return null;

  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.greeting}>Hej igeeeen </Text>
        <Text style={[styles.logo, { letterSpacing: 1 }]}>LYTE+</Text>
      </View>
      <TouchableOpacity onPress={logout} style={styles.avatar}>
        <Text style={styles.avatarText}>↩</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 64,
    paddingBottom: 24,
    paddingHorizontal: 24,
    backgroundColor: C.bg,
  },
  greeting: {
    fontSize: 14,
    color: C.textMuted,
    fontWeight: '500',
  },
  logo: {
    fontSize: 34,
    fontFamily: 'Montserrat_700Bold_Italic',
    color: C.text,
    letterSpacing: 4,
    marginTop: 2,
    
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: C.bg,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: C.shadow,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 5,
  },
  avatarText: {
    fontSize: 20,
    color: C.text,
  },
});
