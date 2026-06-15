// Hydration service — alle API-kald relateret til hydreringsplanen.
// Kommunikerer med .NET backend via axios (api-klienten).
// Hver funktion kalder et specifikt endpoint og returnerer data eller fejlbesked.

import api from '../config/api';

// US 3.1 – Tjek om brugeren har en aktiv hydreringsplan (GET request)
export async function checkActivePlan(userId: string) {
  try {
    const res = await api.get(`/hydrationplan/active/${userId}`, { timeout: 5000 });
    return res.data; // returnerer plan-objektet hvis det findes
  } catch (err: any) {
    if (err.response?.status === 404) return null; // ingen aktiv plan fundet
    console.log('Fejl ved tjek af plan:', err);
    return null;
  }
}

// US 3.1 – Start en ny 30-dages hydreringsplan for brugeren (POST request)
export async function startPlan(userId: string) {
  try {
    const res = await api.post('/hydrationplan/start', { userId }, { timeout: 5000 });
    return { success: true, plan: res.data };
  } catch (err: any) {
    const message = err.response?.data?.message || 'Kunne ikke starte plan.';
    return { success: false, error: message };
  }
}

// US 3.2 – Hent dagens log (hvor meget vand brugeren har drukket i dag)
export async function getTodayLog(planId: number) {
  try {
    const res = await api.get(`/hydrationlog/today/${planId}`, { timeout: 5000 });
    return res.data; // indeholder loggedMl, targetMl, dayNumber
  } catch (err: any) {
    if (err.response?.status === 404) return null; // ingen log for i dag endnu
    console.log('Fejl ved hentning af dagens log:', err);
    return null;
  }
}

// US 3.3 – Log vandindtag: tilføj ml til dagens log (POST request)
export async function addWaterIntake(planId: number, dayNumber: number, amountMl: number) {
  try {
    const res = await api.post('/hydrationlog/add', { planId, dayNumber, amountMl }, { timeout: 5000 });
    return { success: true, log: res.data };
  } catch (err: any) {
    const message = err.response?.data?.message || 'Kunne ikke logge vand.';
    return { success: false, error: message };
  }
}

// US 3.5 – Hent alle logs for en plan (alle 30 dage) til roadmap-oversigten
export async function getAllLogs(planId: number) {
  try {
    const res = await api.get(`/hydrationlog/all/${planId}`, { timeout: 5000 });
    return res.data; // array af dag-logs
  } catch (err: any) {
    console.log('Fejl ved hentning af alle logs:', err);
    return [];
  }
}

// US 3.6 – Hent historik: kun de dage der er gennemførte (til historik-skærmen)
export async function getHistoryLogs(planId: number) {
  try {
    const res = await api.get(`/hydrationlog/history/${planId}`, { timeout: 5000 });
    return res.data;
  } catch (err: any) {
    console.log('Fejl ved hentning af historik:', err);
    return [];
  }
}

// US 3.7 – Genstart plan: slet den gamle og start en helt ny 30-dages plan
export async function restartPlan(userId: string) {
  try {
    const res = await api.post('/hydrationplan/restart', { userId }, { timeout: 5000 });
    return { success: true, plan: res.data };
  } catch (err: any) {
    const message = err.response?.data?.message || 'Kunne ikke genstarte plan.';
    return { success: false, error: message };
  }
}