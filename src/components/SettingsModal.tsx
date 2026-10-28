import React from 'react';
import { ThemeId } from '../types/calculator';
import { THEMES } from '../utils/themes';
import {
  X,
  Volume2,
  VolumeX,
  Settings,
  Download,
  Terminal,
  Check,
  Moon,
  Sun,
  Ghost,
  Cat,
  Computer,
  ShieldAlert,
  Coffee,
  Compass,
  Leaf,
  Sparkles,
} from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  currentTheme: ThemeId;
  soundEnabled: boolean;
  onClose: () => void;
  onSelectTheme: (themeId: ThemeId) => void;
  onToggleSound: () => void;
  onOpenPythonScript: () => void;
  onOpenPythonTerminal: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  currentTheme,
  soundEnabled,
  onClose,
  onSelectTheme,
  onToggleSound,
  onOpenPythonScript,
  onOpenPythonTerminal,
}) => {
  if (!isOpen) return null;

  const getThemeVectorIcon = (iconName: string) => {
    switch (iconName) {
      case 'Moon':
        return <Moon className="w-4 h-4" />;
      case 'Sun':
        return <Sun className="w-4 h-4" />;
      case 'Ghost':
        return <Ghost className="w-4 h-4 text-orange-400" />;
      case 'Cat':
        return <Cat className="w-4 h-4 text-rose-400" />;
      case 'Terminal':
        return <Terminal className="w-4 h-4 text-emerald-400" />;
      case 'Computer':
        return <Computer className="w-4 h-4 text-blue-400" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-4 h-4 text-purple-400" />;
      case 'Coffee':
        return <Coffee className="w-4 h-4 text-amber-500" />;
      case 'Compass':
        return <Compass className="w-4 h-4 text-sky-400" />;
      case 'Leaf':
        return <Leaf className="w-4 h-4 text-emerald-400" />;
      case 'Sparkles':
      default:
        return <Sparkles className="w-4 h-4 text-fuchsia-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs select-none">
      <div className="bg-[#242424] text-white border border-[#383838] rounded-xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#333333] bg-[#1e1e1e]">
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-[#9d9d9d]" />
            <h2 className="text-sm font-semibold tracking-normal text-white">Configurações do Sistema</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-white/10 text-[#9d9d9d] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5 max-h-[75vh] overflow-y-auto scrollbar-thin">
          {/* Section: Themes */}
          <div>
            <div className="text-xs font-semibold text-[#a0a0a0] uppercase tracking-wider mb-2.5">
              Personalização de Temas ({Object.keys(THEMES).length} Temas)
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {Object.values(THEMES).map((t) => {
                const isSelected = currentTheme === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => onSelectTheme(t.id)}
                    className={`p-3 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-white/50 bg-[#353535] shadow-sm'
                        : 'border-[#333333] bg-[#1b1b1b] hover:bg-[#282828]'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1.5">
                      <span className="p-1 rounded bg-white/10 text-white">
                        {getThemeVectorIcon(t.iconName)}
                      </span>
                      <span
                        className="w-3 h-3 rounded-full border border-white/20"
                        style={{ backgroundColor: t.accentColor }}
                      />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-white flex items-center justify-between">
                        <span className="truncate">{t.name}</span>
                        {isSelected && <Check className="w-3 h-3 text-emerald-400 shrink-0 ml-1" />}
                      </div>
                      <div className="text-[10px] text-[#888888] mt-0.5 line-clamp-1">{t.badge}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section: Sound Feedback */}
          <div className="pt-3 border-t border-[#333333]">
            <div className="text-xs font-semibold text-[#a0a0a0] uppercase tracking-wider mb-2">
              Sons e Feedback Tátil
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-[#1b1b1b] border border-[#333333]">
              <div className="flex items-center gap-2.5">
                {soundEnabled ? (
                  <Volume2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <VolumeX className="w-4 h-4 text-[#888888]" />
                )}
                <div>
                  <div className="text-xs font-medium text-white">Efeitos sonoros das teclas</div>
                  <div className="text-[10px] text-[#888888]">
                    {soundEnabled ? 'Sons táteis e temáticos ativados' : 'Modo silencioso'}
                  </div>
                </div>
              </div>
              <button
                onClick={onToggleSound}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                  soundEnabled
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                    : 'bg-white/10 hover:bg-white/15 text-[#a0a0a0]'
                }`}
              >
                {soundEnabled ? 'Ativado' : 'Silencioso'}
              </button>
            </div>
          </div>

          {/* Section: Python Standalone Engine */}
          <div className="pt-3 border-t border-[#333333]">
            <div className="text-xs font-semibold text-[#a0a0a0] uppercase tracking-wider mb-2">
              Integração Python
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                onClick={() => {
                  onClose();
                  onOpenPythonTerminal();
                }}
                className="flex items-center justify-between p-3 rounded-lg bg-[#1b1b1b] hover:bg-[#282828] border border-[#333333] transition-colors cursor-pointer text-left"
              >
                <div className="flex items-center gap-2.5">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <div>
                    <div className="text-xs font-medium text-white">Terminal Python</div>
                    <div className="text-[10px] text-[#888888]">Avaliar expressões com math</div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onOpenPythonScript();
                }}
                className="flex items-center justify-between p-3 rounded-lg bg-[#1b1b1b] hover:bg-[#282828] border border-[#333333] transition-colors cursor-pointer text-left"
              >
                <div className="flex items-center gap-2.5">
                  <Download className="w-4 h-4 text-amber-400" />
                  <div>
                    <div className="text-xs font-medium text-white">Exportar .py</div>
                    <div className="text-[10px] text-[#888888]">Baixar script standalone</div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-[#333333] bg-[#1e1e1e] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded bg-white/10 hover:bg-white/15 text-white text-xs font-medium transition-colors cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
