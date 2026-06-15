// SleepHistoryScreen: viser søvnhistorik som en liste af natkort.
// Samme mønster som HistoryScreen, men for søvn (timer i stedet for ml).

import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { getSleepHistoryLogs } from '../services/sleepService';
import SleepHistoryDayCard from '../components/SleepHistoryDayCard';
import useSleepPlan from '../hooks/useSleepPlan';
import { neu, C } from '../config/neu';

export default function SleepHistoryScreen() {
  const { plan, loading: planLoading } = useSleepPlan();
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!plan) return;
      setLoading(true);
      const data = await getSleepHistoryLogs(plan.id);
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
        <Text style={styles.emptyText}>Start en søvnplan først for at se din historik.</Text>
      </View>
    );
  }

  if (logs.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>Ingen søvnhistorik endnu.</Text>
      </View>
    );
  }

  return (
    <View style={styles.bg}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Søvnhistorik</Text>
          <View style={[neu.inset, styles.countBadge]}>
            <Text style={styles.countText}>{logs.length} nætter</Text>
          </View>
        </View>
        <FlatList
          data={logs}
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <SleepHistoryDayCard
              dayNumber={item.dayNumber}
              logDate={item.logDate}
              loggedHours={item.loggedHours}
              targetHours={item.targetHours}
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
