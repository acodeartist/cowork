import ToolCallDisplay from './ToolCallDisplay';

export default function AgentStep({ steps }) {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="bg-[#f7f7f5] border border-[#e6e6e3] rounded-xl p-4 animate-fade-in">
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
        Agent Steps
      </div>
      <div className="space-y-1">
        {steps.map((step) => (
          <ToolCallDisplay key={step.id} step={step} />
        ))}
      </div>
    </div>
  );
}
