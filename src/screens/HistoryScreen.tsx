import { View, Text, FlatList, StyleSheet, ActivityIndicator, ImageBackground } from 'react-native';
import { useEffect, useState } from 'react';
import { getHistoryLogs } from '../services/hydrationService';
import HistoryDayCard from '../components/HistoryDayCard';
import useHydrationPlan from '../hooks/useHydrationPlan';
import { neu, C } from '../config/neu';

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
        <ActivityIndicator size="large" color={C.text} />
      </View>
    );
  }

  if (!plan) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>Start en plan først for at se din historik.</Text>
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
    <ImageBackground
      source={require('../../assets/images/standinglyte.png')}
      style={styles.bg}
      imageStyle={{ opacity: 0.25 }}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Historik</Text>
          <View style={[neu.inset, styles.countBadge]}>
            <Text style={styles.countText}>{logs.length} dage</Text>
          </View>
        </View>
        <FlatList
          data={logs}
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <HistoryDayCard
              dayNumber={item.dayNumber}
              logDate={item.logDate}
              loggedMl={item.loggedMl}
              targetMl={item.targetMl}
            />
          )}
          contentContainerStyle={styles.list}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: C.bg,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 64,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: C.text,
  },
  countBadge: {
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    padding: 0,
  },
  countText: {
    fontSize: 13,
    fontWeight: '600',
    color: C.textSoft,
  },
  list: {
    paddingBottom: 40,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: C.bg,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: C.bg,
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 16,
    color: C.textSoft,
    textAlign: 'center',
  },
});
