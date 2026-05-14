import { View, Text, StyleSheet } from 'react-native';

// US 3.5
type DayLog = {
  dayNumber: number;
  loggedMl: number;
  targetMl: number;
  logDate: string;
};

type Props = {
  logs: DayLog[];
  currentDay: number;
};

export default function PlanOverview({ logs, currentDay }: Props) {
  const getStatus = (log: DayLog) => {
    if (log.dayNumber > currentDay) return 'future';
    if (log.loggedMl >= log.targetMl) return 'complete';
    return 'missed';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dag {currentDay} af 30</Text>
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
                  status === 'complete' && styles.dayTextComplete,
                  status === 'missed' && styles.dayTextMissed,
                ]}
              >
                {log.dayNumber}
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
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E8E3D4',
    marginBottom: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  dayBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayComplete: {
    backgroundColor: '#2D8A4E',
  },
  dayMissed: {
    backgroundColor: '#C44040',
  },
  dayFuture: {
    backgroundColor: '#E8E3D4',
  },
  dayText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#7A7568',
  },
  dayTextComplete: {
    color: '#FFFFFF',
  },
  dayTextMissed: {
    color: '#FFFFFF',
  },
  legend: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 12,
    color: '#7A7568',
  },
});