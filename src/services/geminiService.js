import { GoogleGenerativeAI } from '@google/generative-ai';

let genAI = null;
let model = null;

function getModel() {
  if (model) return model;
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('VITE_GEMINI_API_KEY not set');
  }
  genAI = new GoogleGenerativeAI(apiKey);
  model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  return model;
}

const SYSTEM_PROMPT = `You are a planning engine for an AI Gmail assistant called GmailAgent. Given a user message, generate a JSON array of agent steps that would be needed to fulfill the request using Gmail. Each step should have:
- "id": sequential number
- "tool": always "Gmail"
- "action": short description of what this step does (e.g., "Searching inbox")
- "detail": a mock Gmail API call or technical detail (e.g., 'gmail.search("is:unread")')
- "result": expected result summary

Also include a "response" field with the final assistant message (using markdown), and an "artifacts" array with any produced items (each having "type", "title", "icon" emoji).

Respond ONLY with valid JSON in this exact format:
{
  "steps": [...],
  "response": "...",
  "artifacts": [...]
}`;

export async function generateAgentPlan(userMessage) {
  try {
    const m = getModel();
    const result = await m.generateContent([
      { role: 'user', parts: [{ text: SYSTEM_PROMPT + '\n\nUser message: ' + userMessage }] },
    ]);
    const text = result.response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }
    const parsed = JSON.parse(jsonMatch[0]);
    if (!parsed.steps || !Array.isArray(parsed.steps)) {
      throw new Error('Invalid plan format');
    }
    parsed.steps = parsed.steps.map((step, i) => ({
      ...step,
      id: i + 1,
      status: 'pending',
    }));
    return parsed;
  } catch (err) {
    console.warn('Gemini plan generation failed, using fallback:', err.message);
    return null;
  }
}
