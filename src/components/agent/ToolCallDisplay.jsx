export default function ToolCallDisplay({ step }) {
  const statusIcon = {
    pending: '○',
    running: '◉',
    completed: '✓',
  };

  const statusColor = {
    pending: 'text-gray-300',
    running: 'text-purple-500',
    completed: 'text-green-500',
  };

  return (
    <div className={`flex items-start gap-3 py-2 animate-fade-in ${step.status === 'pending' ? 'opacity-40' : ''}`}>
      <span className={`text-lg mt-0.5 ${statusColor[step.status]} ${step.status === 'running' ? 'animate-pulse' : ''}`}>
        {statusIcon[step.status]}
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
            {step.tool}
          </span>
          <span className="text-sm font-medium text-gray-700">{step.action}</span>
        </div>
        <div className="text-xs text-gray-400 font-mono mt-0.5 truncate">{step.detail}</div>
        {step.status === 'completed' && step.result && (
          <div className="text-xs text-green-600 mt-1">{step.result}</div>
        )}
      </div>
    </div>
  );
}
