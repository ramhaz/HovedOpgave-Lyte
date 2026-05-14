import { View, Text, StyleSheet } from 'react-native';

// US 3.4
type Props = {
  loggedMl: number;
  targetMl: number;
};

export default function DailyProgressBar({ loggedMl, targetMl }: Props) {
  const percent = Math.min(Math.round((loggedMl / targetMl) * 100), 100);
  const isComplete = loggedMl >= targetMl;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.mlText}>
          {loggedMl} / {targetMl} ml
        </Text>
        <Text style={[styles.percent, isComplete && styles.percentComplete]}>
          {percent}%
        </Text>
      </View>

      <View style={styles.trackOuter}>
        <View
          style={[
            styles.trackInner,
            { width: `${percent}%` },
            isComplete && styles.trackComplete,
          ]}
        />
      </View>

      {isComplete && (
        <Text style={styles.completeText}>Mål nået! Godt gået!</Text>
      )}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  mlText: {
    fontSize: 14,
    color: '#7A7568',
    fontWeight: '500',
  },
  percent: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  percentComplete: {
    color: '#2D8A4E',
  },
  trackOuter: {
    height: 12,
    backgroundColor: '#F5F0E1',
    borderRadius: 6,
    overflow: 'hidden',
  },
  trackInner: {
    height: 12,
    backgroundColor: '#1A1A1A',
    borderRadius: 6,
  },
  trackComplete: {
    backgroundColor: '#2D8A4E',
  },
  completeText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2D8A4E',
    textAlign: 'center',
    marginTop: 12,
  },
});