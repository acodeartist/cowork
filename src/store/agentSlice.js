import { createSlice } from '@reduxjs/toolkit';

const agentSlice = createSlice({
  name: 'agent',
  initialState: {
    steps: [],
    currentStepIndex: -1,
    isThinking: false,
    isSimulating: false,
    artifacts: [],
  },
  reducers: {
    setSteps: (state, action) => {
      state.steps = action.payload;
      state.currentStepIndex = -1;
    },
    advanceStep: (state) => {
      if (state.currentStepIndex < state.steps.length - 1) {
        state.currentStepIndex += 1;
        state.steps[state.currentStepIndex].status = 'running';
      }
    },
    completeCurrentStep: (state) => {
      if (state.currentStepIndex >= 0 && state.currentStepIndex < state.steps.length) {
        state.steps[state.currentStepIndex].status = 'completed';
      }
    },
    setThinking: (state, action) => {
      state.isThinking = action.payload;
    },
    setSimulating: (state, action) => {
      state.isSimulating = action.payload;
    },
    addArtifact: (state, action) => {
      state.artifacts.push(action.payload);
    },
    clearAgent: (state) => {
      state.steps = [];
      state.currentStepIndex = -1;
      state.isThinking = false;
      state.isSimulating = false;
      state.artifacts = [];
    },
  },
});

export const {
  setSteps,
  advanceStep,
  completeCurrentStep,
  setThinking,
  setSimulating,
  addArtifact,
  clearAgent,
} = agentSlice.actions;
export default agentSlice.reducer;
