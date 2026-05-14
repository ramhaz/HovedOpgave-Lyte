import { View, Text, StyleSheet } from 'react-native';

// US 3.2
type Props = {
  dayNumber: number;
  targetMl: number;
};

export default function TodayGoal({ dayNumber, targetMl }: Props) {
  const liters = (targetMl / 1000).toFixed(1);

  return (
    <View style={styles.card}>
      <Text style={styles.day}>Dag {dayNumber}</Text>
      <Text style={styles.goal}>Drik {liters} liter i dag</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E8E3D4',
    marginBottom: 16,
  },
  day: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7A7568',
  },
  goal: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1A1A1A',
    marginTop: 4,
  },
});