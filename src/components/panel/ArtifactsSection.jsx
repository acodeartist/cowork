import { useSelector } from 'react-redux';
import PanelSection from './PanelSection';

export default function ArtifactsSection() {
  const artifacts = useSelector((state) => state.agent.artifacts);

  return (
    <PanelSection id="artifacts" title="Artifacts" icon="📎" count={artifacts.length}>
      {artifacts.length === 0 ? (
        <p className="text-xs text-gray-400">No artifacts yet</p>
      ) : (
        <div className="space-y-2">
          {artifacts.map((artifact, i) => (
            <div
              key={i}
              className="flex items-center gap-2 p-2 rounded-lg bg-[#efefed] hover:bg-[#e6e6e3] transition-colors cursor-pointer"
            >
              <span className="text-base">{artifact.icon}</span>
              <div>
                <div className="text-xs font-medium text-gray-700">{artifact.title}</div>
                <div className="text-[10px] text-gray-400 capitalize">{artifact.type}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </PanelSection>
  );
}
