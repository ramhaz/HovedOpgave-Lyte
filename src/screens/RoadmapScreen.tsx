// RoadmapScreen: hovedskærm for 30-dages planer (vand, søvn, løb).
// Bruger tabs til at skifte mellem de tre planer.
// Hver plan-tab viser: dagens mål, progress bar, log-input og 30-dages oversigt.
// Hvis ingen plan er aktiv, vises en "start plan"-knap.

import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { useState } from 'react';
import useHydrationPlan from '../hooks/useHydrationPlan';
import usePlanDetail from '../hooks/usePlanDetail';
import useSleepPlan from '../hooks/useSleepPlan';
import useSleepPlanDetail from '../hooks/useSleepPlanDetail';
import useRunningPlan from '../hooks/useRunningPlan';
import useRunPlanDetail from '../hooks/useRunPlanDetail';
import TodayGoal from '../components/TodayGoal';
import DailyProgressBar from '../components/DailyProgressBar';
import WaterLogInput from '../components/WaterLogInput';
import PlanOverview from '../components/PlanOverview';
import SleepTodayGoal from '../components/SleepTodayGoal';
import SleepProgressBar from '../components/SleepProgressBar';
import SleepLogInput from '../components/SleepLogInput';
import SleepPlanOverview from '../components/SleepPlanOverview';
import RunTodayGoal from '../components/RunTodayGoal';
import RunProgressBar from '../components/RunProgressBar';
import RunLogInput from '../components/RunLogInput';
import RunPlanOverview from '../components/RunPlanOverview';
import { useFonts, Montserrat_700Bold_Italic } from '@expo-google-fonts/montserrat';
import { neu, C } from '../config/neu';

// Union type for de tre plan-tabs
type PlanTab = 'hydration' | 'sleep' | 'run';

const tabColors: Record<PlanTab, string> = {
  hydration: 'rgba(100, 170, 220, 0.12)',
  sleep: 'rgba(60, 70, 130, 0.10)',
  run: 'rgba(210, 140, 60, 0.12)',
};

const tabs: { key: PlanTab; label: string; icon: string }[] = [
  { key: 'hydration', label: 'Vand', icon: '💧' },
  { key: 'sleep', label: 'Søvn', icon: '🌙' },
  { key: 'run', label: 'Løb', icon: '🏃' },
];

