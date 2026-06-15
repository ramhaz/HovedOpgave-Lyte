// Running service — alle API-kald relateret til løbeplanen.
// Samme mønster som hydrationService, men for løb (km i stedet for ml).

import api from '../config/api';

// Tjek om brugeren har en aktiv løbeplan
export async function checkActiveRunPlan(userId: string) {
  try {
    const res = await api.get(`/runningplan/active/${userId}`, { timeout: 5000 });
    return res.data;
  } catch (err: any) {
    if (err.response?.status === 404) return null; // ingen aktiv plan
    console.log('Fejl ved tjek af løbeplan:', err);
    return null;
  }
}

// Start en ny 30-dages løbeplan
export async function startRunPlan(userId: string) {
  try {
    const res = await api.post('/runningplan/start', { userId }, { timeout: 5000 });
    return { success: true, plan: res.data };
  } catch (err: any) {
    const message = err.response?.data?.message || 'Kunne ikke starte løbeplan.';
    return { success: false, error: message };
  }
}

// Hent dagens løbe-log (loggedKm, targetKm, dayNumber)
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

// Log en løbetur: tilføj km til dagens log
export async function addRunIntake(planId: number, dayNumber: number, amountKm: number) {
  try {
    const res = await api.post('/runninglog/add', { planId, dayNumber, amountKm }, { timeout: 5000 });
    return { success: true, log: res.data };
  } catch (err: any) {
    const message = err.response?.data?.message || 'Kunne ikke logge løb.';
    return { success: false, error: message };
  }
}

// Hent alle logs for løbeplanen (alle 30 dage til roadmap-oversigt)
export async function getAllRunLogs(planId: number) {
  try {
    const res = await api.get(`/runninglog/all/${planId}`, { timeout: 5000 });
    return res.data;
  } catch (err: any) {
    console.log('Fejl ved hentning af alle løbe-logs:', err);
    return [];
  }
}

// Hent løbehistorik (gennemførte dage til historik-skærmen)
export async function getRunHistoryLogs(planId: number) {
  try {
    const res = await api.get(`/runninglog/history/${planId}`, { timeout: 5000 });
    return res.data;
  } catch (err: any) {
    console.log('Fejl ved hentning af løbe-historik:', err);
    return [];
  }
}

// Genstart løbeplan: slet gammel plan og start en ny
export async function restartRunPlan(userId: string) {
  try {
    const res = await api.post('/runningplan/restart', { userId }, { timeout: 5000 });
    return { success: true, plan: res.data };
  } catch (err: any) {
    const message = err.response?.data?.message || 'Kunne ikke genstarte løbeplan.';
    return { success: false, error: message };
  }
}
