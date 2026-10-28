import React from 'react';
import { AppMode, ConverterCategory } from '../types/calculator';
import {
  Calculator as CalcIcon,
  FlaskConical,
  Code2,
  Calendar,
  Coins,
  Box,
  Ruler,
  Scale,
  Thermometer,
  Flame,
  Grid,
  Activity,
  Clock,
  Zap,
  Terminal,
  Settings,
  X,
} from 'lucide-react';

interface NavigationMenuProps {
  isOpen: boolean;
  currentMode: AppMode;
  currentConverterCategory?: ConverterCategory;
  onClose: () => void;
  onSelectMode: (mode: AppMode, converterCategory?: ConverterCategory) => void;
  onOpenPythonTerminal: () => void;
  onOpenSettings: () => void;
}

export const NavigationMenu: React.FC<NavigationMenuProps> = ({
  isOpen,
  currentMode,
  currentConverterCategory,
  onClose,
  onSelectMode,
  onOpenPythonTerminal,
  onOpenSettings,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex select-none">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-xs" onClick={onClose} />

      {/* Slide Drawer */}
      <div className="relative w-64 max-w-[85vw] bg-[#1f1f1f] text-white border-r border-[#2d2d2d] shadow-2xl h-full flex flex-col justify-between p-3 animate-in slide-in-from-left duration-150 overflow-y-auto">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-[#2d2d2d] px-2">
            <span className="font-semibold text-xs tracking-wider uppercase text-[#8a8a8a]">
              Menu da Calculadora
            </span>
            <button
              onClick={onClose}
              className="p-1 rounded hover:bg-white/10 text-[#8a8a8a] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Section 1: Calculadora */}
          <div>
            <div className="px-3 py-1 text-xs font-semibold text-[#8a8a8a] tracking-wider">
              Calculadora
            </div>
            <div className="space-y-0.5 mt-1">
              <button
                onClick={() => {
                  onSelectMode('standard');
                  onClose();
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded text-sm transition-colors cursor-pointer ${
                  currentMode === 'standard'
                    ? 'bg-white/10 text-white font-medium'
                    : 'text-[#cccccc] hover:bg-white/5 hover:text-white'
                }`}
              >
                <CalcIcon className="w-4 h-4 text-[#8a8580]" />
                <span>Padrão</span>
              </button>

              <button
                onClick={() => {
                  onSelectMode('scientific');
                  onClose();
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded text-sm transition-colors cursor-pointer ${
                  currentMode === 'scientific'
                    ? 'bg-white/10 text-white font-medium'
                    : 'text-[#cccccc] hover:bg-white/5 hover:text-white'
                }`}
              >
                <FlaskConical className="w-4 h-4 text-amber-500" />
                <span>Científica</span>
              </button>

              <button
                onClick={() => {
                  onSelectMode('programmer');
                  onClose();
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded text-sm transition-colors cursor-pointer ${
                  currentMode === 'programmer'
                    ? 'bg-white/10 text-white font-medium'
                    : 'text-[#cccccc] hover:bg-white/5 hover:text-white'
                }`}
              >
                <Code2 className="w-4 h-4 text-emerald-400" />
                <span>Programador</span>
              </button>

              <button
                onClick={() => {
                  onSelectMode('date');
                  onClose();
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded text-sm transition-colors cursor-pointer ${
                  currentMode === 'date'
                    ? 'bg-white/10 text-white font-medium'
                    : 'text-[#cccccc] hover:bg-white/5 hover:text-white'
                }`}
              >
                <Calendar className="w-4 h-4 text-sky-400" />
                <span>Cálculo de data</span>
              </button>
            </div>
          </div>

          {/* Section 2: Conversor */}
          <div>
            <div className="px-3 py-1 text-xs font-semibold text-[#8a8a8a] tracking-wider">
              Conversor
            </div>
            <div className="space-y-0.5 mt-1">
              <button
                onClick={() => {
                  onSelectMode('converter', 'currency');
                  onClose();
                }}
                className={`w-full flex items-center gap-3 px-3 py-1.5 rounded text-sm transition-colors cursor-pointer ${
                  currentMode === 'converter' && currentConverterCategory === 'currency'
                    ? 'bg-white/10 text-white font-medium'
                    : 'text-[#cccccc] hover:bg-white/5 hover:text-white'
                }`}
              >
                <Coins className="w-4 h-4 text-amber-400" />
                <span>Moeda</span>
              </button>

              <button
                onClick={() => {
                  onSelectMode('converter', 'volume');
                  onClose();
                }}
                className={`w-full flex items-center gap-3 px-3 py-1.5 rounded text-sm transition-colors cursor-pointer ${
                  currentMode === 'converter' && currentConverterCategory === 'volume'
                    ? 'bg-white/10 text-white font-medium'
                    : 'text-[#cccccc] hover:bg-white/5 hover:text-white'
                }`}
              >
                <Box className="w-4 h-4 text-indigo-400" />
                <span>Volume</span>
              </button>

              <button
                onClick={() => {
                  onSelectMode('converter', 'length');
                  onClose();
                }}
                className={`w-full flex items-center gap-3 px-3 py-1.5 rounded text-sm transition-colors cursor-pointer ${
                  currentMode === 'converter' && currentConverterCategory === 'length'
                    ? 'bg-white/10 text-white font-medium'
                    : 'text-[#cccccc] hover:bg-white/5 hover:text-white'
                }`}
              >
                <Ruler className="w-4 h-4 text-teal-400" />
                <span>Comprimento</span>
              </button>

              <button
                onClick={() => {
                  onSelectMode('converter', 'weight');
                  onClose();
                }}
                className={`w-full flex items-center gap-3 px-3 py-1.5 rounded text-sm transition-colors cursor-pointer ${
                  currentMode === 'converter' && currentConverterCategory === 'weight'
                    ? 'bg-white/10 text-white font-medium'
                    : 'text-[#cccccc] hover:bg-white/5 hover:text-white'
                }`}
              >
                <Scale className="w-4 h-4 text-orange-400" />
                <span>Peso e massa</span>
              </button>

              <button
                onClick={() => {
                  onSelectMode('converter', 'temperature');
                  onClose();
                }}
                className={`w-full flex items-center gap-3 px-3 py-1.5 rounded text-sm transition-colors cursor-pointer ${
                  currentMode === 'converter' && currentConverterCategory === 'temperature'
                    ? 'bg-white/10 text-white font-medium'
                    : 'text-[#cccccc] hover:bg-white/5 hover:text-white'
                }`}
              >
                <Thermometer className="w-4 h-4 text-red-400" />
                <span>Temperatura</span>
              </button>

              <button
                onClick={() => {
                  onSelectMode('converter', 'energy');
                  onClose();
                }}
                className={`w-full flex items-center gap-3 px-3 py-1.5 rounded text-sm transition-colors cursor-pointer ${
                  currentMode === 'converter' && currentConverterCategory === 'energy'
                    ? 'bg-white/10 text-white font-medium'
                    : 'text-[#cccccc] hover:bg-white/5 hover:text-white'
                }`}
              >
                <Flame className="w-4 h-4 text-amber-500" />
                <span>Energia</span>
              </button>

              <button
                onClick={() => {
                  onSelectMode('converter', 'area');
                  onClose();
                }}
                className={`w-full flex items-center gap-3 px-3 py-1.5 rounded text-sm transition-colors cursor-pointer ${
                  currentMode === 'converter' && currentConverterCategory === 'area'
                    ? 'bg-white/10 text-white font-medium'
                    : 'text-[#cccccc] hover:bg-white/5 hover:text-white'
                }`}
              >
                <Grid className="w-4 h-4 text-cyan-400" />
                <span>Área</span>
              </button>

              <button
                onClick={() => {
                  onSelectMode('converter', 'speed');
                  onClose();
                }}
                className={`w-full flex items-center gap-3 px-3 py-1.5 rounded text-sm transition-colors cursor-pointer ${
                  currentMode === 'converter' && currentConverterCategory === 'speed'
                    ? 'bg-white/10 text-white font-medium'
                    : 'text-[#cccccc] hover:bg-white/5 hover:text-white'
                }`}
              >
                <Activity className="w-4 h-4 text-emerald-400" />
                <span>Velocidade</span>
              </button>

              <button
                onClick={() => {
                  onSelectMode('converter', 'time');
                  onClose();
                }}
                className={`w-full flex items-center gap-3 px-3 py-1.5 rounded text-sm transition-colors cursor-pointer ${
                  currentMode === 'converter' && currentConverterCategory === 'time'
                    ? 'bg-white/10 text-white font-medium'
                    : 'text-[#cccccc] hover:bg-white/5 hover:text-white'
                }`}
              >
                <Clock className="w-4 h-4 text-violet-400" />
                <span>Tempo</span>
              </button>

              <button
                onClick={() => {
                  onSelectMode('converter', 'power');
                  onClose();
                }}
                className={`w-full flex items-center gap-3 px-3 py-1.5 rounded text-sm transition-colors cursor-pointer ${
                  currentMode === 'converter' && currentConverterCategory === 'power'
                    ? 'bg-white/10 text-white font-medium'
                    : 'text-[#cccccc] hover:bg-white/5 hover:text-white'
                }`}
              >
                <Zap className="w-4 h-4 text-yellow-400" />
                <span>Potência</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer: Python & Settings */}
        <div className="pt-3 mt-3 border-t border-[#2d2d2d] space-y-1">
          <button
            onClick={() => {
              onOpenPythonTerminal();
              onClose();
            }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded text-sm text-[#cccccc] hover:bg-white/5 hover:text-white transition-colors cursor-pointer"
          >
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>Terminal Python</span>
          </button>

          <button
            onClick={() => {
              onOpenSettings();
              onClose();
            }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded text-sm text-[#cccccc] hover:bg-white/5 hover:text-white transition-colors cursor-pointer"
          >
            <Settings className="w-4 h-4 text-[#8a8a8a]" />
            <span>Configurações &amp; Temas</span>
          </button>
        </div>
      </div>
    </div>
  );
};
