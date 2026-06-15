// Tab Layout — konfigurerer bund-tab-navigationen med Expo Router.
// Definerer alle tabs, deres ikoner, og hvilke der er synlige/skjulte.
// Tabs med href: null er skjulte (navigeres til programmatisk, ikke via tab-bar).

import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../src/context/CartContext';
import { View, Text, StyleSheet } from 'react-native';

// US 5.5 – Badge-komponent på kurv-ikonet der viser antal varer
function CartBadge({ color, size }: { color: string; size: number }) {
  const { itemCount } = useCart(); // hent antal varer fra CartContext
  return (
    <View>
      <Ionicons name="cart-outline" size={size} color={color} />
      {/* Vis rød badge med antal hvis der er varer i kurven */}
      {itemCount > 0 && (
        <View style={badge.dot}>
          <Text style={badge.text}>{itemCount > 9 ? '9+' : itemCount}</Text>
        </View>
      )}
    </View>
  );
}

const badge = StyleSheet.create({
  dot: {
    position: 'absolute',
    top: -4,
    right: -6,
    backgroundColor: '#C44040',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 2,
  },
  text: { color: '#fff', fontSize: 10, fontWeight: '700' },
});

// TabLayout: definerer alle tabs og deres udseende
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarActiveTintColor: '#1A1A1A',
        tabBarInactiveTintColor: '#B0A898',
        tabBarStyle: {
          backgroundColor: '#F5F0E1',
          borderTopWidth: 0,
          shadowColor: '#B8AF9A',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.3,
          shadowRadius: 12,
          elevation: 12,
          height: 70,
          paddingBottom: 12,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Hjem',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="roadmap"
        options={{
          title: 'Plan',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'Historik',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="time-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="running"
        options={{
          href: null,
        }}
      />
     <Tabs.Screen
        name="runHistory"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="sleep"
        options={{
          href: null,
        }}
      /> 
      <Tabs.Screen
        name="sleepHistory"
        options={{
          href: null,
        }}
      /> 
      
      <Tabs.Screen
         name="Challenges"
         options={{
           tabBarIcon: ({ color, size }) => (
            <Ionicons name="trophy-outline" size={size} color={color} />
        ),
        tabBarLabel: 'Challenges',
        headerShown: false,
         }}
      />
      {/* US 5.5 – Kurv-tab med badge */}
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Kurv',
          tabBarIcon: ({ color, size }) => <CartBadge color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
