// US 3.4 – DailyProgressBar: viser en progress bar for dagens vandindtag.
// Beregner procent og viser grøn farve når målet er nået.

import { View, Text, StyleSheet } from 'react-native';
import { neu, C } from '../config/neu';

type Props = {
  loggedMl: number;  // hvor meget brugeren har drukket
  targetMl: number;  // dagens mål
};

export default function DailyProgressBar({ loggedMl, targetMl }: Props) {
  const percent = Math.min(Math.round((loggedMl / targetMl) * 100), 100); // beregn procent (max 100)
  const isComplete = loggedMl >= targetMl; // er målet nået?

  return (
    <View style={[neu.card, styles.card]}>
      <View style={styles.header}>
        <Text style={styles.label}>Fremgang</Text>
        <Text style={[styles.percent, isComplete && styles.percentComplete]}>
          {percent}%
        </Text>
      </View>

      <View style={[neu.inset, styles.trackOuter]}>
        <View
          style={[
            styles.trackInner,
            { width: `${percent}%` as any },
            isComplete && styles.trackComplete,
          ]}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.ml}>{loggedMl} ml</Text>
        <Text style={styles.mlTarget}>/ {targetMl} ml</Text>
      </View>

      {isComplete && (
        <Text style={styles.completeText}>Mål nået! Godt gået! 🎉</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: C.textSoft,
  },
  percent: {
    fontSize: 22,
    fontWeight: '800',
    color: C.text,
  },
  percentComplete: {
    color: C.success,
  },
  trackOuter: {
    height: 14,
    borderRadius: 7,
    overflow: 'hidden',
    padding: 0,
  },
  trackInner: {
    height: 14,
    backgroundColor: C.text,
    borderRadius: 7,
  },
  trackComplete: {
    backgroundColor: C.success,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 10,
    gap: 4,
  },
  ml: {
    fontSize: 16,
    fontWeight: '700',
    color: C.text,
  },
  mlTarget: {
    fontSize: 13,
    color: C.textMuted,
  },
  completeText: {
    fontSize: 15,
    fontWeight: '700',
    color: C.success,
    textAlign: 'center',
    marginTop: 12,
  },
});
