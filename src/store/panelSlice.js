import { createSlice } from '@reduxjs/toolkit';

const panelSlice = createSlice({
  name: 'panel',
  initialState: {
    isOpen: true,
    expandedSections: {
      progress: true,
      artifacts: true,
      skills: false,
    },
  },
  reducers: {
    togglePanel: (state) => {
      state.isOpen = !state.isOpen;
    },
    toggleSection: (state, action) => {
      const section = action.payload;
      state.expandedSections[section] = !state.expandedSections[section];
    },
  },
});

export const { togglePanel, toggleSection } = panelSlice.actions;
export default panelSlice.reducer;
