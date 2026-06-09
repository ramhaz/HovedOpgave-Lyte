import { View, Text, StyleSheet } from 'react-native';
import { neu, C } from '../config/neu';

type Props = {
  dayNumber: number;
  targetKm: number;
};

export default function RunTodayGoal({ dayNumber, targetKm }: Props) {
  return (
    <View style={[neu.card, styles.card]}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>Dag {dayNumber}</Text>
      </View>
      <Text style={styles.goal}>{targetKm}</Text>
      <Text style={styles.unit}>km i dag</Text>
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
