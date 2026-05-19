import { useState, useEffect, useCallback } from 'react';
import { challengeService, Challenge } from '../services/challengeService';

export function useChallenges() {
    const [challenges, setChallenges] = useState<Challenge[]>([]);
    const [joinedIds, setJoinedIds] = useState<Set<string>>(new Set());
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAll = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const [allChallenges, userChallenges] = await Promise.all([
                challengeService.getAllChallenges(),
                challengeService.getUserChallenges(),
            ]);
            setChallenges(allChallenges);
            setJoinedIds(new Set(userChallenges.map((uc: any) => uc.challengeId)));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ukendt fejl');
        } finally {
            setLoading(false);
        }
    }, []);

    const joinChallenge = useCallback(async (challengeId: string) => {
        await challengeService.joinChallenge(challengeId);
        setJoinedIds(prev => new Set(prev).add(challengeId));
    }, []);

    useEffect(() => {
        fetchAll();
    }, [fetchAll]);

    return { challenges, joinedIds, loading, error, refetch: fetchAll, joinChallenge };
}