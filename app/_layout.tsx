// Root Layout — appens hovedlayout og indgangspunkt.
// Wrapper hele appen med AuthProvider og CartProvider (React Context).
// Styrer navigation: viser login/register hvis ikke logget ind, ellers tab-navigation.

import { AuthProvider, useAuth } from '../src/context/AuthContext';
import { CartProvider } from '../src/context/CartContext';
import { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Stack } from 'expo-router';
import LoginScreen from '../src/screens/LoginScreen';
import RegisterScreen from '../src/screens/RegisterScreen';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useFonts, BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue';

// US 2.5 – Hold splashscreen synlig indtil appen er klar
SplashScreen.preventAutoHideAsync();

// RootContent bestemmer hvad brugeren ser baseret på login-status
function RootContent() {
  const { isLoggedIn, isLoading } = useAuth();
  const [showRegister, setShowRegister] = useState(false); // skift mellem login/register
  const [fontsLoaded] = useFonts({ BebasNeue_400Regular });

  // Skjul splashscreen når auth-tjek er færdigt
  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hideAsync();
    }
  }, [isLoading]);

  // Mens vi tjekker auth-status: vis splashscreen (returnér null)
  if (isLoading ) {
    return null;
  }

  // Ikke logget ind: vis login eller registreringsskærm
  if (!isLoggedIn) {
    if (showRegister) {
      return (
        <RegisterScreen
          onRegisterSuccess={() => setShowRegister(false)}
          onGoToLogin={() => setShowRegister(false)}
        />
      );
    }
    return (
      <LoginScreen
        onLoginSuccess={() => {}}
        onGoToRegister={() => setShowRegister(true)}
      />
    );
  }

  // Logget ind: vis tab-navigation (Expo Router Stack)
  return <Stack screenOptions={{ headerShown: false }} />;
}

// RootLayout: wrapper hele appen med providers så auth og kurv er tilgængelig overalt
export default function RootLayout() {
  return (
    <AuthProvider>
      <CartProvider>
        <RootContent />
      </CartProvider>
    </AuthProvider>
  );
}