import { useDispatch, useSelector } from 'react-redux';
import { toggleSection } from '../../store/panelSlice';

export default function PanelSection({ id, title, icon, children, count }) {
  const dispatch = useDispatch();
  const isExpanded = useSelector((state) => state.panel.expandedSections[id]);

  return (
    <div className="border-b border-[#e6e6e3] last:border-b-0">
      <button
        onClick={() => dispatch(toggleSection(id))}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#efefed] transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm">{icon}</span>
          <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
            {title}
          </span>
          {count > 0 && (
            <span className="text-[10px] bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded-full font-medium">
              {count}
            </span>
          )}
        </div>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pb-3">{children}</div>
      </div>
    </div>
  );
}
