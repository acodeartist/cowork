import { useSelector } from 'react-redux';
import PanelSection from './PanelSection';

export default function SkillsSection() {
  const { available, active } = useSelector((state) => state.skills);

  return (
    <PanelSection id="skills" title="Skills" icon="⚡" count={active.length}>
      <div className="space-y-2">
        {available.map((skill) => {
          const isActive = active.includes(skill.id);
          return (
            <div
              key={skill.id}
              className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
                isActive ? 'bg-purple-50 border border-purple-200' : 'bg-[#efefed]'
              }`}
            >
              <span className="text-base">{skill.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-gray-700">{skill.name}</div>
                <div className="text-[10px] text-gray-400 truncate">{skill.description}</div>
              </div>
              {isActive && (
                <span className="text-[10px] text-purple-600 font-medium bg-purple-100 px-1.5 py-0.5 rounded-full">
                  Active
                </span>
              )}
            </div>
          );
        })}
      </div>
    </PanelSection>
  );
}
