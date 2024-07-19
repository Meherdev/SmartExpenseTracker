import React from 'react';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { AuthProvider } from '@/context/AuthContext';
import { StatusBar, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView>
    <View style={{flex: 1}}>
      <StatusBar />
      <AuthProvider>
      <Stack>
        <Stack.Screen name="index" options={{headerShown: false}}/>
        <Stack.Screen name='screens/expenses' options={{headerTitle: 'Expense History', headerBackTitleVisible: false}}/>
        <Stack.Screen name='screens/scanner' options={{headerShown: false}} />
        <Stack.Screen name='screens/login' options={{headerShown: false}}/>
      </Stack>
    </AuthProvider>
    </View>
    </GestureHandlerRootView>
  );
}
