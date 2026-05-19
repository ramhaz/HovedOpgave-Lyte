// src/services/challengeService.ts
import { supabase } from '../config/supabaseClient';

const API_BASE = 'http://192.168.50.162:5179';

export interface Challenge {
    id: string;
    title: string;
    description: string;
    type: 'streak' | 'single' | 'plan';
    target_value: number;
    points: number;
    is_active: boolean;
}

export const challengeService = {
    async getAllChallenges(): Promise<Challenge[]> {
        const { data: { session } } = await supabase.auth.getSession();

        const response = await fetch(`${API_BASE}/api/challenge`, {
            headers: {
                'Authorization': `Bearer ${session?.access_token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Kunne ikke hente challenges');
        }

        return response.json();
    },

   /* async joinChallenge(challengeId: string): Promise<void> {
        const { data: { session } } = await supabase.auth.getSession();

        const response = await fetch(`${API_BASE}/api/challenge/join/${challengeId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${session?.access_token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Kunne ikke tilmelde challenge');
        }
    },

    async getUserChallenges(): Promise<any[]> {
        const { data: { session } } = await supabase.auth.getSession();

        const response = await fetch(`${API_BASE}/api/challenge/my`, {
            headers: {
                'Authorization': `Bearer ${session?.access_token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Kunne ikke hente dine challenges');
        }

        return response.json();
    },*/
};