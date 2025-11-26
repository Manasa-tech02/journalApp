import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import { LoginScreen } from '../screens/LoginScreen';
import { SignupScreen } from '../screens/SignupScreen';
import { WriteScreen } from '../screens/WriteScreen';
import { HistoryScreen } from '../screens/HistoryScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { ThemesScreen } from '../screens/ThemesScreen';

// Types
import { JournalEntry } from '../redux/journalSlice';

export type RootStackParamList = {
  Write: { entry?: JournalEntry };
  History: undefined;
  Settings: undefined;
  Themes: undefined;
  Login: undefined;
  Signup: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <Stack.Navigator 
      initialRouteName="Write" // 1. App opens directly to WriteScreen
      screenOptions={{ headerShown: false }}
    >
      {/* Main Journal Screens */}
      <Stack.Screen 
        name="Write" 
        component={WriteScreen} 
        options={{ animation: 'fade' }} 
      />
      <Stack.Screen 
        name="History" 
        component={HistoryScreen} 
        options={{ animation: 'fade' }} 
      />

      {/* Settings Menu (Transparent Modal) */}
      <Stack.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{
          presentation: 'transparentModal', // Makes background see-through
          animation: 'none', // We handle the slide animation inside the component
        }}
      />

      {/* Settings Options */}
      <Stack.Screen 
        name="Themes" 
        component={ThemesScreen}
        options={{ animation: 'slide_from_right' }}
      />

      {/* Auth Screens (Now part of the main stack) */}
      {/* This allows navigating Settings -> Login without errors */}
      <Stack.Screen 
        name="Login" 
        component={LoginScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen 
        name="Signup" 
        component={SignupScreen}
        options={{ animation: 'slide_from_right' }}
      />
    </Stack.Navigator>
  );
};