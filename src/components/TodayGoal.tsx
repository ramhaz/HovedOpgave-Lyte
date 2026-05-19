import { View, Text, StyleSheet } from 'react-native';
import { neu, C } from '../config/neu';

// US 3.2
type Props = {
  dayNumber: number;
  targetMl: number;
};

export default function TodayGoal({ dayNumber, targetMl }: Props) {
  const liters = (targetMl / 1000).toFixed(1);

  return (
    <View style={[neu.card, styles.card]}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>Dag {dayNumber}</Text>
      </View>
      <Text style={styles.goal}>{liters}</Text>
      <Text style={styles.unit}>liter i dag</Text>
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
