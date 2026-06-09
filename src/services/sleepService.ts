import api from '../config/api';

export async function checkActiveSleepPlan(userId: string) {
  try {
    const res = await api.get(`/sleepplan/active/${userId}`, { timeout: 5000 });
    return res.data;
  } catch (err: any) {
    if (err.response?.status === 404) return null;
    console.log('Fejl ved tjek af søvnplan:', err);
    return null;
  }
}

export async function startSleepPlan(userId: string) {
  try {
    const res = await api.post('/sleepplan/start', { userId }, { timeout: 5000 });
    return { success: true, plan: res.data };
  } catch (err: any) {
    const message = err.response?.data?.message || 'Kunne ikke starte søvnplan.';
    return { success: false, error: message };
  }
}

export async function getTodaySleepLog(planId: number) {
  try {
    const res = await api.get(`/sleeplog/today/${planId}`, { timeout: 5000 });
    return res.data;
  } catch (err: any) {
    if (err.response?.status === 404) return null;
    console.log('Fejl ved hentning af dagens søvn-log:', err);
    return null;
  }
}

export async function addSleepEntry(planId: number, dayNumber: number, hours: number) {
  try {
    const res = await api.post('/sleeplog/add', { planId, dayNumber, hours }, { timeout: 5000 });
    return { success: true, log: res.data };
  } catch (err: any) {
    const message = err.response?.data?.message || 'Kunne ikke logge søvn.';
    return { success: false, error: message };
  }
}

export async function getAllSleepLogs(planId: number) {
  try {
    const res = await api.get(`/sleeplog/all/${planId}`, { timeout: 5000 });
    return res.data;
  } catch (err: any) {
    console.log('Fejl ved hentning af alle søvn-logs:', err);
    return [];
  }
}

export async function getSleepHistoryLogs(planId: number) {
  try {
    const res = await api.get(`/sleeplog/history/${planId}`, { timeout: 5000 });
    return res.data;
  } catch (err: any) {
    console.log('Fejl ved hentning af søvn-historik:', err);
    return [];
  }
}

export async function restartSleepPlan(userId: string) {
  try {
    const res = await api.post('/sleepplan/restart', { userId }, { timeout: 5000 });
    return { success: true, plan: res.data };
  } catch (err: any) {
    const message = err.response?.data?.message || 'Kunne ikke genstarte søvnplan.';
    return { success: false, error: message };
  }
}
