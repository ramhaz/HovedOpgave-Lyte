import React from 'react';
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    RefreshControl,
} from 'react-native';
import { useChallenges } from '../hooks/useChallenges';
import ChallengeCard from '../components/ChallengeCard';

export default function ChallengesScreen() {
    const { challenges, joinedIds, loading, error, refetch, joinChallenge } = useChallenges();

    if (loading && challenges.length === 0) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#0284c7" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text style={styles.errorText}>😕 {error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Challenges</Text>
            <Text style={styles.subtitle}>Gennemfør challenges og optjen points 💧</Text>

            <FlatList
                data={challenges}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ChallengeCard
                        challenge={item}
                        isJoined={joinedIds.has(item.id)}
                        onJoin={joinChallenge}
                    />
                )}
                contentContainerStyle={styles.list}
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={refetch} />
                }
                ListEmptyComponent={
                    <Text style={styles.emptyText}>Ingen challenges tilgængelige</Text>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8fafc' },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    heading: { fontSize: 28, fontWeight: '800', color: '#1a1a2e', paddingHorizontal: 16, paddingTop: 16 },
    subtitle: { fontSize: 14, color: '#64748b', paddingHorizontal: 16, marginBottom: 16 },
    list: { paddingBottom: 24 },
    errorText: { fontSize: 16, color: '#ef4444' },
    emptyText: { textAlign: 'center', color: '#94a3b8', marginTop: 40, fontSize: 15 },
});