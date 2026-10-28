import React from 'react';
import { THEMES } from '../utils/themes';
import { ThemeId } from '../types/calculator';
import { Volume2, VolumeX, Sparkles, Moon, Sun, Ghost, Cat, Terminal, Computer } from 'lucide-react';

interface ThemeSelectorProps {
  currentTheme: ThemeId;
  soundEnabled: boolean;
  onSelectTheme: (id: ThemeId) => void;
  onToggleSound: () => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  currentTheme,
  soundEnabled,
  onSelectTheme,
  onToggleSound,
}) => {
  const getThemeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Moon':
        return <Moon className="w-4 h-4" />;
      case 'Sun':
        return <Sun className="w-4 h-4" />;
      case 'Ghost':
        return <Ghost className="w-4 h-4" />;
      case 'Cat':
        return <Cat className="w-4 h-4" />;
      case 'Terminal':
        return <Terminal className="w-4 h-4" />;
      case 'Computer':
        return <Computer className="w-4 h-4" />;
      case 'Sparkles':
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex flex-col gap-3 select-none">
      {/* Sound and quick controls strip */}
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="font-semibold text-sm text-slate-100">Personalizar Tema</span>
        </div>

        <button
          onClick={onToggleSound}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
            soundEnabled
              ? 'bg-amber-500/15 border-amber-500/30 text-amber-400'
              : 'bg-white/5 border-white/10 text-slate-400'
          }`}
          title="Ativar/Desativar efeitos sonoros"
        >
          {soundEnabled ? (
            <>
              <Volume2 className="w-3.5 h-3.5" />
              <span>Som: Ativo</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5" />
              <span>Som: Mudo</span>
            </>
          )}
        </button>
      </div>

      {/* Themes grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {Object.values(THEMES).map((t) => {
          const isSelected = currentTheme === t.id;
          return (
            <button
              key={t.id}
              onClick={() => onSelectTheme(t.id)}
              className={`p-2.5 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between cursor-pointer ${
                isSelected
                  ? 'border-amber-400 bg-white/10 shadow-md ring-1 ring-amber-400/50'
                  : 'border-white/10 bg-white/5 hover:bg-white/10'
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between w-full mb-1">
                <span className="p-1 rounded-md bg-white/10 text-slate-200">
                  {getThemeIcon(t.iconName)}
                </span>
                <span
                  className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-xs"
                  style={{ backgroundColor: t.accentColor }}
                />
              </div>

              {/* Title & Badge */}
              <div>
                <div className="font-bold text-xs text-white truncate">{t.name}</div>
                <div className="text-[10px] text-slate-400 truncate mt-0.5">{t.badge}</div>
              </div>

              {isSelected && (
                <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
