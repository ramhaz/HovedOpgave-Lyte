import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import useHydrationPlan from '../hooks/useHydrationPlan';

// US 3.1
export default function RoadmapTeaser() {
  const { plan, starting, handleStartPlan } = useHydrationPlan();

  return (
    <View style={styles.teaser}>
      <Text style={styles.title}>30-dages hydreringsplan</Text>
      <Text style={styles.desc}>
        Følg vores 30-dages plan og opbyg en sund hydreringsvane. Hver dag
        får du et nyt mål og viden om hvorfor hydrering er vigtigere end du
        tror.
      </Text>
      <Text style={styles.days}>30 dage</Text>
      <TouchableOpacity
        style={[styles.button, (plan || starting) && styles.buttonDisabled]}
        onPress={handleStartPlan}
        disabled={!!plan || starting}
      >
        {starting ? (
          <ActivityIndicator color="#1A1A1A" />
        ) : (
          <Text style={styles.buttonText}>
            {plan ? 'Plan aktiv' : 'Start i dag'}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  teaser: {
    backgroundColor: '#1A1A1A',
    margin: 20,
    borderRadius: 16,
    padding: 24,
    marginTop: 28,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#F5F0E1',
  },
  desc: {
    fontSize: 14,
    color: '#A09A8A',
    marginTop: 10,
    lineHeight: 21,
  },
  days: {
    fontSize: 28,
    fontWeight: '800',
    color: '#F5F0E1',
    marginTop: 16,
  },
  button: {
    backgroundColor: '#F5F0E1',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },
});