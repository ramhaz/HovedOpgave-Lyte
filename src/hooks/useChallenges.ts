import { useState, useEffect, useCallback } from 'react';
import { challengeService, Challenge, ChallengeProgress } from '../services/challengeService';

export function useChallenges() {
    const [challenges, setChallenges] = useState<Challenge[]>([]);
    const [joinedIds, setJoinedIds] = useState<Set<string>>(new Set());
    const [progressMap, setProgressMap] = useState<Record<string, ChallengeProgress>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const [points, setPoints] = useState({ totalPoints: 0, completedChallenges: 0 });
    const fetchAll = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const [allChallenges, userChallenges, progress, totalPointsData ] = await Promise.all([
                challengeService.getAllChallenges(),     
                challengeService.getUserChallenges(),      
                challengeService.getChallengeProgress(),  
                challengeService.getTotalPoints()          
            ]);

            // US 5.5 – Gem alle challenges i state
            setChallenges(allChallenges);

            // US 5.6 – Gem hvilke challenges brugeren er tilmeldt
            setJoinedIds(new Set(userChallenges.map((uc: any) => uc.challengeId)));

            // US 5.7 – Gem progress og points
            const map: Record<string, ChallengeProgress> = {};
            progress.forEach(p => { map[p.challengeId] = p; });
            setProgressMap(map);
            setPoints(totalPointsData);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ukendt fejl');
        } finally {
            setLoading(false);
        }
    }, []);

    // US 5.6 – Tilmeld challenge og opdater lokal state
    const joinChallenge = useCallback(async (challengeId: string) => {
        await challengeService.joinChallenge(challengeId);
        setJoinedIds(prev => new Set(prev).add(challengeId));
    }, []);

    useEffect(() => {
        fetchAll();
    }, [fetchAll]);

    return { challenges, joinedIds, progressMap, points, loading, error, refetch: fetchAll, joinChallenge };
}