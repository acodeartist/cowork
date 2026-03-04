import { randomDelay } from '../utils/delay';
import {
  setSteps,
  advanceStep,
  completeCurrentStep,
  setThinking,
  setSimulating,
  addArtifact,
} from '../store/agentSlice';
import { addMessage, setProcessing } from '../store/chatSlice';
import { activateSkill } from '../store/skillsSlice';

const TOOL_TO_SKILL = {
  Gmail: 'gmail',
};

export async function runSimulation(dispatch, plan) {
  dispatch(setProcessing(true));
  dispatch(setSimulating(true));

  // Thinking phase
  dispatch(setThinking(true));
  await randomDelay(800, 1500);
  dispatch(setThinking(false));

  // Set up steps
  dispatch(setSteps(plan.steps));

  // Run through steps
  for (let i = 0; i < plan.steps.length; i++) {
    dispatch(advanceStep());

    // Activate the skill for this tool
    const skillId = TOOL_TO_SKILL[plan.steps[i].tool];
    if (skillId) {
      dispatch(activateSkill(skillId));
    }

    await randomDelay(1200, 2500);
    dispatch(completeCurrentStep());
  }

  // Add artifacts
  if (plan.artifacts) {
    for (const artifact of plan.artifacts) {
      dispatch(addArtifact(artifact));
    }
  }

  // Add assistant response
  dispatch(
    addMessage({
      id: Date.now(),
      role: 'assistant',
      content: plan.response,
      timestamp: new Date().toISOString(),
    })
  );

  dispatch(setSimulating(false));
  dispatch(setProcessing(false));
}
