import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState, AppDispatch } from './store'; // Assuming you define RootState and AppDispatch in store.ts

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// export const useThemeColors = () => {
//   // Get user preference from Redux
//   const themeMode = useSelector((state: RootState) => state.theme.mode);
  
//   // Get system preference (for Auto mode)
//   const systemScheme = useColorScheme();

//   // Determine active mode
//   const activeMode = themeMode === 'auto' ? systemScheme : themeMode;

//   // Return the correct colors
//   return activeMode === 'dark' ? darkColors : lightColors;
// };