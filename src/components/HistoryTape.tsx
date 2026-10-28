import React, { useState } from 'react';
import { HistoryItem, ThemeConfig } from '../types/calculator';
import { Trash2, Copy, Check, Download, ArrowUpRight, History } from 'lucide-react';

interface HistoryTapeProps {
  history: HistoryItem[];
  theme: ThemeConfig;
  onSelectResult: (value: string) => void;
  onClearHistory: () => void;
  onDeleteHistoryItem: (id: string) => void;
}

export const HistoryTape: React.FC<HistoryTapeProps> = ({
  history,
  theme,
  onSelectResult,
  onClearHistory,
  onDeleteHistoryItem,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyItem = (item: HistoryItem) => {
    navigator.clipboard.writeText(`${item.expression} ${item.result}`);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const exportAsTxt = () => {
    if (history.length === 0) return;
    const lines = [
      `# Histórico de Cálculos - Calculadora Científica Python`,
      `# Exportado em: ${new Date().toLocaleString()}`,
      `# -------------------------------------------------------------`,
      ...history.map(
        (h) =>
          `[${new Date(h.timestamp).toLocaleTimeString()}] ${h.expression} ${h.result} | Python: ${h.pythonCode}`
      ),
    ].join('\n');

    const blob = new Blob([lines], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `historico_calculadora_${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-full select-none">
      {/* Header bar of history */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-amber-500" />
          <h3 className="font-semibold text-sm">Histórico de Operações</h3>
          <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-slate-400">
            {history.length}
          </span>
        </div>

        {history.length > 0 && (
          <div className="flex items-center gap-1.5">
            <button
              onClick={exportAsTxt}
              className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-slate-200 transition-colors text-xs flex items-center gap-1"
              title="Exportar histórico como texto"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Exportar</span>
            </button>
            <button
              onClick={onClearHistory}
              className="p-1.5 rounded-lg hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors text-xs flex items-center gap-1"
              title="Limpar todo o histórico"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Limpar</span>
            </button>
          </div>
        )}
      </div>

      {/* History Items list */}
      {history.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-slate-500">
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3">
            <History className="w-6 h-6 opacity-40" />
          </div>
          <p className="text-sm font-medium text-slate-400">Nenhum cálculo recente</p>
          <p className="text-xs text-slate-500 mt-1 max-w-[200px]">
            Realize contas aritméticas ou científicas para vê-las gravadas na fita de histórico.
          </p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto space-y-2 pr-1 max-h-[420px] scrollbar-thin">
          {history.map((item) => (
            <div
              key={item.id}
              className="group p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all flex flex-col gap-1 relative"
            >
              {/* Header row: time & actions */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>{new Date(item.timestamp).toLocaleTimeString()}</span>
                <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => copyItem(item)}
                    className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-slate-200 transition-colors"
                    title="Copiar resultado"
                  >
                    {copiedId === item.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <button
                    onClick={() => onSelectResult(item.result)}
                    className="p-1 rounded hover:bg-amber-500/20 text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-0.5 text-[10px]"
                    title="Inserir na calculadora"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Usar</span>
                  </button>
                  <button
                    onClick={() => onDeleteHistoryItem(item.id)}
                    className="p-1 rounded hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors"
                    title="Remover este cálculo"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Expression */}
              <div className="text-xs font-mono text-slate-400 truncate">{item.expression}</div>

              {/* Big Result */}
              <div
                onClick={() => onSelectResult(item.result)}
                className="text-lg font-bold font-mono tracking-tight text-white hover:text-amber-400 transition-colors cursor-pointer"
                title="Clique para usar este resultado"
              >
                = {item.result}
              </div>

              {/* Python equivalent code badge */}
              <div className="mt-1 pt-1 border-t border-white/5 text-[10px] font-mono text-emerald-400/90 truncate">
                🐍 {item.pythonCode}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
