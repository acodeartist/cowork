import { useDispatch, useSelector } from 'react-redux';
import { togglePanel } from '../../store/panelSlice';

export default function Header() {
  const dispatch = useDispatch();
  const isPanelOpen = useSelector((state) => state.panel.isOpen);

  return (
    <header className="fixed top-0 left-0 right-0 h-12 bg-[#f7f7f5]/90 backdrop-blur-sm border-b border-[#e6e6e3] flex items-center justify-between px-4 z-50">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
          <span className="text-white text-sm font-bold">G</span>
        </div>
        <span className="text-sm font-semibold text-gray-800">GmailAgent</span>
      </div>

      <button
        onClick={() => dispatch(togglePanel())}
        className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-500"
        title={isPanelOpen ? 'Close panel' : 'Open panel'}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {isPanelOpen ? (
            <>
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <line x1="15" y1="3" x2="15" y2="21" />
            </>
          ) : (
            <>
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <line x1="15" y1="3" x2="15" y2="21" />
              <line x1="9" y1="9" x2="13" y2="12" />
              <line x1="13" y1="12" x2="9" y2="15" />
            </>
          )}
        </svg>
      </button>
    </header>
  );
}
