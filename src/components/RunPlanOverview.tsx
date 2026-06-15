// RunPlanOverview: 30-dages oversigt for løbeplanen.
// Samme layout som PlanOverview, men for km.

import { View, Text, StyleSheet } from 'react-native';
import { neu, C } from '../config/neu';

type DayLog = {
  dayNumber: number;
  loggedKm: number;
  targetKm: number;
  logDate: string;
};

type Props = {
  logs: DayLog[];
  currentDay: number;
};

export default function RunPlanOverview({ logs, currentDay }: Props) {
  const getStatus = (log: DayLog) => {
    if (log.dayNumber > currentDay) return 'future';
    if (log.loggedKm >= log.targetKm) return 'complete';
    return 'missed';
  };

  return (
    <View style={[neu.card, styles.container]}>
      <View style={styles.topRow}>
        <Text style={styles.header}>Løbeplan oversigt</Text>
        <View style={[neu.inset, styles.dayBadge]}>
          <Text style={styles.dayBadgeText}>Dag {currentDay} / 30</Text>
        </View>
      </View>

      <View style={styles.grid}>
        {logs.map((log) => {
          const status = getStatus(log);
          return (
            <View
              key={log.dayNumber}
              style={[
                styles.dayBox,
                status === 'complete' && styles.dayComplete,
                status === 'missed' && styles.dayMissed,
                status === 'future' && styles.dayFuture,
              ]}
            >
              <Text
                style={[
                  styles.dayText,
                  (status === 'complete' || status === 'missed') && styles.dayTextLight,
                  log.dayNumber === 30 && styles.trophyText,
                ]}
              >
                {log.dayNumber === 30 ? '🏆' : log.dayNumber}
              </Text>
            </View>
          );
        })}
      </View>

      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, styles.dayComplete]} />
          <Text style={styles.legendText}>Fuldført</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, styles.dayMissed]} />
          <Text style={styles.legendText}>Misset</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, styles.dayFuture]} />
          <Text style={styles.legendText}>Kommende</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  header: { fontSize: 18, fontWeight: '700', color: C.text },
  dayBadge: { borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5, padding: 0 },
  dayBadgeText: { fontSize: 12, fontWeight: '600', color: C.textSoft },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  dayBox: { width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  dayComplete: { backgroundColor: C.success },
  dayMissed: { backgroundColor: C.error },
  dayFuture: { backgroundColor: C.inset },
  dayText: { fontSize: 13, fontWeight: '700', color: C.textSoft },
  dayTextLight: { color: '#FFFFFF' },
  trophyText: { fontSize: 18 },
  legend: { flexDirection: 'row', gap: 16, marginTop: 16 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 10, height: 10, borderRadius: 4 },
  legendText: { fontSize: 12, color: C.textSoft },
});
