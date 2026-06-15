// ChallengeCard: viser én challenge med titel, beskrivelse, type, mål og progress.
// Tre tilstande: ikke tilmeldt (vis "Deltag"), tilmeldt (vis progress), gennemført (vis points).

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Challenge, ChallengeProgress } from '../services/challengeService';
import { neu, C } from '../config/neu';

interface ChallengeCardProps {
    challenge: Challenge;
    isJoined: boolean;           // er brugeren tilmeldt?
    progress?: ChallengeProgress; // fremskridt (kun hvis tilmeldt)
    onJoin: (challengeId: string) => Promise<void>;
}

// Dansk labels for challenge-typer
const typeLabels: Record<string, string> = {
    streak: '🔥 Streak',
    single: '⚡ Engangs',
    plan: '📅 Langsigtet',
};

export default function ChallengeCard({ challenge, isJoined, progress, onJoin }: ChallengeCardProps) {
    const [joining, setJoining] = useState(false); // loading-state under tilmelding

    // Tilmeld brugeren til denne challenge
    const handleJoin = async () => {
        try {
            setJoining(true);
            await onJoin(challenge.id);
        } catch (err) {
            console.error('Fejl ved tilmelding:', err);
        } finally {
            setJoining(false);
        }
    };

    return (
        // US 5.5 – Vis challenge-info (titel, beskrivelse, type, mål)
        <View style={[neu.cardSm, styles.card]}>
            <View style={styles.header}>
                <Text style={styles.title}>{challenge.title}</Text>
                <View style={[neu.inset, styles.pointsBadge]}>
                    <Text style={styles.pointsText}>{challenge.points} pts</Text>
                </View>
            </View>

            <Text style={styles.description}>{challenge.description}</Text>

            <View style={styles.footer}>
                <Text style={styles.type}>{typeLabels[challenge.type] ?? challenge.type}</Text>
                <Text style={styles.target}>
                    Mål: {challenge.type === 'single'
                        ? (challenge.category === 'running'
                            ? `${challenge.target_value} km`
                            : challenge.category === 'sleep'
                            ? `${challenge.target_value} timer`
                            : `${challenge.target_value} ml`)
                        : `${challenge.target_value} dage`}
                </Text>
            </View>

            {/* US 5.7 – Vis progress-bar og fremskridtstekst */}
            {isJoined && progress && (
                <View style={styles.progressSection}>
                    <View style={styles.progressBarBg}>
                        <View style={[
                            styles.progressBarFill,
                            { width: `${Math.min(progress.progressPercent, 100)}%` },
                            progress.isCompleted && styles.progressBarCompleted
                        ]} />
                    </View>
                    <Text style={styles.progressText}>
                        {progress.isCompleted ? '🎉 Gennemført!' : progress.progressText}
                    </Text>
                </View>
            )}

            {/* US 5.6 – Tilmeld-knap / tilmeldt-badge */}
            {isJoined ? (
                // US 5.7 – Vis gennemført-badge med optjente points
                <View style={[neu.inset, styles.joinedBadge, progress?.isCompleted && styles.completedBadge]}>
                    <Text style={[styles.joinedText, progress?.isCompleted && styles.completedText]}>
                        {progress?.isCompleted ? `🏆 +${challenge.points} points` : '✅ Tilmeldt'}
                    </Text>
                </View>
            ) : (
                // US 5.6 – Deltag-knap til tilmelding
                <TouchableOpacity
                    style={[neu.darkBtn, styles.joinButton]}
                    onPress={handleJoin}
                    disabled={joining}
                >
                    {joining ? (
                        <ActivityIndicator size="small" color={C.bg} />
                    ) : (
                        <Text style={styles.joinButtonText}>Deltag</Text>
                    )}
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        marginHorizontal: 20,
        marginBottom: 12,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    title: { fontSize: 18, fontWeight: '700', color: C.text, flex: 1 },
    pointsBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, padding: 0 },
    pointsText: { fontSize: 13, fontWeight: '600', color: C.gold },
    description: { fontSize: 14, color: C.textSoft, lineHeight: 20, marginBottom: 12 },
    footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    type: { fontSize: 13, color: C.textMuted, fontWeight: '500' },
    target: { fontSize: 13, color: C.textMuted },
    progressSection: { marginBottom: 12 },
    progressBarBg: { height: 8, backgroundColor: C.inset, borderRadius: 4, overflow: 'hidden', marginBottom: 6 },
    progressBarFill: { height: '100%', backgroundColor: C.accent, borderRadius: 4 },
    progressBarCompleted: { backgroundColor: C.success },
    progressText: { fontSize: 13, color: C.textSoft, textAlign: 'center' },
    joinButton: { paddingVertical: 10 },
    joinButtonText: { color: C.bg, fontSize: 15, fontWeight: '600' },
    joinedBadge: { borderRadius: 12, paddingVertical: 10, alignItems: 'center', padding: 0 },
    joinedText: { color: C.success, fontSize: 15, fontWeight: '600' },
    completedBadge: {},
    completedText: { color: C.gold },
});
