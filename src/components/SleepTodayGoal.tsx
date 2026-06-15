// SleepTodayGoal: viser nattens søvnmål (fx "7 timer i nat").
// Samme layout som TodayGoal, men for timer.

import { View, Text, StyleSheet } from 'react-native';
import { neu, C } from '../config/neu';

type Props = {
  dayNumber: number;
  targetHours: number;
};

export default function SleepTodayGoal({ dayNumber, targetHours }: Props) {
  return (
    <View style={[neu.card, styles.card]}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>Nat {dayNumber}</Text>
      </View>
      <Text style={styles.goal}>{targetHours}</Text>
      <Text style={styles.unit}>timer i nat</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    alignItems: 'center',
  },
  badge: {
    backgroundColor: C.inset,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginBottom: 12,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '600',
    color: C.textSoft,
  },
  goal: {
    fontSize: 56,
    fontWeight: '800',
    color: C.text,
    lineHeight: 64,
  },
  unit: {
    fontSize: 16,
    color: C.textMuted,
    marginTop: 4,
  },
});
