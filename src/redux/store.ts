// // import { configureStore } from '@reduxjs/toolkit';
// // import { persistStore, persistReducer } from 'redux-persist';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import journalReducer from './journalSlice';

// // const persistConfig = {
// //   key: 'root',
// //   storage: AsyncStorage,
// // };

// // const persistedReducer = persistReducer(persistConfig, journalReducer);

// // export const store = configureStore({
// //   reducer: {
// //     journal: persistedReducer,
// //   },
// //   middleware: (getDefaultMiddleware) =>
// //     getDefaultMiddleware({
// //       serializableCheck: false, // Needed for Redux Persist
// //     }),
// // });

// // export const persistor = persistStore(store);

// // // Types for TypeScript
// // export type RootState = ReturnType<typeof store.getState>;
// // export type AppDispatch = typeof store.dispatch;




// import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// import journalReducer from './journalSlice'; 

// export const store = configureStore({
//   reducer: {
//     journal: journalReducer,
//     // Add other reducers here if your app grows
//   },
//   // We remove Redux Persist setup here since we moved to API integration
//   // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
// });

// // Define the types needed for the custom hooks
// export type RootState = ReturnType<typeof store.getState>;
// // This is the CRITICAL line: it tells dispatch it can handle Thunks
// export type AppDispatch = typeof store.dispatch;

// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;





import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authReducer from './authSlice';
import themeReducer from './themeSlice';
import journalReducer from './journalSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,
  journal: journalReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['theme', 'auth'], // Save Theme and Auth to disk
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;