import { AuthProvider, useAuth } from '../src/context/AuthContext';
import { CartProvider } from '../src/context/CartContext'; // US 5.5
import { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Stack } from 'expo-router';
import LoginScreen from '../src/screens/LoginScreen';
import RegisterScreen from '../src/screens/RegisterScreen';
import * as SplashScreen from 'expo-splash-screen'; // userstorie 2.5
import { useEffect } from 'react'; // userstorie 2.5
import { useFonts, BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue';



//userstorie 2.2
SplashScreen.preventAutoHideAsync();

function RootContent() {
  const { isLoggedIn, isLoading } = useAuth();
  const [showRegister, setShowRegister] = useState(false);
  const [fontsLoaded] = useFonts({ BebasNeue_400Regular });

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hideAsync();
    }
  }, [isLoading]);

  if (isLoading ) {
    return null; //splashscreen
  }

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

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <CartProvider>
        <RootContent />
      </CartProvider>
    </AuthProvider>
  );
}