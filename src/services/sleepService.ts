// Sleep service — alle API-kald relateret til søvnplanen.
// Samme mønster som hydration/running, men for søvn (timer i stedet for ml/km).

import api from '../config/api';

// Tjek om brugeren har en aktiv søvnplan
export async function checkActiveSleepPlan(userId: string) {
  try {
    const res = await api.get(`/sleepplan/active/${userId}`, { timeout: 5000 });
    return res.data;
  } catch (err: any) {
    if (err.response?.status === 404) return null; // ingen aktiv plan
    console.log('Fejl ved tjek af søvnplan:', err);
    return null;
  }
}

// Start en ny 30-dages søvnplan
export async function startSleepPlan(userId: string) {
  try {
    const res = await api.post('/sleepplan/start', { userId }, { timeout: 5000 });
    return { success: true, plan: res.data };
  } catch (err: any) {
    const message = err.response?.data?.message || 'Kunne ikke starte søvnplan.';
    return { success: false, error: message };
  }
}

// Hent dagens søvn-log (loggedHours, targetHours, dayNumber)
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

// Log søvn: tilføj antal timer til dagens søvn-log
export async function addSleepEntry(planId: number, dayNumber: number, hours: number) {
  try {
    const res = await api.post('/sleeplog/add', { planId, dayNumber, hours }, { timeout: 5000 });
    return { success: true, log: res.data };
  } catch (err: any) {
    const message = err.response?.data?.message || 'Kunne ikke logge søvn.';
    return { success: false, error: message };
  }
}

// Hent alle søvn-logs for planen (alle 30 nætter)
export async function getAllSleepLogs(planId: number) {
  try {
    const res = await api.get(`/sleeplog/all/${planId}`, { timeout: 5000 });
    return res.data;
  } catch (err: any) {
    console.log('Fejl ved hentning af alle søvn-logs:', err);
    return [];
  }
}

// Hent søvnhistorik (gennemførte nætter til historik-skærmen)
export async function getSleepHistoryLogs(planId: number) {
  try {
    const res = await api.get(`/sleeplog/history/${planId}`, { timeout: 5000 });
    return res.data;
  } catch (err: any) {
    console.log('Fejl ved hentning af søvn-historik:', err);
    return [];
  }
}

// Genstart søvnplan: slet gammel plan og start en ny
export async function restartSleepPlan(userId: string) {
  try {
    const res = await api.post('/sleepplan/restart', { userId }, { timeout: 5000 });
    return { success: true, plan: res.data };
  } catch (err: any) {
    const message = err.response?.data?.message || 'Kunne ikke genstarte søvnplan.';
    return { success: false, error: message };
  }
}
