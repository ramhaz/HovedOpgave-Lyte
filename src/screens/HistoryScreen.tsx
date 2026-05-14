import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { getHistoryLogs } from '../services/hydrationService';
import HistoryDayCard from '../components/HistoryDayCard';
import useHydrationPlan from '../hooks/useHydrationPlan';

// US 3.6
export default function HistoryScreen() {
  const { plan, loading: planLoading } = useHydrationPlan();
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!plan) return;
      setLoading(true);
      const data = await getHistoryLogs(plan.id);
      setLogs(data);
      setLoading(false);
    };
    fetchHistory();
  }, [plan]);

  if (planLoading || loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#1A1A1A" />
      </View>
    );
  }

  if (!plan) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>
          Start en plan først for at se din historik.
        </Text>
      </View>
    );
  }

  if (logs.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>Ingen historik endnu.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hydreringshistorik</Text>
      <FlatList
        data={logs}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <HistoryDayCard
            dayNumber={item.dayNumber}
            logDate={item.logDate}
            loggedMl={item.loggedMl}
            targetMl={item.targetMl}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F0E1',
    paddingHorizontal: 20,
    paddingTop: 80,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F0E1',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 20,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F0E1',
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#7A7568',
    textAlign: 'center',
  },
});