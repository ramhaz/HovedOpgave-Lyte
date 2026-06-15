// RunHistoryScreen: viser løbehistorik som en liste af dagskort.
// Samme mønster som HistoryScreen, men for løb (km i stedet for ml).

import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { getRunHistoryLogs } from '../services/runningService';
import RunHistoryDayCard from '../components/RunHistoryDayCard';
import useRunningPlan from '../hooks/useRunningPlan';
import { neu, C } from '../config/neu';

export default function RunHistoryScreen() {
  const { plan, loading: planLoading } = useRunningPlan();
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!plan) return;
      setLoading(true);
      const data = await getRunHistoryLogs(plan.id);
      setLogs(data);
      setLoading(false);
    };
    fetchHistory();
  }, [plan]);

  if (planLoading || loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={C.text} />
      </View>
    );
  }

  if (!plan) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>Start en løbeplan først for at se din historik.</Text>
      </View>
    );
  }

  if (logs.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>Ingen løbehistorik endnu.</Text>
      </View>
    );
  }

  return (
    <View style={styles.bg}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Løbehistorik</Text>
          <View style={[neu.inset, styles.countBadge]}>
            <Text style={styles.countText}>{logs.length} dage</Text>
          </View>
        </View>
        <FlatList
          data={logs}
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <RunHistoryDayCard
              dayNumber={item.dayNumber}
              logDate={item.logDate}
              loggedKm={item.loggedKm}
              targetKm={item.targetKm}
            />
          )}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, backgroundColor: C.bg },
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 64 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 26, fontWeight: '800', color: C.text },
  countBadge: { borderRadius: 20, paddingHorizontal: 14, paddingVertical: 6, padding: 0 },
  countText: { fontSize: 13, fontWeight: '600', color: C.textSoft },
  list: { paddingBottom: 40 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: C.bg },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: C.bg, paddingHorizontal: 40 },
  emptyText: { fontSize: 16, color: C.textSoft, textAlign: 'center' },
});
