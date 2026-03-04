import { createSlice } from '@reduxjs/toolkit';
import { SKILLS } from '../data/skills';

const skillsSlice = createSlice({
  name: 'skills',
  initialState: {
    available: SKILLS,
    active: [],
  },
  reducers: {
    activateSkill: (state, action) => {
      const skillId = action.payload;
      if (!state.active.includes(skillId)) {
        state.active.push(skillId);
      }
    },
    deactivateSkill: (state, action) => {
      state.active = state.active.filter((id) => id !== action.payload);
    },
  },
});

export const { activateSkill, deactivateSkill } = skillsSlice.actions;
export default skillsSlice.reducer;
