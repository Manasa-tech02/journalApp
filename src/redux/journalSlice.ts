import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface JournalEntry {
  id: string;
  date: string;       // ISO String for sorting
  displayDate: string; // Readable date
  time: string;
  content: string;
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
    addEntry: (state, action: PayloadAction<JournalEntry>) => {
      // Add new entry to the top of the list
      state.entries.unshift(action.payload);
    },
    updateEntry: (state, action: PayloadAction<JournalEntry>) => {
      const index = state.entries.findIndex(e => e.id === action.payload.id);
      if (index !== -1) {
        state.entries[index] = action.payload;
      }
    },
  },
});

export const { addEntry, updateEntry } = journalSlice.actions;
export default journalSlice.reducer;