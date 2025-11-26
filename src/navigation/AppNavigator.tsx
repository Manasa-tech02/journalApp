import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WriteScreen } from '../screens/WriteScreen';
import { HistoryScreen } from '../screens/HistoryScreen';
import { JournalEntry } from '../redux/journalSlice';

// Type definitions for navigation params
export type RootStackParamList = {
  Write: { entry?: JournalEntry };
  History: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
      <Stack.Screen name="Write" component={WriteScreen} />
      <Stack.Screen name="History" component={HistoryScreen} />
      <Stack.Screen name=""
    </Stack.Navigator>
  );
};