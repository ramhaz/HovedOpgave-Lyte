import { View, Text, StyleSheet } from 'react-native';

// US 3.6
type Props = {
  dayNumber: number;
  logDate: string;
  loggedMl: number;
  targetMl: number;
};

export default function HistoryDayCard({ dayNumber, logDate, loggedMl, targetMl }: Props) {
  const percent = Math.min(Math.round((loggedMl / targetMl) * 100), 100);
  const isComplete = loggedMl >= targetMl;
  const dateStr = new Date(logDate).toLocaleDateString('da-DK', {
    day: 'numeric',
    month: 'short',
  });

  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <Text style={styles.day}>Dag {dayNumber}</Text>
        <Text style={styles.date}>{dateStr}</Text>
      </View>

      <View style={styles.middle}>
        <View style={styles.trackOuter}>
          <View
            style={[
              styles.trackInner,
              { width: `${percent}%` },
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
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E8E3D4',
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  left: {
    width: 60,
  },
  day: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  date: {
    fontSize: 12,
    color: '#7A7568',
    marginTop: 2,
  },
  middle: {
    flex: 1,
    paddingHorizontal: 12,
  },
  trackOuter: {
    height: 8,
    backgroundColor: '#F5F0E1',
    borderRadius: 4,
    overflow: 'hidden',
  },
  trackInner: {
    height: 8,
    backgroundColor: '#1A1A1A',
    borderRadius: 4,
  },
  trackComplete: {
    backgroundColor: '#2D8A4E',
  },
  right: {
    alignItems: 'flex-end',
    width: 80,
  },
  ml: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  mlComplete: {
    color: '#2D8A4E',
  },
  target: {
    fontSize: 11,
    color: '#A09A8A',
  },
});