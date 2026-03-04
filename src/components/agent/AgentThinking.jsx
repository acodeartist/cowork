export default function AgentThinking() {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-500 animate-fade-in">
      <div className="flex gap-1">
        <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
      <span className="text-gray-400">Thinking...</span>
    </div>
  );
}
