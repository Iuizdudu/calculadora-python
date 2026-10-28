import React from 'react';
import { HistoryItem, ThemeConfig } from '../types/calculator';
import { HistoryTape } from './HistoryTape';
import { X } from 'lucide-react';

interface HistoryFlyoutProps {
  isOpen: boolean;
  history: HistoryItem[];
  theme: ThemeConfig;
  onClose: () => void;
  onSelectResult: (value: string) => void;
  onClearHistory: () => void;
  onDeleteHistoryItem: (id: string) => void;
}

export const HistoryFlyout: React.FC<HistoryFlyoutProps> = ({
  isOpen,
  history,
  theme,
  onClose,
  onSelectResult,
  onClearHistory,
  onDeleteHistoryItem,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end select-none">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={onClose} />

      {/* Slide-over panel */}
      <div className="relative w-80 max-w-[85vw] bg-[#1f1f1f] text-white border-l border-[#2d2d2d] shadow-2xl h-full flex flex-col p-4 animate-in slide-in-from-right duration-150">
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#2d2d2d]">
          <span className="font-semibold text-xs tracking-wider uppercase text-[#8a8a8a]">
            Histórico de Cálculos
          </span>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-white/10 text-[#8a8a8a] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-hidden">
          <HistoryTape
            history={history}
            theme={theme}
            onSelectResult={(val) => {
              onSelectResult(val);
              onClose();
            }}
            onClearHistory={onClearHistory}
            onDeleteHistoryItem={onDeleteHistoryItem}
          />
        </div>
      </div>
    </div>
  );
};
