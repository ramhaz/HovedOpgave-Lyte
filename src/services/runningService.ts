import api from '../config/api';

export async function checkActiveRunPlan(userId: string) {
  try {
    const res = await api.get(`/runningplan/active/${userId}`, { timeout: 5000 });
    return res.data;
  } catch (err: any) {
    if (err.response?.status === 404) return null;
    console.log('Fejl ved tjek af løbeplan:', err);
    return null;
  }
}

export async function startRunPlan(userId: string) {
  try {
    const res = await api.post('/runningplan/start', { userId }, { timeout: 5000 });
    return { success: true, plan: res.data };
  } catch (err: any) {
    const message = err.response?.data?.message || 'Kunne ikke starte løbeplan.';
    return { success: false, error: message };
  }
}

export async function getTodayRunLog(planId: number) {
  try {
    const res = await api.get(`/runninglog/today/${planId}`, { timeout: 5000 });
    return res.data;
  } catch (err: any) {
    if (err.response?.status === 404) return null;
    console.log('Fejl ved hentning af dagens løbe-log:', err);
    return null;
  }
}

export async function addRunIntake(planId: number, dayNumber: number, amountKm: number) {
  try {
    const res = await api.post('/runninglog/add', { planId, dayNumber, amountKm }, { timeout: 5000 });
    return { success: true, log: res.data };
  } catch (err: any) {
    const message = err.response?.data?.message || 'Kunne ikke logge løb.';
    return { success: false, error: message };
  }
}

export async function getAllRunLogs(planId: number) {
  try {
    const res = await api.get(`/runninglog/all/${planId}`, { timeout: 5000 });
    return res.data;
  } catch (err: any) {
    console.log('Fejl ved hentning af alle løbe-logs:', err);
    return [];
  }
}

export async function getRunHistoryLogs(planId: number) {
  try {
    const res = await api.get(`/runninglog/history/${planId}`, { timeout: 5000 });
    return res.data;
  } catch (err: any) {
    console.log('Fejl ved hentning af løbe-historik:', err);
    return [];
  }
}

export async function restartRunPlan(userId: string) {
  try {
    const res = await api.post('/runningplan/restart', { userId }, { timeout: 5000 });
    return { success: true, plan: res.data };
  } catch (err: any) {
    const message = err.response?.data?.message || 'Kunne ikke genstarte løbeplan.';
    return { success: false, error: message };
  }
}
