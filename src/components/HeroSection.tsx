import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../../src/context/AuthContext';
import { useFonts, Montserrat_700Bold_Italic } from '@expo-google-fonts/montserrat';

export default function HeroSection() {
  const { logout } = useAuth();
  
  const [fontsLoaded] = useFonts({
    Montserrat_700Bold_Italic,
  });

  if (!fontsLoaded) return null;

  return (
    <View style={styles.hero}>
      <TouchableOpacity onPress={logout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Log ud</Text>
      </TouchableOpacity>

      <Text style={styles.heroTitle}>LYTE+</Text>
      <Text style={styles.heroSubtitle}>
        Hydrer du rigtigt, eller bare nok?
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: '#1A1A1A',
    paddingTop: 70,
    paddingBottom: 40,
    paddingHorizontal: 24,
  },
  heroTitle: {
    fontSize: 44,
    fontFamily: 'Montserrat_700Bold_Italic',
    color: '#F5F0E1',
    letterSpacing: 6,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#A09A8A',
    marginTop: 8,
  },
  logoutButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
    backgroundColor: '#333333',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  logoutText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#C44040',
  },
});