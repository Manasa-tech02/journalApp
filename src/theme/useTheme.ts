import { useSelector } from 'react-redux';
import { useColorScheme } from 'react-native';
// Adjust path to your store types
import { RootState } from '../redux/store';

// 1. Define Palettes
const lightColors = {
  background: '#FDFBF7',
  text: '#1F2937',
  subText: '#6B7280',
  cardBg: '#FFFFFF',
  primary: '#4E7C64',
  border: '#E5E7EB',
  placeholder: '#9CA3AF',
  inputBg: '#FFFFFF',
};

const darkColors = {
  background: '#111827',
  text: '#F9FAFB',
  subText: '#9CA3AF',
  cardBg: '#1F2937',
  primary: '#5F8D76', // Slightly lighter green for dark mode
  border: '#374151',
  placeholder: '#4B5563',
  inputBg: '#374151',
};

// 2. Create the Hook
export const useThemeColors = () => {
  // Get user preference from Redux
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  
  // Get system preference (for Auto mode)
  const systemScheme = useColorScheme();

  // Determine active mode
  const activeMode = themeMode === 'auto' ? systemScheme : themeMode;

  // Return the correct colors
  return activeMode === 'dark' ? darkColors : lightColors;
};