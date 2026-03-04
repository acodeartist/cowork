import { useSelector } from 'react-redux';
import ProgressSection from './ProgressSection';
import ArtifactsSection from './ArtifactsSection';
import SkillsSection from './SkillsSection';

export default function RightPanel() {
  const isOpen = useSelector((state) => state.panel.isOpen);

  return (
    <div
      className={`fixed top-12 right-0 bottom-0 w-80 bg-[#f7f7f5] border-l border-[#e6e6e3] z-40 transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="h-full overflow-y-auto">
        <div className="px-4 py-3 border-b border-[#e6e6e3]">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Workspace</h2>
        </div>
        <ProgressSection />
        <ArtifactsSection />
        <SkillsSection />
      </div>
    </div>
  );
}
