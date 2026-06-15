// US 3.6 – HistoryDayCard: viser én dag i hydreringshistorikken.
// Viser dagnummer, dato, progress bar og ml logget vs. mål.
// Grøn farve når målet er nået.

import { View, Text, StyleSheet } from 'react-native';
import { neu, C } from '../config/neu';

type Props = {
  dayNumber: number;
  logDate: string;
  loggedMl: number;
  targetMl: number;
};

export default function HistoryDayCard({ dayNumber, logDate, loggedMl, targetMl }: Props) {
  const percent = Math.min(Math.round((loggedMl / targetMl) * 100), 100); // procent af mål
  const isComplete = loggedMl >= targetMl; // er målet nået?
  const dateStr = new Date(logDate).toLocaleDateString('da-DK', { // formater dato på dansk
    day: 'numeric',
    month: 'short',
  });

  return (
    <View style={[neu.cardSm, styles.card]}>
      <View style={styles.left}>
        <Text style={styles.day}>Dag {dayNumber}</Text>
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
        <Text style={[styles.ml, isComplete && styles.mlComplete]}>
          {loggedMl} ml
        </Text>
        <Text style={styles.target}>/ {targetMl}</Text>
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
  ml: {
    fontSize: 13,
    fontWeight: '700',
    color: C.text,
  },
  mlComplete: {
    color: C.success,
  },
  target: {
    fontSize: 11,
    color: C.textMuted,
  },
});
