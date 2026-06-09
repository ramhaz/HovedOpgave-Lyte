import { supabase } from '../config/supabaseClient';
import api from '../config/api';

export interface Challenge {
    id: string;
    title: string;
    description: string;
    type: 'streak' | 'single' | 'plan';
    category: 'hydration' | 'running' | 'sleep';
    target_value: number;
    points: number;
    is_active: boolean;
}

export interface ChallengeProgress {
    challengeId: string;
    title: string;
    type: string;
    points: number;
    progress: number;
    target: number;
    progressText: string;
    progressPercent: number;
    isCompleted: boolean;
    completedAt: string | null;
}

async function authHeaders() {
    const { data: { session } } = await supabase.auth.getSession();
    return { Authorization: `Bearer ${session?.access_token}` };
}

export const challengeService = {
    async getAllChallenges(category?: string): Promise<Challenge[]> {
        const headers = await authHeaders();
        const params = category ? { category } : {};
        const res = await api.get('/challenge', { headers, params });
        return res.data;
    },

    async joinChallenge(challengeId: string): Promise<void> {
        const headers = await authHeaders();
        await api.post(`/challenge/join/${challengeId}`, {}, { headers });
    },

    async getUserChallenges(): Promise<any[]> {
        const headers = await authHeaders();
        const res = await api.get('/challenge/my', { headers });
        return res.data;
    },

    async getChallengeProgress(): Promise<ChallengeProgress[]> {
        const headers = await authHeaders();
        const res = await api.get('/challenge/progress', { headers });
        return res.data;
    },

    async getTotalPoints(): Promise<{ totalPoints: number; completedChallenges: number }> {
        const headers = await authHeaders();
        const res = await api.get('/challenge/points', { headers });
        return res.data;
    },
};
