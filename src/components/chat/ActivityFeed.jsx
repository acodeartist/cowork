import { useSelector } from 'react-redux';
import { useAutoScroll } from '../../hooks/useAutoScroll';
import ChatMessage from './ChatMessage';
import AgentStep from '../agent/AgentStep';
import AgentThinking from '../agent/AgentThinking';

export default function ActivityFeed() {
  const messages = useSelector((state) => state.chat.messages);
  const { steps, isThinking, isSimulating } = useSelector((state) => state.agent);
  const scrollRef = useAutoScroll([messages, steps, isThinking]);

  const hasActivity = messages.length > 0 || isThinking || steps.length > 0;

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto px-4 pt-16 pb-40"
    >
      {!hasActivity && (
        <div className="flex flex-col items-center justify-center h-full text-center relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#efefed] to-[#e6e6e3] flex items-center justify-center mb-4">
            <span className="text-2xl">✨</span>
          </div>
          <h2 className="text-lg font-semibold text-gray-700 mb-1">Welcome to GmailAgent</h2>
          <p className="text-sm text-gray-400 max-w-sm">
            Your AI-powered Gmail assistant. Type a message to get started.
          </p>
        </div>
      )}

      <div className="max-w-2xl mx-auto space-y-4">
        {messages.map((msg, i) => {
          const items = [<ChatMessage key={msg.id} message={msg} />];

          // Show agent steps after the user message that triggered them
          if (msg.role === 'user') {
            const nextMsg = messages[i + 1];
            const showSteps =
              steps.length > 0 &&
              (!nextMsg || nextMsg.role === 'assistant') &&
              (i === messages.length - 1 || i === messages.length - 2);

            if (showSteps) {
              items.push(<AgentStep key="agent-steps" steps={steps} />);
            }
          }

          return items;
        })}

        {isThinking && <AgentThinking />}

        {/* Show steps if no messages yet but simulation is running */}
        {steps.length > 0 && messages.length === 1 && isSimulating && (
          <AgentStep steps={steps} />
        )}
      </div>
    </div>
  );
}
