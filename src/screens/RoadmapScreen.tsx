import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import useHydrationPlan from '../hooks/useHydrationPlan';
import usePlanDetail from '../hooks/usePlanDetail';
import TodayGoal from '../components/TodayGoal';
import DailyProgressBar from '../components/DailyProgressBar';
import WaterLogInput from '../components/WaterLogInput';
import PlanOverview from '../components/PlanOverview';

// US 3.1
export default function RoadmapScreen() {
  const { plan, loading, starting, error, handleStartPlan, handleRestartPlan } = useHydrationPlan();
  const { todayLog, allLogs, loading: detailLoading, refetch } = usePlanDetail(plan?.id ?? null);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#1A1A1A" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.logo}>LYTE+</Text>
      <Text style={styles.title}>30-dages hydreringsplan</Text>

      {!plan ? (
        <View style={styles.startCard}>
          <Text style={styles.startTitle}>Klar til at starte?</Text>
          <Text style={styles.startDesc}>
            Følg vores 30-dages plan og opbyg en sund hydreringsvane.
            Hver dag får du et nyt mål og kan tracke dit vandindtag.
          </Text>

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <TouchableOpacity
            style={[styles.startButton, starting && styles.buttonDisabled]}
            onPress={handleStartPlan}
            disabled={starting}
          >
            {starting ? (
              <ActivityIndicator color="#1A1A1A" />
            ) : (
              <Text style={styles.startButtonText}>Start 30-dages plan</Text>
            )}
          </TouchableOpacity>
        </View>
      ) : detailLoading ? (
        <ActivityIndicator size="large" color="#1A1A1A" style={{ marginTop: 40 }} />
      ) : (
        <>
          {todayLog && (
            <>
              <TodayGoal dayNumber={todayLog.dayNumber} targetMl={todayLog.targetMl} />
              <DailyProgressBar loggedMl={todayLog.loggedMl} targetMl={todayLog.targetMl} />
              <WaterLogInput planId={plan.id} dayNumber={todayLog.dayNumber} onLogged={refetch} />
            </>
          )}

          {allLogs.length > 0 && (
            <PlanOverview logs={allLogs} currentDay={todayLog?.dayNumber ?? 1} />
          )}

          <TouchableOpacity style={styles.restartButton} onPress={handleRestartPlan}>
            <Text style={styles.restartText}>Start forfra</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F0E1',
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 40,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F0E1',
  },
  logo: {
    fontSize: 36,
    fontFamily: 'BebasNeue_400Regular',
    color: '#1A1A1A',
    letterSpacing: 6,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 28,
  },
  startCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#E8E3D4',
  },
  startTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  startDesc: {
    fontSize: 14,
    color: '#7A7568',
    marginTop: 8,
    lineHeight: 21,
  },
  error: {
    fontSize: 14,
    color: '#C44040',
    backgroundColor: '#F5E6E6',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  startButton: {
    backgroundColor: '#F5F0E1',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#1A1A1A',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  restartButton: {
  borderWidth: 1,
  borderColor: '#C44040',
  borderRadius: 10,
  paddingVertical: 12,
  alignItems: 'center',
  marginTop: 20,
},
restartText: {
  fontSize: 14,
  fontWeight: '600',
  color: '#C44040',
},
});