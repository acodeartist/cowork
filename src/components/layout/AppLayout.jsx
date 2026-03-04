import { useSelector } from 'react-redux';
import SpreadsheetBackground from './SpreadsheetBackground';
import Header from './Header';
import ActivityFeed from '../chat/ActivityFeed';
import ChatInput from '../chat/ChatInput';
import RightPanel from '../panel/RightPanel';

export default function AppLayout() {
  const isPanelOpen = useSelector((state) => state.panel.isOpen);

  return (
    <div className="h-screen w-screen overflow-hidden" style={{ backgroundColor: '#f7f7f5' }}>
      <SpreadsheetBackground />
      <Header />
      <div
        className="h-full overflow-y-auto transition-all duration-300"
        style={{ marginRight: isPanelOpen ? '320px' : '0px' }}
      >
        <ActivityFeed />
      </div>
      <ChatInput />
      <RightPanel />
    </div>
  );
}
