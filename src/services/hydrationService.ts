import api from '../config/api';

// US 3.1 - Tjek aktiv plan
export async function checkActivePlan(userId: string) {
  try {
    const res = await api.get(`/hydrationplan/active/${userId}`, { timeout: 5000 });
    return res.data;
  } catch (err: any) {
    if (err.response?.status === 404) return null;
    console.log('Fejl ved tjek af plan:', err);
    return null;
  }
}

// US 3.1 - Start ny plan
export async function startPlan(userId: string) {
  try {
    const res = await api.post('/hydrationplan/start', { userId }, { timeout: 5000 });
    return { success: true, plan: res.data };
  } catch (err: any) {
    const message = err.response?.data?.message || 'Kunne ikke starte plan.';
    return { success: false, error: message };
  }
}


// US 3.2 - Hent dagens log
export async function getTodayLog(planId: number) {
  try {
    const res = await api.get(`/hydrationlog/today/${planId}`, { timeout: 5000 });
    return res.data;
  } catch (err: any) {
    if (err.response?.status === 404) return null;
    console.log('Fejl ved hentning af dagens log:', err);
    return null;
  }
}


// US 3.3 - Log vandindtag
export async function addWaterIntake(planId: number, dayNumber: number, amountMl: number) {
  try {
    const res = await api.post('/hydrationlog/add', { planId, dayNumber, amountMl }, { timeout: 5000 });
    return { success: true, log: res.data };
  } catch (err: any) {
    const message = err.response?.data?.message || 'Kunne ikke logge vand.';
    return { success: false, error: message };
  }
}

// US 3.5 - Hent alle logs for en plan
export async function getAllLogs(planId: number) {
  try {
    const res = await api.get(`/hydrationlog/all/${planId}`, { timeout: 5000 });
    return res.data;
  } catch (err: any) {
    console.log('Fejl ved hentning af alle logs:', err);
    return [];
  }
}

// US 3.6 - Hent historik
export async function getHistoryLogs(planId: number) {
  try {
    const res = await api.get(`/hydrationlog/history/${planId}`, { timeout: 5000 });
    return res.data;
  } catch (err: any) {
    console.log('Fejl ved hentning af historik:', err);
    return [];
  }
}

// US 3.7 - Genstart plan
export async function restartPlan(userId: string) {
  try {
    const res = await api.post('/hydrationplan/restart', { userId }, { timeout: 5000 });
    return { success: true, plan: res.data };
  } catch (err: any) {
    const message = err.response?.data?.message || 'Kunne ikke genstarte plan.';
    return { success: false, error: message };
  }
}