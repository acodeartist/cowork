import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './chatSlice';
import agentReducer from './agentSlice';
import panelReducer from './panelSlice';
import skillsReducer from './skillsSlice';

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    agent: agentReducer,
    panel: panelReducer,
    skills: skillsReducer,
  },
});
