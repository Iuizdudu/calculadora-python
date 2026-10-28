import React, { useState } from 'react';
import { ThemeConfig } from '../types/calculator';
import { formatDisplayNumber } from '../utils/mathEngine';
import { Copy, Check } from 'lucide-react';

interface DisplayProps {
  display: string;
  expression: string;
  pythonCode: string;
  theme: ThemeConfig;
  memory: number;
  onMemoryAction: (action: 'mc' | 'mr' | 'm+' | 'm-' | 'ms') => void;
}

export const Display: React.FC<DisplayProps> = ({
  display,
  expression,
  theme,
  memory,
  onMemoryAction,
}) => {
  const [copied, setCopied] = useState(false);
  const formattedDisplay = formatDisplayNumber(display);

  // Dynamic font sizing: very large on short numbers, smoothly decreasing on very long numbers
  const getFontSizeClass = (len: number) => {
    if (len > 18) return 'text-3xl sm:text-4xl';
    if (len > 14) return 'text-4xl sm:text-5xl';
    if (len > 10) return 'text-5xl sm:text-6xl';
    return 'text-6xl sm:text-7xl';
  };

  const copyToClipboard = () => {
    if (!display) return;
    navigator.clipboard.writeText(display);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const hasMemory = memory !== 0;

  return (
    <div className="w-full flex flex-col justify-end select-none pt-2 pb-1">
      {/* Expression line: small, muted, right aligned */}
      <div className={`min-h-[22px] text-right font-sans text-sm tracking-normal pr-1 truncate ${theme.displaySubTextColor}`}>
        {expression || <span className="opacity-0">0</span>}
      </div>

      {/* Main Big Number Display: exactly like Windows 10/11 Calculator */}
      <div className="relative group flex items-baseline justify-end">
        <div
          onClick={copyToClipboard}
          className={`text-right font-light tracking-tight pr-1 cursor-pointer overflow-x-auto overflow-y-hidden scrollbar-none transition-all leading-none py-1 ${getFontSizeClass(
            formattedDisplay.length
          )} ${theme.displayTextColor}`}
          title="Clique para copiar"
        >
          {formattedDisplay}
        </div>

        {copied && (
          <span className="absolute -top-6 right-2 text-xs text-emerald-400 font-medium flex items-center gap-1 bg-black/70 px-2 py-0.5 rounded">
            <Check className="w-3 h-3" /> Copiado
          </span>
        )}
      </div>

      {/* Memory Row: MC | MR | M+ | M- | MS | M▾ (matching screenshot exactly) */}
      <div className="grid grid-cols-6 gap-1 mt-3 mb-1 text-center font-sans text-xs">
        <button
          onClick={() => onMemoryAction('mc')}
          disabled={!hasMemory}
          className={`py-1 rounded-[3px] transition-colors cursor-pointer ${
            hasMemory ? 'text-white hover:bg-white/10' : 'text-[#6e6e6e] opacity-40 cursor-default'
          }`}
          title="Memory Clear"
        >
          MC
        </button>
        <button
          onClick={() => onMemoryAction('mr')}
          disabled={!hasMemory}
          className={`py-1 rounded-[3px] transition-colors cursor-pointer ${
            hasMemory ? 'text-white hover:bg-white/10' : 'text-[#6e6e6e] opacity-40 cursor-default'
          }`}
          title="Memory Recall"
        >
          MR
        </button>
        <button
          onClick={() => onMemoryAction('m+')}
          className="py-1 rounded-[3px] text-white hover:bg-white/10 transition-colors cursor-pointer font-medium"
          title="Memory Add"
        >
          M+
        </button>
        <button
          onClick={() => onMemoryAction('m-')}
          className="py-1 rounded-[3px] text-white hover:bg-white/10 transition-colors cursor-pointer font-medium"
          title="Memory Subtract"
        >
          M−
        </button>
        <button
          onClick={() => onMemoryAction('ms')}
          className="py-1 rounded-[3px] text-white hover:bg-white/10 transition-colors cursor-pointer font-medium"
          title="Memory Store"
        >
          MS
        </button>
        <button
          disabled={!hasMemory}
          className={`py-1 rounded-[3px] transition-colors cursor-pointer ${
            hasMemory ? 'text-white hover:bg-white/10' : 'text-[#6e6e6e] opacity-40 cursor-default'
          }`}
          title={hasMemory ? `Valor guardado: ${memory}` : 'Sem valor na memória'}
        >
          M▾
        </button>
      </div>
    </div>
  );
};