export default function RoadmapScreen() {
  const [activeTab, setActiveTab] = useState<PlanTab>('hydration'); // aktiv tab
  const [fontsLoaded] = useFonts({ Montserrat_700Bold_Italic });

  const hydration = useHydrationPlan();
  const hydrationDetail = usePlanDetail(hydration.plan?.id ?? null);

  const sleep = useSleepPlan();
  const sleepDetail = useSleepPlanDetail(sleep.plan?.id ?? null);

  const run = useRunningPlan();
  const runDetail = useRunPlanDetail(run.plan?.id ?? null);

  if (!fontsLoaded || hydration.loading || sleep.loading || run.loading) {
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
          <Text style={styles.title}>30-dages planer</Text>
        </View>

        <View style={styles.tabRow}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[
                neu.inset,
                styles.tabBtn,
                activeTab === tab.key && styles.tabBtnActive,
              ]}
              onPress={() => setActiveTab(tab.key)}
            >
              <Text style={styles.tabIcon}>{tab.icon}</Text>
              <Text
                style={[
                  styles.tabLabel,
                  activeTab === tab.key && styles.tabLabelActive,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={[styles.tabContent, { backgroundColor: tabColors[activeTab] }]}>
          {activeTab === 'hydration' && (
            <HydrationContent
              plan={hydration}
              detail={hydrationDetail}
            />
          )}

          {activeTab === 'sleep' && (
            <SleepContent
              plan={sleep}
              detail={sleepDetail}
            />
          )}

          {activeTab === 'run' && (
            <RunContent
              plan={run}
              detail={runDetail}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
}

// HydrationContent: indhold for vand-tab — viser mål, progress og log-input
function HydrationContent({
  plan,
  detail,
}: {
  plan: ReturnType<typeof useHydrationPlan>;
  detail: ReturnType<typeof usePlanDetail>;
}) {
  const { plan: activePlan, starting, error, handleStartPlan, handleRestartPlan } = plan;
  const { todayLog, allLogs, loading: detailLoading, refetch } = detail;

  if (!activePlan) {
    return (
      <StartCard
        badge="30 dage"
        title="Klar til at starte?"
        description="Følg vores 30-dages plan og opbyg en sund hydreringsvane. Hver dag får du et nyt mål og kan tracke dit vandindtag."
        buttonText="Start 30-dages plan"
        starting={starting}
        error={error}
        onStart={handleStartPlan}
      />
    );
  }

  if (detailLoading) {
    return <ActivityIndicator size="large" color={C.text} style={{ marginTop: 40 }} />;
  }

  return (
    <>
      {todayLog && (
        <>
          <TodayGoal dayNumber={todayLog.dayNumber} targetMl={todayLog.targetMl} />
          <DailyProgressBar loggedMl={todayLog.loggedMl} targetMl={todayLog.targetMl} />
          <WaterLogInput planId={activePlan.id} dayNumber={todayLog.dayNumber} onLogged={refetch} />
        </>
      )}
      {allLogs.length > 0 && (
        <PlanOverview logs={allLogs} currentDay={todayLog?.dayNumber ?? 1} />
      )}
      <RestartButton onRestart={handleRestartPlan} />
    </>
  );
}

// SleepContent: indhold for søvn-tab
function SleepContent({
  plan,
  detail,
}: {
  plan: ReturnType<typeof useSleepPlan>;
  detail: ReturnType<typeof useSleepPlanDetail>;
}) {
  const { plan: activePlan, starting, error, handleStartPlan, handleRestartPlan } = plan;
  const { todayLog, allLogs, loading: detailLoading, refetch } = detail;

  if (!activePlan) {
    return (
      <StartCard
        badge="30 nætter"
        title="Klar til bedre søvn?"
        description="Følg vores 30-dages søvnplan og opbyg en sund søvnrytme. Start med 6 timer og arbejd dig op til 7 timer pr. nat."
        buttonText="Start 30-dages søvnplan"
        starting={starting}
        error={error}
        onStart={handleStartPlan}
      />
    );
  }

  if (detailLoading) {
    return <ActivityIndicator size="large" color={C.text} style={{ marginTop: 40 }} />;
  }

  return (
    <>
      {todayLog && (
        <>
          <SleepTodayGoal dayNumber={todayLog.dayNumber} targetHours={todayLog.targetHours} />
          <SleepProgressBar loggedHours={todayLog.loggedHours} targetHours={todayLog.targetHours} />
          <SleepLogInput planId={activePlan.id} dayNumber={todayLog.dayNumber} onLogged={refetch} />
        </>
      )}
      {allLogs.length > 0 && (
        <SleepPlanOverview logs={allLogs} currentDay={todayLog?.dayNumber ?? 1} />
      )}
      <RestartButton onRestart={handleRestartPlan} />
    </>
  );
}

// RunContent: indhold for løbe-tab
function RunContent({
  plan,
  detail,
}: {
  plan: ReturnType<typeof useRunningPlan>;
  detail: ReturnType<typeof useRunPlanDetail>;
}) {
  const { plan: activePlan, starting, error, handleStartPlan, handleRestartPlan } = plan;
  const { todayLog, allLogs, loading: detailLoading, refetch } = detail;

  if (!activePlan) {
    return (
      <StartCard
        badge="30 dage"
        title="Klar til at løbe?"
        description="Følg vores 30-dages løbeplan og opbyg en sund løbevane. Start med 1 km og arbejd dig op til 2 km om dagen."
        buttonText="Start 30-dages løbeplan"
        starting={starting}
        error={error}
        onStart={handleStartPlan}
      />
    );
  }

  if (detailLoading) {
    return <ActivityIndicator size="large" color={C.text} style={{ marginTop: 40 }} />;
  }

  return (
    <>
      {todayLog && (
        <>
          <RunTodayGoal dayNumber={todayLog.dayNumber} targetKm={todayLog.targetKm} />
          <RunProgressBar loggedKm={todayLog.loggedKm} targetKm={todayLog.targetKm} />
          <RunLogInput planId={activePlan.id} dayNumber={todayLog.dayNumber} onLogged={refetch} />
        </>
      )}
      {allLogs.length > 0 && (
        <RunPlanOverview logs={allLogs} currentDay={todayLog?.dayNumber ?? 1} />
      )}
      <RestartButton onRestart={handleRestartPlan} />
    </>
  );
}

// StartCard: genanvendelig komponent der vises når en plan ikke er startet endnu
function StartCard({
  badge,
  title,
  description,
  buttonText,
  starting,
  error,
  onStart,
}: {
  badge: string;
  title: string;
  description: string;
  buttonText: string;
  starting: boolean;
  error: string;
  onStart: () => void;
}) {
  return (
    <View style={[neu.card, styles.startCard]}>
      <View style={[neu.inset, styles.startBadge]}>
        <Text style={styles.startBadgeText}>{badge}</Text>
      </View>
      <Text style={styles.startTitle}>{title}</Text>
      <Text style={styles.startDesc}>{description}</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity
        style={[neu.darkBtn, starting && styles.btnDisabled]}
        onPress={onStart}
        disabled={starting}
      >
        {starting ? (
          <ActivityIndicator color={C.bg} />
        ) : (
          <Text style={styles.btnText}>{buttonText}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

// RestartButton: knap til at genstarte planen fra dag 1
function RestartButton({ onRestart }: { onRestart: () => void }) {
  return (
    <TouchableOpacity style={[neu.card, styles.restartBtn]} onPress={onRestart}>
      <Text style={styles.restartText}>Start forfra</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: C.bg,
  },
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 64,
    paddingBottom: 40,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: C.bg,
  },
  header: {
    marginBottom: 20,
  },
  logo: {
    fontSize: 28,
    fontFamily: 'Montserrat_700Bold_Italic',
    color: C.text,
    letterSpacing: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: C.text,
    marginTop: 4,
  },
  tabRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 24,
  },
  tabBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    borderRadius: 16,
    padding: 0,
  },
  tabBtnActive: {
    backgroundColor: C.accent,
  },
  tabIcon: {
    fontSize: 16,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: C.textSoft,
  },
  tabLabelActive: {
    color: C.bg,
  },
  tabContent: {
    borderRadius: 20,
    padding: 16,
    marginHorizontal: -4,
    paddingHorizontal: 4,
  },
  startCard: {
    gap: 0,
  },
  startBadge: {
    alignSelf: 'flex-start',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    padding: 0,
    marginBottom: 14,
  },
  startBadgeText: {
    fontSize: 13,
    fontWeight: '600',
    color: C.textSoft,
  },
  startTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: C.text,
    marginBottom: 8,
  },
  startDesc: {
    fontSize: 14,
    color: C.textSoft,
    lineHeight: 21,
    marginBottom: 20,
  },
  error: {
    fontSize: 14,
    color: C.error,
    backgroundColor: '#F5E6E6',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  btnDisabled: {
    opacity: 0.6,
  },
  btnText: {
    fontSize: 16,
    fontWeight: '700',
    color: C.bg,
  },
  restartBtn: {
    alignItems: 'center',
    marginTop: 4,
    paddingVertical: 16,
  },
  restartText: {
    fontSize: 14,
    fontWeight: '600',
    color: C.error,
  },
});
