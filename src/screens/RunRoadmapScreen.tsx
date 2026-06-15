// RunRoadmapScreen: standalone roadmap-skærm for løbeplanen.
// Viser dagens mål, progress, log-input og 30-dages oversigt.

import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import useRunningPlan from '../hooks/useRunningPlan';
import useRunPlanDetail from '../hooks/useRunPlanDetail';
import RunTodayGoal from '../components/RunTodayGoal';
import RunProgressBar from '../components/RunProgressBar';
import RunLogInput from '../components/RunLogInput';
import RunPlanOverview from '../components/RunPlanOverview';
import { useFonts, Montserrat_700Bold_Italic } from '@expo-google-fonts/montserrat';
import { neu, C } from '../config/neu';

export default function RunRoadmapScreen() {
  const { plan, loading, starting, error, handleStartPlan, handleRestartPlan } = useRunningPlan();
  const { todayLog, allLogs, loading: detailLoading, refetch } = useRunPlanDetail(plan?.id ?? null);
  const [fontsLoaded] = useFonts({ Montserrat_700Bold_Italic });

  if (loading || !fontsLoaded) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={C.text} />
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.logo, { letterSpacing: 1 }]}>LYTE+</Text>
          <Text style={styles.title}>30-dages løbeplan</Text>
        </View>

        {!plan ? (
          <View style={[neu.card, styles.startCard]}>
            <View style={[neu.inset, styles.startBadge]}>
              <Text style={styles.startBadgeText}>30 dage</Text>
            </View>
            <Text style={styles.startTitle}>Klar til at løbe?</Text>
            <Text style={styles.startDesc}>
              Følg vores 30-dages løbeplan og opbyg en sund løbevane.
              Start med 1 km og arbejd dig op til 2 km om dagen.
            </Text>

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <TouchableOpacity
              style={[neu.darkBtn, starting && styles.btnDisabled]}
              onPress={handleStartPlan}
              disabled={starting}
            >
              {starting ? (
                <ActivityIndicator color={C.bg} />
              ) : (
                <Text style={styles.btnText}>Start 30-dages løbeplan</Text>
              )}
            </TouchableOpacity>
          </View>
        ) : detailLoading ? (
          <ActivityIndicator size="large" color={C.text} style={{ marginTop: 40 }} />
        ) : (
          <>
            {todayLog && (
              <>
                <RunTodayGoal dayNumber={todayLog.dayNumber} targetKm={todayLog.targetKm} />
                <RunProgressBar loggedKm={todayLog.loggedKm} targetKm={todayLog.targetKm} />
                <RunLogInput planId={plan.id} dayNumber={todayLog.dayNumber} onLogged={refetch} />
              </>
            )}

            {allLogs.length > 0 && (
              <RunPlanOverview logs={allLogs} currentDay={todayLog?.dayNumber ?? 1} />
            )}

            <TouchableOpacity
              style={[neu.card, styles.restartBtn]}
              onPress={handleRestartPlan}
            >
              <Text style={styles.restartText}>Start forfra</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: C.bg },
  container: { flex: 1 },
  content: { paddingHorizontal: 20, paddingTop: 64, paddingBottom: 40 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: C.bg },
  header: { marginBottom: 24 },
  logo: { fontSize: 28, fontFamily: 'Montserrat_700Bold_Italic', color: C.text, letterSpacing: 4 },
  title: { fontSize: 26, fontWeight: '800', color: C.text, marginTop: 4 },
  startCard: { gap: 0 },
  startBadge: { alignSelf: 'flex-start', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 6, padding: 0, marginBottom: 14 },
  startBadgeText: { fontSize: 13, fontWeight: '600', color: C.textSoft },
  startTitle: { fontSize: 22, fontWeight: '800', color: C.text, marginBottom: 8 },
  startDesc: { fontSize: 14, color: C.textSoft, lineHeight: 21, marginBottom: 20 },
  error: { fontSize: 14, color: C.error, backgroundColor: '#F5E6E6', padding: 12, borderRadius: 12, marginBottom: 12 },
  btnDisabled: { opacity: 0.6 },
  btnText: { fontSize: 16, fontWeight: '700', color: C.bg },
  restartBtn: { alignItems: 'center', marginTop: 4, paddingVertical: 16 },
  restartText: { fontSize: 14, fontWeight: '600', color: C.error },
});
