import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAgentSimulation } from '../../hooks/useAgentSimulation';

export default function ChatInput() {
  const [text, setText] = useState('');
  const textareaRef = useRef(null);
  const { sendMessage, isProcessing } = useAgentSimulation();
  const isPanelOpen = useSelector((state) => state.panel.isOpen);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 160) + 'px';
    }
  }, [text]);

  const handleSubmit = () => {
    if (!text.trim() || isProcessing) return;
    sendMessage(text);
    setText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div
      className="fixed bottom-6 w-full max-w-2xl px-4 z-50 transition-all duration-300"
      style={{ left: isPanelOpen ? 'calc((100% - 320px) / 2)' : '50%', transform: 'translateX(-50%)' }}
    >
      <div className="bg-[#f7f7f5] rounded-2xl shadow-lg border border-[#e6e6e3] flex items-end gap-2 px-4 py-3">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask GmailAgent anything..."
          rows={1}
          disabled={isProcessing}
          className="flex-1 resize-none outline-none text-sm text-gray-800 placeholder-gray-400 bg-transparent max-h-40 leading-relaxed disabled:opacity-50"
        />
        <button
          onClick={handleSubmit}
          disabled={!text.trim() || isProcessing}
          className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="19" x2="12" y2="5" />
            <polyline points="5 12 12 5 19 12" />
          </svg>
        </button>
      </div>
      <p className="text-center text-[11px] text-gray-400 mt-2">
        GmailAgent can make mistakes. Verify important information.
      </p>
    </div>
  );
}
