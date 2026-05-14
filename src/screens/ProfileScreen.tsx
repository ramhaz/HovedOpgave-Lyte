import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useFonts, Montserrat_700Bold_Italic } from '@expo-google-fonts/montserrat';

export default function ProfileScreen() {
  const { session, logout } = useAuth();
  const user = session?.user;
  const [fontsLoaded] = useFonts({
    Montserrat_700Bold_Italic,
  });

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>LYTE+</Text>
      <Text style={styles.title}>Min profil</Text>

      <View style={styles.infoCard}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{user?.email}</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.label}>Oprettet</Text>
        <Text style={styles.value}>
          {user?.created_at
            ? new Date(user.created_at).toLocaleDateString('da-DK')
            : 'Ukendt'}
        </Text>
      </View>

      <TouchableOpacity onPress={logout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Log ud</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F0E1',
    paddingHorizontal: 24,
    paddingTop: 80,
  },
  logo: {
    fontSize: 36,
    fontFamily: 'Montserrat_700Bold_Italic',
    color: '#1A1A1A',
    letterSpacing: 6,
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 32,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E8E3D4',
  },
  label: {
    fontSize: 13,
    color: '#7A7568',
    fontWeight: '600',
  },
  value: {
    fontSize: 17,
    color: '#1A1A1A',
    marginTop: 4,
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: '#1A1A1A',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 32,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#C44040',
  },
});