// ChallengesScreen: viser alle tilgængelige challenges i en liste.
// Brugeren kan tilmelde sig challenges, se fremskridt og optjene points.
// Bruger FlatList med RefreshControl (pull-to-refresh).

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
import { neu, C } from '../config/neu';

export default function ChallengesScreen() {
    const { challenges, joinedIds, progressMap, points, loading, error, refetch, joinChallenge } = useChallenges();

    if (loading && challenges.length === 0) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color={C.text} />
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
        <View style={styles.bg}>
            <FlatList
                data={challenges}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={
                    <View>
                        <Text style={styles.heading}>Challenges</Text>
                        <Text style={styles.subtitle}>Gennemfør challenges og optjen points 💧</Text>
                        <View style={[neu.card, styles.pointsBox]}>
                            <Text style={styles.pointsTotal}>🏆 {points.totalPoints} points</Text>
                            <Text style={styles.pointsSub}>{points.completedChallenges} challenges gennemført</Text>
                        </View>
                    </View>
                }
                renderItem={({ item }) => (
                    // US 5.5 + 5.6 + 5.7 – Hvert kort viser challenge (5.5), tilmeldingsknap (5.6) og progress (5.7)
                    <ChallengeCard
                        challenge={item}
                        progress={progressMap[item.id]}
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
    bg: { 
        flex: 1, 
        backgroundColor: C.bg
     },
    center: { 
        flex: 1,
         justifyContent: 'center',
          alignItems: 'center', 
          backgroundColor: C.bg 
        },
    heading: {
        fontSize: 28,
         fontWeight: '800',
          color: C.text,
           paddingHorizontal: 20,
            paddingTop: 64
         },
    subtitle: { 
        fontSize: 14, 
        color: C.textSoft,
         paddingHorizontal: 20, 
         marginBottom: 16 
        },
    pointsBox: {
        marginHorizontal: 20, 
        marginBottom: 16, 
        alignItems: 'center'
     },
    pointsTotal: {
         fontSize: 24,
         fontWeight: '800', 
         color: C.gold 
        },
    pointsSub: {
         fontSize: 13, 
         color: C.gold 
        },
    list: {
         paddingBottom: 24 
        },
    errorText: { 
        fontSize: 16, 
        color: C.error
     },
    emptyText: {
         textAlign: 'center',
          color: C.textMuted,
           marginTop: 40, 
           fontSize: 15 
        },
});
