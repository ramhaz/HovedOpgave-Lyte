// SleepHistoryDayCard: viser én nat i søvnhistorikken.
// Samme layout som HistoryDayCard, men for timer.

import { View, Text, StyleSheet } from 'react-native';
import { neu, C } from '../config/neu';

type Props = {
  dayNumber: number;
  logDate: string;
  loggedHours: number;
  targetHours: number;
};

export default function SleepHistoryDayCard({ dayNumber, logDate, loggedHours, targetHours }: Props) {
  const percent = Math.min(Math.round((loggedHours / targetHours) * 100), 100);
  const isComplete = loggedHours >= targetHours;
  const dateStr = new Date(logDate).toLocaleDateString('da-DK', {
    day: 'numeric',
    month: 'short',
  });

  return (
    <View style={[neu.cardSm, styles.card]}>
      <View style={styles.left}>
        <Text style={styles.day}>Nat {dayNumber}</Text>
        <Text style={styles.date}>{dateStr}</Text>
      </View>

      <View style={styles.middle}>
        <View style={[neu.inset, styles.trackOuter]}>
          <View
            style={[
              styles.trackInner,
              { width: `${percent}%` as any },
              isComplete && styles.trackComplete,
            ]}
          />
        </View>
      </View>

      <View style={styles.right}>
        <Text style={[styles.value, isComplete && styles.valueComplete]}>
          {loggedHours} t
        </Text>
        <Text style={styles.target}>/ {targetHours} t</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  left: {
    width: 60,
  },
  day: {
    fontSize: 14,
    fontWeight: '700',
    color: C.text,
  },
  date: {
    fontSize: 11,
    color: C.textMuted,
    marginTop: 2,
  },
  middle: {
    flex: 1,
    paddingHorizontal: 12,
  },
  trackOuter: {
    height: 10,
    borderRadius: 5,
    overflow: 'hidden',
    padding: 0,
  },
  trackInner: {
    height: 10,
    backgroundColor: C.text,
    borderRadius: 5,
  },
  trackComplete: {
    backgroundColor: C.success,
  },
  right: {
    alignItems: 'flex-end',
    width: 80,
  },
  value: {
    fontSize: 13,
    fontWeight: '700',
    color: C.text,
  },
  valueComplete: {
    color: C.success,
  },
  target: {
    fontSize: 11,
    color: C.textMuted,
  },
});
