

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the structure of a single journal entry
export interface JournalEntry {
  id: string;
  content: string;
  date: string;        // ISO string (useful for sorting)
  displayDate: string; // e.g., "Wednesday, November 26, 2025"
  time: string;        // e.g., "12:45 PM"
}

interface JournalState {
  entries: JournalEntry[];
}

const initialState: JournalState = {
  entries: [],
};

const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    // Action to add a new entry
    addEntry: (state, action: PayloadAction<JournalEntry>) => {
      // Add to the beginning of the array so the newest entry shows first
      state.entries.unshift(action.payload);
    },

    // Action to update an existing entry (Edit functionality)
    updateEntry: (state, action: PayloadAction<JournalEntry>) => {
      const index = state.entries.findIndex((entry) => entry.id === action.payload.id);
      if (index !== -1) {
        state.entries[index] = action.payload;
      }
    },

    // Action to delete an entry
    deleteEntry: (state, action: PayloadAction<string>) => {
      state.entries = state.entries.filter((entry) => entry.id !== action.payload);
    },
  },
});

export const { addEntry, updateEntry, deleteEntry } = journalSlice.actions;
export default journalSlice.reducer;