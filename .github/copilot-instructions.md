# Copilot Instructions - Daily Journal App

## Project Overview
**Daily Journal** is a React Native/Expo app for journaling with local-first architecture. The app provides offline-capable journaling with theme switching and basic authentication.

**Tech Stack:** Expo + React Native, Redux (state management), Redux Persist (offline storage), date-fns (date formatting), TypeScript

## Architecture Patterns

### State Management (Redux)
- **Location:** `src/redux/`
- **Pattern:** Redux Toolkit slices for modular state
  - `authSlice.ts` - Stores user login state and user profile (email, name)
  - `journalSlice.ts` - Manages journal entries (add/update/delete operations)
  - `themeSlice.ts` - Stores theme preference ('light' | 'dark' | 'auto')
- **Persistence:** `redux-persist` + `AsyncStorage` - automatically persists auth, theme, and journal entries to device
- **Key Action:** All Redux actions are simple synchronous mutations (no async middleware). Authentication is simulated; no backend calls yet.

### Theme System
- **Hook:** `useThemeColors()` in `src/theme/useTheme.ts`
  - Returns light/dark color palettes based on Redux theme mode + system preference
  - **Pattern:** All screens import and call `useThemeColors()` to apply dynamic colors
  - Supports system-level dark mode detection for 'auto' mode
- **Color definitions:** `src/theme/colors.ts` (fallback palette, though actual colors come from useTheme hook)
- **Key rule:** Never hardcode colors—always use `useThemeColors()` to respect user theme preference

### Navigation Structure
- **Navigator:** `src/navigation/AppNavigator.tsx` uses React Navigation Native Stack
- **Stack includes:** Write, History, Settings (modal), Themes, Login, Signup
- **Key pattern:** Settings screen opens as `transparentModal` with custom slide animation handled inside component
- **Initial route:** WriteScreen (users land on write screen first)
- **Param passing:** WriteScreen can receive an optional `entry` param from History for edit mode

### Screen Hierarchy
```
Write (Write journal entry)
  ↓ (navigate with entry param)
History (View all entries, edit/delete)
  ↓ 
Settings (Modal menu - themed & animated)
  ├→ Themes (Select theme preference)
  └→ Login/Signup (Auth screens, also accessible from History)
```

## Core Patterns & Conventions

### Journal Entry Structure
```typescript
interface JournalEntry {
  id: string;              // Timestamp-based ID
  content: string;         // User's journal text
  date: string;           // ISO 8601 string (for sorting/DB)
  displayDate: string;    // Human-readable "Thursday, November 27, 2025"
  time: string;           // Human-readable "5:04 PM"
}
```
- **Date handling:** Use `date-fns` (imported in WriteScreen, HistoryScreen)
  - Format ISO → Display: `format(parseISO(item.date), 'EEEE, MMMM d, yyyy')`
  - Store ISO for DB: `new Date().toISOString()`

### Screen Entry/Edit Flow
1. **New entry:** Navigate to Write with no params → saves with new ID and current timestamp
2. **Edit entry:** History screen → tap card → navigate Write with `{ entry: existing }` → shows prepopulated content + preserves original date
3. **Save:** Dispatch `addEntry` (new) or `updateEntry` (edit) to Redux, persist via redux-persist

### Styling Conventions
- **Style scope:** Each screen has its own `StyleSheet` (bottom of file) with layout-only styles
- **Dynamic colors:** Applied at render time from `useThemeColors()` via inline style objects
- **Pattern example** (WriteScreen):
  ```tsx
  <View style={[styles.card, { backgroundColor: colors.cardBg }]}>
    <TextInput style={[styles.input, { color: colors.text, backgroundColor: colors.inputBg }]} />
  </View>
  ```
- **Focused states:** Common pattern—track `isFocused` state, apply `borderColor: colors.primary` on focus

### Custom Header Component
- **Location:** `src/components/CustomHeader.tsx`
- **Responsibility:** Renders top navigation (Write/History links, Settings menu button)
- **Active state:** Highlights current screen nav item; accessible from all main screens
- **Usage:** Import and place at top of screen (e.g., all screens in write/history/themes start with `<CustomHeader />`)

### Authentication (Simulated)
- **Flow:** Login/Signup dispatch user to Redux, no backend validation
- **Data persisted:** User email stored in Redux auth slice
- **Conditional UI:** Settings screen shows logged-in user's email or "Sign in to sync" if logged out
- **Note:** Firebase dependency exists in package.json but not integrated; future enhancement

## Developer Workflows

### Running the App
```bash
npm start          # Start Expo dev server
npm run android    # Run on Android device/emulator
npm run ios        # Run on iOS device/simulator
npm run web        # Run in browser (limited support)
```

### Adding a New Screen
1. Create file in `src/screens/NewScreen.tsx` (use named export `export const NewScreen`)
2. Add to `RootStackParamList` type in `AppNavigator.tsx`
3. Register in Stack.Navigator with animation option (e.g., `animation: 'slide_from_right'`)
4. Import `useThemeColors()` and `CustomHeader` if needed

### Modifying Redux State
1. Edit the relevant slice in `src/redux/` (authSlice, journalSlice, themeSlice)
2. Exports auto-persist to AsyncStorage via redux-persist config
3. In components, use `useDispatch()` and `useSelector()` (or typed hooks from `src/redux/hooks.ts`)

### Date Handling
- Always import `date-fns` for formatting: `import { format, parseISO } from 'date-fns'`
- Never use `toLocaleDateString()` for consistency across iOS/Android
- Examples:
  - Format with time: `format(parseISO(dateStr), 'EEEE, MMMM d, yyyy')`
  - Format time only: `format(parseISO(dateStr), 'h:mm a')`

## File Organization
```
src/
  components/      CustomHeader (reusable nav)
  navigation/      AppNavigator (stack config)
  redux/           Slices + hooks + store config
  screens/         All screen components
  theme/           Colors palette + useTheme hook
App.tsx            Redux + Navigation setup
```

## Important Notes
- **No async middleware:** All thunks/async are not configured; API integration future work
- **No backend:** Auth and data are local-only (simulated)
- **Animations:** Custom Animated API used in SettingsScreen for slide-in drawer effect
- **Type safety:** Strict TypeScript mode enabled; all Redux state is typed via RootState
- **Persistent state:** Changes to auth, theme, or journal entries auto-save to device storage
