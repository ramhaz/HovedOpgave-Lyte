// Challenge service — API-kald for challenges (udfordringer brugeren kan deltage i).
// Challenges har typer: streak (daglig serie), single (engangs), plan (langsigtet).
// Kræver auth-token da challenges er bruger-specifikke.

import { supabase } from '../config/supabaseClient';
import api from '../config/api';

// Type for en challenge — beskriver udfordringen
export interface Challenge {
    id: string;
    title: string;
    description: string;
    type: 'streak' | 'single' | 'plan'; // type af challenge
    category: 'hydration' | 'running' | 'sleep'; // hvilken plan den hører til
    target_value: number; // mål (fx 7 dage, 2000 ml)
    points: number; // point man får for at gennemføre
    is_active: boolean;
}

// Type for brugerens fremskridt i en challenge
export interface ChallengeProgress {
    challengeId: string;
    title: string;
    type: string;
    points: number;
    progress: number;        // nuværende fremskridt
    target: number;          // mål der skal nås
    progressText: string;    // fx "3/7 dage"
    progressPercent: number; // 0-100 procent
    isCompleted: boolean;
    completedAt: string | null;
}

// Hjælpefunktion: hent JWT-token fra Supabase session og byg auth-header
async function authHeaders() {
    const { data: { session } } = await supabase.auth.getSession();
    return { Authorization: `Bearer ${session?.access_token}` };
}

// Service-objekt med alle challenge-relaterede API-kald
export const challengeService = {
    // Hent alle tilgængelige challenges (evt. filtreret på kategori)
    async getAllChallenges(category?: string): Promise<Challenge[]> {
        const headers = await authHeaders();
        const params = category ? { category } : {};
        const res = await api.get('/challenge', { headers, params });
        return res.data;
    },

    // Tilmeld brugeren til en challenge
    async joinChallenge(challengeId: string): Promise<void> {
        const headers = await authHeaders();
        await api.post(`/challenge/join/${challengeId}`, {}, { headers });
    },

    // Hent brugerens tilmeldte challenges
    async getUserChallenges(): Promise<any[]> {
        const headers = await authHeaders();
        const res = await api.get('/challenge/my', { headers });
        return res.data;
    },

    // Hent fremskridt for alle brugerens challenges
    async getChallengeProgress(): Promise<ChallengeProgress[]> {
        const headers = await authHeaders();
        const res = await api.get('/challenge/progress', { headers });
        return res.data;
    },

    // Hent brugerens samlede point og antal gennemførte challenges
    async getTotalPoints(): Promise<{ totalPoints: number; completedChallenges: number }> {
        const headers = await authHeaders();
        const res = await api.get('/challenge/points', { headers });
        return res.data;
    },
};
