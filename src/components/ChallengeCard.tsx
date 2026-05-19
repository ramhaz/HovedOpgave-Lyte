import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Challenge } from '../services/challengeService';

interface ChallengeCardProps {
    challenge: Challenge;
    isJoined: boolean;
    onJoin: (challengeId: string) => Promise<void>;
}

const typeLabels: Record<string, string> = {
    streak: '🔥 Streak',
    single: '⚡ Engangs',
    plan: '📅 Langsigtet',
};

export default function ChallengeCard({ challenge, isJoined, onJoin }: ChallengeCardProps) {
    const [joining, setJoining] = useState(false);

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
        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.title}>{challenge.title}</Text>
                <View style={styles.pointsBadge}>
                    <Text style={styles.pointsText}>{challenge.points} pts</Text>
                </View>
            </View>

            <Text style={styles.description}>{challenge.description}</Text>

            <View style={styles.footer}>
                <Text style={styles.type}>{typeLabels[challenge.type] ?? challenge.type}</Text>
                <Text style={styles.target}>
                    Mål: {challenge.type === 'single'
                        ? `${challenge.target_value} ml`
                        : `${challenge.target_value} dage`}
                </Text>
            </View>

            {isJoined ? (
                <View style={styles.joinedBadge}>
                    <Text style={styles.joinedText}>✅ Tilmeldt</Text>
                </View>
            ) : (
                <TouchableOpacity
                    style={styles.joinButton}
                    onPress={handleJoin}
                    disabled={joining}
                >
                    {joining ? (
                        <ActivityIndicator size="small" color="#fff" />
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
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginHorizontal: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1a1a2e',
        flex: 1,
    },
    pointsBadge: {
        backgroundColor: '#e0f2fe',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    pointsText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#0284c7',
    },
    description: {
        fontSize: 14,
        color: '#64748b',
        lineHeight: 20,
        marginBottom: 12,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    type: {
        fontSize: 13,
        color: '#94a3b8',
        fontWeight: '500',
    },
    target: {
        fontSize: 13,
        color: '#94a3b8',
    },
    joinButton: {
        backgroundColor: '#0284c7',
        borderRadius: 12,
        paddingVertical: 10,
        alignItems: 'center',
    },
    joinButtonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600',
    },
    joinedBadge: {
        backgroundColor: '#f0fdf4',
        borderRadius: 12,
        paddingVertical: 10,
        alignItems: 'center',
    },
    joinedText: {
        color: '#16a34a',
        fontSize: 15,
        fontWeight: '600',
    },
});