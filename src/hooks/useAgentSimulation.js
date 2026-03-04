import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../store/chatSlice';
import { clearAgent } from '../store/agentSlice';
import { generateAgentPlan } from '../services/geminiService';
import { selectScript } from '../data/simulationScripts';
import { runSimulation } from '../services/agentSimulationService';

export function useAgentSimulation() {
  const dispatch = useDispatch();
  const isProcessing = useSelector((state) => state.chat.isProcessing);

  const sendMessage = useCallback(
    async (text) => {
      if (!text.trim() || isProcessing) return;

      // Add user message
      dispatch(
        addMessage({
          id: Date.now(),
          role: 'user',
          content: text.trim(),
          timestamp: new Date().toISOString(),
        })
      );

      // Clear previous agent state
      dispatch(clearAgent());

      // Try Gemini first, fall back to hardcoded scripts
      let plan = await generateAgentPlan(text.trim());
      if (!plan) {
        plan = selectScript(text.trim());
      }

      await runSimulation(dispatch, plan);
    },
    [dispatch, isProcessing]
  );

  return { sendMessage, isProcessing };
}
