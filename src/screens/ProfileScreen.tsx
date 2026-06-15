// ProfileScreen: viser brugerens profiloplysninger og log-ud knap.
// Henter brugerdata fra AuthContext (email, oprettelsesdato).

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useFonts, Montserrat_700Bold_Italic } from '@expo-google-fonts/montserrat';
import { neu, C } from '../config/neu';

type Props = {
  onBack?: () => void; // valgfri back-knap (bruges når profil åbnes fra forsiden)
};

export default function ProfileScreen({ onBack }: Props) {
  const { session, logout } = useAuth(); // hent session og logout-funktion
  const user = session?.user;
  const [fontsLoaded] = useFonts({ Montserrat_700Bold_Italic });
  if (!fontsLoaded) return null;

  return (
    <View style={styles.bg}>
      <View style={styles.container}>
        <View style={styles.header}>
          {onBack && (
            <TouchableOpacity onPress={onBack} style={styles.backBtn}>
              <Ionicons name="arrow-back" size={24} color={C.text} />
            </TouchableOpacity>
          )}
          <Text style={[styles.logo, { letterSpacing: 1 }]}>LYTE+</Text>
          <Text style={styles.title}>Min profil</Text>
        </View>

        <View style={[neu.card, styles.avatarCard]}>
          <View style={[neu.inset, styles.avatarCircle]}>
            <Text style={styles.avatarEmoji}>👤</Text>
          </View>
          <Text style={styles.emailDisplay}>{user?.email}</Text>
        </View>

        <View style={[neu.card, styles.infoCard]}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{user?.email}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Oprettet</Text>
            <Text style={styles.infoValue}>
              {user?.created_at
                ? new Date(user.created_at).toLocaleDateString('da-DK')
                : 'Ukendt'}
            </Text>
          </View>
        </View>

        <TouchableOpacity onPress={logout} style={[neu.darkBtn, styles.logoutBtn]}>
          <Text style={styles.logoutText}>Log ud</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: C.bg,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 64,
  },
  header: {
    marginBottom: 24,
  },
  backBtn: {
    marginBottom: 12,
  },
  logo: {
    fontSize: 28,
    fontFamily: 'Montserrat_700Bold_Italic',
    color: C.text,
    letterSpacing: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: C.text,
    marginTop: 4,
  },
  avatarCard: {
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 28,
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    marginBottom: 14,
  },
  avatarEmoji: {
    fontSize: 36,
  },
  emailDisplay: {
    fontSize: 15,
    color: C.textSoft,
    fontWeight: '500',
  },
  infoCard: {
    marginBottom: 16,
    padding: 0,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
  },
  divider: {
    height: 1,
    backgroundColor: C.inset,
    marginHorizontal: 18,
  },
  infoLabel: {
    fontSize: 14,
    color: C.textSoft,
    fontWeight: '600',
  },
  infoValue: {
    fontSize: 14,
    color: C.text,
    fontWeight: '500',
    maxWidth: '60%',
    textAlign: 'right',
  },
  logoutBtn: {
    marginTop: 4,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '700',
    color: C.error,
  },
});
