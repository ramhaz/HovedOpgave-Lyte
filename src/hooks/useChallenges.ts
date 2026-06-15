// useChallenges hook: henter og håndterer alle challenge-data.
// Samler 4 API-kald i ét Promise.all for hurtig load.
// Holder styr på: alle challenges, tilmeldte, fremskridt og points.

import { useState, useEffect, useCallback } from 'react';
import { challengeService, Challenge, ChallengeProgress } from '../services/challengeService';

export function useChallenges() {
    const [challenges, setChallenges] = useState<Challenge[]>([]);                              // alle challenges
    const [joinedIds, setJoinedIds] = useState<Set<string>>(new Set());                         // Set af tilmeldte challenge-IDs
    const [progressMap, setProgressMap] = useState<Record<string, ChallengeProgress>>({});       // fremskridt per challenge
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [points, setPoints] = useState({ totalPoints: 0, completedChallenges: 0 });           // samlet point-status

    // Hent alt challenge-data parallelt med Promise.all
    const fetchAll = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            // 4 API-kald på én gang for hurtigere load
            const [allChallenges, userChallenges, progress, totalPointsData ] = await Promise.all([
                challengeService.getAllChallenges(),       // alle tilgængelige challenges
                challengeService.getUserChallenges(),      // brugerens tilmeldte challenges
                challengeService.getChallengeProgress(),   // fremskridt for tilmeldte
                challengeService.getTotalPoints()          // samlet point-status
            ]);

            setChallenges(allChallenges);

            // Opret et Set af tilmeldte IDs for hurtig lookup (O(1) i stedet for O(n))
            setJoinedIds(new Set(userChallenges.map((uc: any) => uc.challengeId)));

            // Konvertér progress-array til et map for hurtig opslag per challengeId
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

    // Tilmeld en challenge og opdater lokal state med det samme (optimistisk UI)
    const joinChallenge = useCallback(async (challengeId: string) => {
        await challengeService.joinChallenge(challengeId);
        setJoinedIds(prev => new Set(prev).add(challengeId)); // tilføj til Set lokalt
    }, []);

    // Hent data ved første render
    useEffect(() => {
        fetchAll();
    }, [fetchAll]);

    return { challenges, joinedIds, progressMap, points, loading, error, refetch: fetchAll, joinChallenge };
}