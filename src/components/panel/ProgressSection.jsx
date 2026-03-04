import { useSelector } from 'react-redux';
import PanelSection from './PanelSection';

export default function ProgressSection() {
  const { steps, currentStepIndex, isSimulating } = useSelector((state) => state.agent);
  const completedCount = steps.filter((s) => s.status === 'completed').length;

  return (
    <PanelSection id="progress" title="Progress" icon="📊" count={steps.length > 0 ? completedCount : 0}>
      {steps.length === 0 ? (
        <p className="text-xs text-gray-400">No active tasks</p>
      ) : (
        <div className="space-y-2">
          {/* Progress bar */}
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-500 rounded-full transition-all duration-500"
              style={{
                width: `${steps.length > 0 ? (completedCount / steps.length) * 100 : 0}%`,
              }}
            />
          </div>
          <div className="text-[11px] text-gray-500">
            {completedCount} of {steps.length} steps completed
          </div>

          {/* Step list */}
          <div className="space-y-1.5 mt-2">
            {steps.map((step) => (
              <div key={step.id} className="flex items-center gap-2 text-xs">
                <span
                  className={
                    step.status === 'completed'
                      ? 'text-green-500'
                      : step.status === 'running'
                      ? 'text-purple-500 animate-pulse'
                      : 'text-gray-300'
                  }
                >
                  {step.status === 'completed' ? '✓' : step.status === 'running' ? '●' : '○'}
                </span>
                <span className={step.status === 'completed' ? 'text-gray-500' : 'text-gray-700'}>
                  {step.action}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </PanelSection>
  );
}
