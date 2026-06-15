// US 3.1 – RoadmapTeaser: kort på forsiden der viser hydreringsplanens status.
// Hvis ingen plan er aktiv: viser "Start i dag"-knap.
// Hvis plan er aktiv: viser "Plan aktiv" (knap er deaktiveret).

import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import useHydrationPlan from '../hooks/useHydrationPlan';
import { neu, C } from '../config/neu';

export default function RoadmapTeaser() {
  const { plan, starting, handleStartPlan } = useHydrationPlan(); // hent plan-status

  return (
    <View style={[neu.card, styles.card]}>
      <View style={styles.topRow}>
        <View style={[neu.inset, styles.badge]}>
          <Text style={styles.badgeText}>30 dage</Text>
        </View>
        <Text style={styles.status}>{plan ? '✓ Aktiv' : 'Ikke startet'}</Text>
      </View>

      <Text style={styles.title}>Hydreringsplan</Text>
      <Text style={styles.desc}>
        Opbyg en sund vane dag for dag. Hvert mål er tilpasset til at hjælpe dig drikke mere.
      </Text>

      <TouchableOpacity
        style={[neu.darkBtn, (plan || starting) && styles.btnDisabled]}
        onPress={handleStartPlan}
        disabled={!!plan || starting}
      >
        {starting ? (
          <ActivityIndicator color={C.bg} />
        ) : (
          <Text style={styles.btnText}>{plan ? 'Plan aktiv' : 'Start i dag'}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginTop: 8,
    marginBottom: 4,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  badge: {
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    padding: 0,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '600',
    color: C.textSoft,
  },
  status: {
    fontSize: 13,
    color: C.textMuted,
    fontWeight: '500',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: C.text,
    marginBottom: 8,
  },
  desc: {
    fontSize: 14,
    color: C.textSoft,
    lineHeight: 21,
    marginBottom: 20,
  },
  btnDisabled: {
    opacity: 0.5,
  },
  btnText: {
    fontSize: 16,
    fontWeight: '700',
    color: C.bg,
  },
});
